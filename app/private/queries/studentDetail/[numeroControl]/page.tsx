"use client";

import { useParams, useSearchParams } from "next/navigation";
import Card from "@/app/components/card/Card";
import { getEntryByID } from "@/lib/dynamodb";
import { useEffect, useState } from "react";
import { extractKeyValuePairs } from "@/lib/utils";

export default function StudentDetail() {
  const searchParams = useSearchParams();
  const [personalData, setPersonalData] = useState<
    { label: string; paragraph: string }[]
  >([]);

  const [internshipData, setInternshipData] = useState<
    { label: string; paragraph: string }[]
  >([]);
  const [companyData, setCompanyData] = useState<
    { label: string; paragraph: string }[]
  >([]);

  const fieldsPersonal = [
    "apellidoMaterno",
    "apellidoPaterno",
    "nombre",
    "carreraResidente",
    "periodo",
    "numeroControl",
    "telefono",
    "email",
    "calleResidente",
    "coloniaResidente",
    "cpResidente",
    "ciudad",
  ];

  const fieldsInternship = [
    "jefeDivision",
    "opcionElegida",
    "numeroResidentes",
    "lugar",
    "fecha",
  ];

  const fieldsCompany = [
    "nombreEmpresa",
    "giroRamoSector",
    "otroRamoSector",
    "calleEmpresa",
    "coloniaEmpresa",
    "cpEmpresa",
    "ciudadEmpresa",
    "telefonoEmpresa",
    "nombreTitularEmpresa",
    "puestoTitularEmpresa",
    "nombrePersonaCartaPresentacion",
    "puestoPersonaCartaPresentacion",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const idString = searchParams.get("id");
      const id = idString ? Number(idString) : null;
      if (id !== null) {
        const dynamoDBData = await getEntryByID(id);
        console.log(`Dina: ${dynamoDBData.Item}`);
        const dynamoItem = dynamoDBData.Item;
        const personal = extractKeyValuePairs(dynamoItem, fieldsPersonal);
        setPersonalData(personal);
        const internship = extractKeyValuePairs(dynamoItem, fieldsInternship);
        setInternshipData(internship);
        const company = extractKeyValuePairs(dynamoItem, fieldsCompany);
        setCompanyData(company);
      } else {
        console.warn("'id' could not be obtained from URL");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1>Detalle de estudiante</h1>
      <Card header="Datos personales" data={personalData} />
      <Card header="Datos de la residencia" data={internshipData} />
      <Card header="Datos de la empresa" data={companyData} />
    </div>
  );
}
