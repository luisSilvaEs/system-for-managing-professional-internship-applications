import StudentForm from "./components/forms/student/StudentForm";

export default function Home() {
  return (
    <div>
      <StudentForm
        title="Solicitud de residencia profesional"
        instructions={
          <p>
            Favor de llenar <strong style={{ color: "#db2828" }}>TODOS</strong>{" "}
            los campos para procesar la solicitud.
          </p>
        }
      />
    </div>
  );
}
