import StudentForm from "@/app/components/forms/student/StudentForm";

export default function Home() {
  return (
    <div>
      <StudentForm
        title="Solicitud de residencia profesional"
        instructions={
          <>
            <p>
              Llenar y enviar el siguiente formulario para procesar la solicitud
              de residencia para el periodo proyectado.
            </p>
            <p>
              <i>
                <b>Indicaciones:</b>
                <br />
              </i>
              <li>
                Los campos marcados con{""}
                <span
                  style={{
                    margin: "-.2em 0 0 .2em",
                    content: "*",
                    color: "#db2828",
                  }}
                >
                  *
                </span>{" "}
                son obligatorios
              </li>
              <li>
                Solo se permiten residencias de mínimo 1 integrantes y máximo 3
              </li>
              <li>
                En caso de que el domicilio partircular o de la empresa no
                cuente con <i>Número exterior</i>, indicar agregando <i>N/A</i>
              </li>
              <li>
                Los campos <i>Número interior</i> son opcionales y pueden
                permanecer en blanco
              </li>
              <li>
                Revise bien los datos antes de dar click en el botón de enviar
                ya que cualquier cambio deberá solicitarse al director de
                residencias
              </li>
            </p>
          </>
        }
      />
    </div>
  );
}
