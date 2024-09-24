"use client";

import { getDropdownItems } from "./utilities";
import { useState, useEffect } from "react";
import Select from "../select/Select";
import Table from "../table/Table";
import { StudentFilter } from "./utilities";
import fetchData from "@/lib/fetchDataDB";

const studentsMock = [
  {
    nombre: "John",
    apellidoMaterno: "Michael",
    apellidoPaterno: "Doe",
    numeroControl: "CN001",
    carreraResidente: "Computer Science",
    calleResidente: "123 Elm St, Springfield",
    periodo: "June 2023 - August 2023",
    nombreEmpresa: "Tech Innovators Inc.",
  },
  {
    nombre: "Jane",
    apellidoMaterno: "Elizabeth",
    apellidoPaterno: "Smith",
    numeroControl: "CN002",
    carreraResidente: "Mechanical Engineering",
    calleResidente: "456 Oak St, Metropolis",
    periodo: "May 2023 - July 2023",
    nombreEmpresa: "Precision Mechanics Ltd.",
  },
  {
    nombre: "Alex",
    apellidoMaterno: "James",
    apellidoPaterno: "Brown",
    numeroControl: "CN003",
    carreraResidente: "Electrical Engineering",
    calleResidente: "789 Pine St, Gotham",
    periodo: "July 2023 - September 2023",
    nombreEmpresa: "ElectroTech Solutions",
  },
  {
    nombre: "Emily",
    apellidoMaterno: "Grace",
    apellidoPaterno: "Davis",
    numeroControl: "CN004",
    carreraResidente: "Civil Engineering",
    calleResidente: "321 Maple St, Star City",
    periodo: "June 2023 - August 2023",
    nombreEmpresa: "Urban Constructors Co.",
  },
  {
    nombre: "Chris",
    apellidoMaterno: "John",
    apellidoPaterno: "Miller",
    numeroControl: "CN005",
    carreraResidente: "Software Engineering",
    calleResidente: "654 Cedar St, Central City",
    periodo: "May 2023 - July 2023",
    nombreEmpresa: "SoftWorks Solutions",
  },
  {
    nombre: "Sarah",
    apellidoMaterno: "Louise",
    apellidoPaterno: "Garcia",
    numeroControl: "CN006",
    carreraResidente: "Industrial Design",
    calleResidente: "987 Birch St, Coast City",
    periodo: "July 2023 - September 2023",
    nombreEmpresa: "Creative Design Studios",
  },
  {
    nombre: "David",
    apellidoMaterno: "Andrew",
    apellidoPaterno: "Martinez",
    numeroControl: "CN007",
    carreraResidente: "Chemical Engineering",
    calleResidente: "246 Willow St, Keystone",
    periodo: "June 2023 - August 2023",
    nombreEmpresa: "ChemTech Industries",
  },
  {
    nombre: "Laura",
    apellidoMaterno: "Marie",
    apellidoPaterno: "Rodriguez",
    numeroControl: "CN008",
    carreraResidente: "Architecture",
    calleResidente: "135 Redwood St, Fawcett City",
    periodo: "May 2023 - July 2023",
    nombreEmpresa: "Skyline Architects",
  },
  {
    nombre: "Michael",
    apellidoMaterno: "Paul",
    apellidoPaterno: "Hernandez",
    numeroControl: "CN009",
    carreraResidente: "Graphic Design",
    calleResidente: "753 Fir St, Midway City",
    periodo: "July 2023 - September 2023",
    nombreEmpresa: "DesignLab Studio",
  },
  {
    nombre: "Sophia",
    apellidoMaterno: "Ann",
    apellidoPaterno: "Wilson",
    numeroControl: "CN010",
    carreraResidente: "Biomedical Engineering",
    calleResidente: "852 Spruce St, Hub City",
    periodo: "June 2023 - August 2023",
    nombreEmpresa: "BioInnovations Inc.",
  },
  {
    nombre: "Daniel",
    apellidoMaterno: "Joseph",
    apellidoPaterno: "Lopez",
    numeroControl: "CN011",
    carreraResidente: "Computer Science",
    calleResidente: "159 Hickory St, Blüdhaven",
    periodo: "May 2023 - July 2023",
    nombreEmpresa: "CyberTech Solutions",
  },
  {
    nombre: "Olivia",
    apellidoMaterno: "Rose",
    apellidoPaterno: "Gonzalez",
    numeroControl: "CN012",
    carreraResidente: "Environmental Science",
    calleResidente: "357 Chestnut St, River City",
    periodo: "July 2023 - September 2023",
    nombreEmpresa: "EcoWorld Enterprises",
  },
  {
    nombre: "James",
    apellidoMaterno: "Edward",
    apellidoPaterno: "Perez",
    numeroControl: "CN013",
    carreraResidente: "Mechanical Engineering",
    calleResidente: "951 Walnut St, Opal City",
    periodo: "June 2023 - August 2023",
    nombreEmpresa: "MechaWorks Ltd.",
  },
  {
    nombre: "Mia",
    apellidoMaterno: "Eleanor",
    apellidoPaterno: "Kim",
    numeroControl: "CN014",
    carreraResidente: "Mathematics",
    calleResidente: "753 Ash St, Emerald City",
    periodo: "May 2023 - July 2023",
    nombreEmpresa: "DataMetrics Corp.",
  },
  {
    nombre: "Ethan",
    apellidoMaterno: "David",
    apellidoPaterno: "Nguyen",
    numeroControl: "CN015",
    carreraResidente: "Information Technology",
    calleResidente: "159 Poplar St, Ivy Town",
    periodo: "July 2023 - September 2023",
    nombreEmpresa: "IT Solutions Inc.",
  },
];

const Filter = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const result = await fetchData();
      setData(result);
    };
    getData();
  }, []);
  const studentFilter = new StudentFilter(data);
  const [filteredStudents, setFilteredStudents] = useState(data);

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
    setFilteredStudents(studentsMock); // Reset to original student data

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
