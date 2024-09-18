import StudentForm from "./components/forms/student/StudentForm";

export default function Home() {
  return (
    <div>
      <StudentForm
        title="Solicitud de residencia profesional"
        summary="Favor de llenar el siguiente formulario para procesar la solicitud de residencia profesional. TODOS los campos son obligatorios."
      />
    </div>
  );
}
