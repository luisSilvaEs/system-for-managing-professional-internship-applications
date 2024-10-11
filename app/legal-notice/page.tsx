import React from "react";
import Link from "next/link";

const LegalNotice = () => {
  return (
    <div className="h-5/6 bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <h1>Aviso Legal</h1>
        <p>
          La presente aplicación ha sido desarrollada de manera gratuita para el
          uso exclusivo del Instituto Tecnológico Superior de Huauchinango, bajo
          la dirección de su directivo. El uso de esta aplicación por parte de
          los alumnos y personal administrativo implica la aceptación de los
          siguientes términos y condiciones:
        </p>

        <h2>1. Responsabilidad del Desarrollador</h2>
        <p>
          El desarrollador de esta aplicación no se hace responsable por
          cualquier mal uso del software. El sistema ha sido diseñado
          exclusivamente para facilitar la gestión de las prácticas
          profesionales, y cualquier uso indebido del mismo queda fuera del
          alcance de la responsabilidad del desarrollador.
        </p>

        <h2>2. Protección de Datos</h2>
        <p>
          La información proporcionada por los alumnos y administradores se
          maneja con estricta confidencialidad y de acuerdo con la Ley Federal
          de Protección de Datos Personales en Posesión de los Particulares. Los
          datos son almacenados en servicios de Amazon Web Services (AWS), los
          cuales cumplen con los más altos estándares de seguridad.
        </p>

        <h2>3. Deslinde de Responsabilidades por Accesos No Autorizados</h2>
        <p>
          El desarrollador no se hace responsable en caso de que la información
          almacenada en la aplicación sea obtenida de forma ilegal por terceros
          a través de ciberataques, vulneraciones de seguridad o accesos no
          autorizados. Si bien se utilizan servicios de AWS que proporcionan
          altos niveles de seguridad, los riesgos inherentes al entorno digital
          están fuera del control del desarrollador.
        </p>

        <h2>4. Modificaciones al Software</h2>
        <p>
          El desarrollador se reserva el derecho de realizar mejoras o
          modificaciones al software sin previo aviso, pero no tiene ninguna
          obligación de mantener o actualizar el sistema tras su entrega.
        </p>

        <h2>5. Jurisdicción</h2>
        <p>
          Este aviso legal se rige por las leyes de los Estados Unidos
          Mexicanos. Cualquier controversia que surja en relación con el uso de
          la aplicación será resuelta en los tribunales competentes de la Ciudad
          de México.
        </p>
      </div>
    </div>
  );
};

export default LegalNotice;
