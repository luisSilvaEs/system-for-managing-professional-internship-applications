"use client";

import { useState, useEffect } from "react";
import { CleanedItem, AttributeValue } from "@/types/student";
import { getDropdownItems } from "./utilities";
import { StudentFilter } from "./utilities";
import fetchData from "@/lib/fetchDataDB";
import Select from "../select/Select";
import Table from "../table/Table";

const Filter = () => {
  const [data, setData] = useState<CleanedItem[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<CleanedItem[]>([]);
  useEffect(() => {
    const getData = async () => {
      const result = await fetchData();
      if (result) {
        //console.log("Query->", result);
        const cleanedData: CleanedItem[] = result.map(
          (item: Record<string, AttributeValue>) => {
            return Object.keys(item).reduce((acc, key) => {
              const value = item[key];
              acc[key] = value.S || value.N || ""; // Type-safe check for S or N
              return acc;
            }, {} as CleanedItem);
          }
        );
        //("cleaned->", cleanedData);
        setData(cleanedData);
        setFilteredStudents(cleanedData);
      } else {
        console.error("No data was fetched");
      }
    };
    getData();
  }, []);

  const studentFilter = new StudentFilter(data);
  const careersList = getDropdownItems("carreraResidente", data);
  const internshipPeriodList = getDropdownItems("periodo", data);

  const [selectedCareer, setSelectedCareer] = useState(""); // State to store the selected value in the parent
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [placeholderInput, setPlaceholderInput] = useState(
    "Ingresa un nombre o número"
  );
  const [placeholderSelectCareer, setPlaceholderSelectCareer] =
    useState("Carrera");
  const [placeholderSelectPeriod, setPlaceholderSelectPeriod] =
    useState("Período");

  const handleFilter = (
    input: string,
    career?: string,
    internshipPeriod?: string
  ) => {
    const results = studentFilter.filterCombined(
      input,
      career,
      internshipPeriod
    );
    setFilteredStudents(results); // Update the state with filtered students
  };

  // Handlers for dropdowns and search input
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);
    handleFilter(inputValue, selectedCareer, selectedPeriod);
  };

  const handleCareerSelect = (career: string) => {
    setSelectedCareer(career);
    handleFilter(searchInput, career, selectedPeriod);
  };

  const handlePeriodSelect = (internshipPeriod: string) => {
    setSelectedPeriod(internshipPeriod);
    handleFilter(searchInput, selectedCareer, internshipPeriod);
  };

  const resetFilters = () => {
    setSelectedCareer("");
    setSelectedPeriod("");
    setSearchInput("");
    setFilteredStudents(data); // Reset to original student data

    setPlaceholderInput("Ingresa un nombre o número");
    setPlaceholderSelectCareer("Carrera");
    setPlaceholderSelectPeriod("Período");
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4">
        <input
          id="price"
          name="price"
          type="text"
          placeholder={placeholderInput}
          value={searchInput}
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={handleSearchInput}
        />
        <Select
          onSelect={handleCareerSelect}
          items={careersList}
          placeholder={placeholderSelectCareer}
        />
        <Select
          onSelect={handlePeriodSelect}
          items={internshipPeriodList}
          placeholder={placeholderSelectPeriod}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4 justify-end">
        <button
          onClick={resetFilters}
          className="px-4 py-2 text-sm font-semibold leading-6 text-gray-900 bg-slate-100 rounded hover:bg-slate-300"
        >
          Reset
        </button>
      </div>
      <Table list={filteredStudents} rowsPerPage={5} />
    </div>
  );
};

export default Filter;
