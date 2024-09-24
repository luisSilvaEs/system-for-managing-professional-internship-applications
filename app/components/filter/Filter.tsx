"use client";

import { getDropdownItems } from "./utilities";
import { useState, useEffect } from "react";
import Select from "../select/Select";

const studentsMock = [
  {
    givenName: "John",
    middleName: "Michael",
    lastName: "Doe",
    controlNumber: "CN001",
    career: "Computer Science",
    address: "123 Elm St, Springfield",
    internshipPeriod: "June 2023 - August 2023",
    internshipCompanyName: "Computer Science",
  },
  {
    givenName: "Jane",
    middleName: "Elizabeth",
    lastName: "Smith",
    controlNumber: "CN002",
    career: "Mechanical Engineering",
    address: "456 Oak St, Metropolis",
    internshipPeriod: "May 2023 - July 2023",
    internshipCompanyName: "Mechanical Engineering",
  },
  {
    givenName: "Alex",
    middleName: "James",
    lastName: "Brown",
    controlNumber: "CN003",
    career: "Electrical Engineering",
    address: "789 Pine St, Gotham",
    internshipPeriod: "July 2023 - September 2023",
    internshipCompanyName: "Electrical Engineering",
  },
  {
    givenName: "Emily",
    middleName: "Grace",
    lastName: "Davis",
    controlNumber: "CN004",
    career: "Civil Engineering",
    address: "321 Maple St, Star City",
    internshipPeriod: "June 2023 - August 2023",
    internshipCompanyName: "Civil Engineering",
  },
  {
    givenName: "Chris",
    middleName: "John",
    lastName: "Miller",
    controlNumber: "CN005",
    career: "Software Engineering",
    address: "654 Cedar St, Central City",
    internshipPeriod: "May 2023 - July 2023",
    internshipCompanyName: "Software Engineering",
  },
  {
    givenName: "Sarah",
    middleName: "Louise",
    lastName: "Garcia",
    controlNumber: "CN006",
    career: "Industrial Design",
    address: "987 Birch St, Coast City",
    internshipPeriod: "July 2023 - September 2023",
    internshipCompanyName: "Industrial Design",
  },
  {
    givenName: "David",
    middleName: "Andrew",
    lastName: "Martinez",
    controlNumber: "CN007",
    career: "Chemical Engineering",
    address: "246 Willow St, Keystone",
    internshipPeriod: "June 2023 - August 2023",
    internshipCompanyName: "Chemical Engineering",
  },
  {
    givenName: "Laura",
    middleName: "Marie",
    lastName: "Rodriguez",
    controlNumber: "CN008",
    career: "Architecture",
    address: "135 Redwood St, Fawcett City",
    internshipPeriod: "May 2023 - July 2023",
    internshipCompanyName: "Architecture",
  },
  {
    givenName: "Michael",
    middleName: "Paul",
    lastName: "Hernandez",
    controlNumber: "CN009",
    career: "Graphic Design",
    address: "753 Fir St, Midway City",
    internshipPeriod: "July 2023 - September 2023",
    internshipCompanyName: "Graphic Design",
  },
  {
    givenName: "Sophia",
    middleName: "Ann",
    lastName: "Wilson",
    controlNumber: "CN010",
    career: "Biomedical Engineering",
    address: "852 Spruce St, Hub City",
    internshipPeriod: "June 2023 - August 2023",
    internshipCompanyName: "Biomedical Engineering",
  },
  {
    givenName: "Daniel",
    middleName: "Joseph",
    lastName: "Lopez",
    controlNumber: "CN011",
    career: "Data Science",
    address: "159 Hickory St, Blüdhaven",
    internshipPeriod: "May 2023 - July 2023",
    internshipCompanyName: "Data Science",
  },
  {
    givenName: "Olivia",
    middleName: "Rose",
    lastName: "Gonzalez",
    controlNumber: "CN012",
    career: "Environmental Science",
    address: "357 Chestnut St, River City",
    internshipPeriod: "July 2023 - September 2023",
    internshipCompanyName: "Environmental Science",
  },
  {
    givenName: "James",
    middleName: "Edward",
    lastName: "Perez",
    controlNumber: "CN013",
    career: "Physics",
    address: "951 Walnut St, Opal City",
    internshipPeriod: "June 2023 - August 2023",
    internshipCompanyName: "Physics",
  },
  {
    givenName: "Mia",
    middleName: "Eleanor",
    lastName: "Kim",
    controlNumber: "CN014",
    career: "Mathematics",
    address: "753 Ash St, Emerald City",
    internshipPeriod: "May 2023 - July 2023",
    internshipCompanyName: "Mathematics",
  },
  {
    givenName: "Ethan",
    middleName: "David",
    lastName: "Nguyen",
    controlNumber: "CN015",
    career: "Information Technology",
    address: "159 Poplar St, Ivy Town",
    internshipPeriod: "July 2023 - September 2023",
    internshipCompanyName: "Information Technology",
  },
];

const Filter = () => {
  const careersList = getDropdownItems("career", studentsMock);
  console.log("career", careersList);
  const internshipPeriodList = getDropdownItems(
    "internshipPeriod",
    studentsMock
  );

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
          placeholder="0.00"
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
    </div>
  );
};

export default Filter;
