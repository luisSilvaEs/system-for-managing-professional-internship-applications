"use client";

import { getDropdownItems } from "./utilities";
import { useState, useEffect } from "react";
import Select from "../select/Select";
import Table from "../table/Table";

const studentsMock = [
  {
    nombre: "John",
    apellidoMaterno: "Michael",
    apellidoPaterno: "Doe",
    numeroControl: "CN001",
    carreraResidente: "Computer Science",
    calleResidente: "123 Elm St, Springfield",
    periodo: "June 2023 - August 2023",
    nombreEmpresa: "Computer Science",
  },
  {
    nombre: "Jane",
    apellidoMaterno: "Elizabeth",
    apellidoPaterno: "Smith",
    numeroControl: "CN002",
    carreraResidente: "Mechanical Engineering",
    calleResidente: "456 Oak St, Metropolis",
    periodo: "May 2023 - July 2023",
    nombreEmpresa: "Mechanical Engineering",
  },
  {
    nombre: "Alex",
    apellidoMaterno: "James",
    apellidoPaterno: "Brown",
    numeroControl: "CN003",
    carreraResidente: "Electrical Engineering",
    calleResidente: "789 Pine St, Gotham",
    periodo: "July 2023 - September 2023",
    nombreEmpresa: "Electrical Engineering",
  },
  {
    nombre: "Emily",
    apellidoMaterno: "Grace",
    apellidoPaterno: "Davis",
    numeroControl: "CN004",
    carreraResidente: "Civil Engineering",
    calleResidente: "321 Maple St, Star City",
    periodo: "June 2023 - August 2023",
    nombreEmpresa: "Civil Engineering",
  },
  {
    nombre: "Chris",
    apellidoMaterno: "John",
    apellidoPaterno: "Miller",
    numeroControl: "CN005",
    carreraResidente: "Software Engineering",
    calleResidente: "654 Cedar St, Central City",
    periodo: "May 2023 - July 2023",
    nombreEmpresa: "Software Engineering",
  },
  {
    nombre: "Sarah",
    apellidoMaterno: "Louise",
    apellidoPaterno: "Garcia",
    numeroControl: "CN006",
    carreraResidente: "Industrial Design",
    calleResidente: "987 Birch St, Coast City",
    periodo: "July 2023 - September 2023",
    nombreEmpresa: "Industrial Design",
  },
  {
    nombre: "David",
    apellidoMaterno: "Andrew",
    apellidoPaterno: "Martinez",
    numeroControl: "CN007",
    carreraResidente: "Chemical Engineering",
    calleResidente: "246 Willow St, Keystone",
    periodo: "June 2023 - August 2023",
    nombreEmpresa: "Chemical Engineering",
  },
  {
    nombre: "Laura",
    apellidoMaterno: "Marie",
    apellidoPaterno: "Rodriguez",
    numeroControl: "CN008",
    carreraResidente: "Architecture",
    calleResidente: "135 Redwood St, Fawcett City",
    periodo: "May 2023 - July 2023",
    nombreEmpresa: "Architecture",
  },
  {
    nombre: "Michael",
    apellidoMaterno: "Paul",
    apellidoPaterno: "Hernandez",
    numeroControl: "CN009",
    carreraResidente: "Graphic Design",
    calleResidente: "753 Fir St, Midway City",
    periodo: "July 2023 - September 2023",
    nombreEmpresa: "Graphic Design",
  },
  {
    nombre: "Sophia",
    apellidoMaterno: "Ann",
    apellidoPaterno: "Wilson",
    numeroControl: "CN010",
    carreraResidente: "Biomedical Engineering",
    calleResidente: "852 Spruce St, Hub City",
    periodo: "June 2023 - August 2023",
    nombreEmpresa: "Biomedical Engineering",
  },
  {
    nombre: "Daniel",
    apellidoMaterno: "Joseph",
    apellidoPaterno: "Lopez",
    numeroControl: "CN011",
    carreraResidente: "Data Science",
    calleResidente: "159 Hickory St, Blüdhaven",
    periodo: "May 2023 - July 2023",
    nombreEmpresa: "Data Science",
  },
  {
    nombre: "Olivia",
    apellidoMaterno: "Rose",
    apellidoPaterno: "Gonzalez",
    numeroControl: "CN012",
    carreraResidente: "Environmental Science",
    calleResidente: "357 Chestnut St, River City",
    periodo: "July 2023 - September 2023",
    nombreEmpresa: "Environmental Science",
  },
  {
    nombre: "James",
    apellidoMaterno: "Edward",
    apellidoPaterno: "Perez",
    numeroControl: "CN013",
    carreraResidente: "Physics",
    calleResidente: "951 Walnut St, Opal City",
    periodo: "June 2023 - August 2023",
    nombreEmpresa: "Physics",
  },
  {
    nombre: "Mia",
    apellidoMaterno: "Eleanor",
    apellidoPaterno: "Kim",
    numeroControl: "CN014",
    carreraResidente: "Mathematics",
    calleResidente: "753 Ash St, Emerald City",
    periodo: "May 2023 - July 2023",
    nombreEmpresa: "Mathematics",
  },
  {
    nombre: "Ethan",
    apellidoMaterno: "David",
    apellidoPaterno: "Nguyen",
    numeroControl: "CN015",
    carreraResidente: "Information Technology",
    calleResidente: "159 Poplar St, Ivy Town",
    periodo: "July 2023 - September 2023",
    nombreEmpresa: "Information Technology",
  },
];

const Filter = () => {
  const careersList = getDropdownItems("carreraResidente", studentsMock);
  console.log("career", careersList);
  const internshipPeriodList = getDropdownItems("periodo", studentsMock);

  const [selectedCareer, setSelectedCareer] = useState(""); // State to store the selected value in the parent
  const [selectedValuePeriod, setSelectedPeriod] = useState("");

  const handleSelectCareer = (value: any) => {
    setSelectedCareer(value); // Update parent state with selected value
    console.log("Selected in Parent:", value); // Optional: Debugging
  };

  const handleSelectPeriod = (value: any) => {
    setSelectedPeriod(value); // Update parent state with selected value
    console.log("Selected in Parent:", value); // Optional: Debugging
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Student Filter</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <input
          id="price"
          name="price"
          type="text"
          placeholder="Ingresa un nombre o número"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <Select
          onSelect={handleSelectCareer}
          items={careersList}
          placeholder="Carreras"
        />
        <Select
          onSelect={handleSelectPeriod}
          items={internshipPeriodList}
          placeholder="Periodo"
        />
      </div>
      <Table list={studentsMock} rowsPerPage={2} />
    </div>
  );
};

export default Filter;
