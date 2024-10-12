"use client";

import { useParams, useSearchParams } from "next/navigation";
import Card from "@/app/components/card/Card";
import Header from "@/app/components/header/Header";
import { getEntryByID } from "@/lib/dynamodb";
import { useEffect, useState } from "react";
import { extractKeyValuePairs } from "@/lib/utils";
import { generatePresignedUrl } from "@/lib/s3downloadNew";

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

const bucketName = process.env.NEXT_PUBLIC_S3_PDF_BUCKET_NAME;

export default function StudentDetail() {
  const { numeroControl } = useParams();
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

  const [urlDownload, setURLDownload] = useState("");

  const objectKey = `new-files/Solicitud-de-Residencia-Nueva-${numeroControl}.pdf`;

  useEffect(() => {
    const fetchData = async () => {
      const idString = searchParams.get("id");
      const id = idString ? Number(idString) : null;
      if (id !== null) {
        const dynamoDBData = await getEntryByID(id);
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

      if (!bucketName) {
        console.error(
          "S3 bucket name is not defined. Error from /app/private/queries/studentDetail/[numeroControl]/page.tsx"
        );
        return;
      }

      generatePresignedUrl(bucketName, objectKey).then((url) => {
        console.log("Pre-signed URL:", url);
        setURLDownload(url);
      });
    };
    fetchData();
  }, [objectKey, searchParams]);

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 space-y-6 sm:px-6 sm:py-16">
        <h1>Detalle de estudiante</h1>
        <Card header="Datos personales" data={personalData} />
        <Card header="Datos de la residencia" data={internshipData} />
        <Card header="Datos de la empresa" data={companyData} />
        <div className="flex justify-center">
          <a href={urlDownload} download>
            <button className="ui button b-button-primary">
              Descargar PDF
            </button>
          </a>
        </div>
      </div>
    </>
  );
}
