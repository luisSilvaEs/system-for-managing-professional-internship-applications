import React from "react";
import Link from "next/link";

const License = () => {
  return (
    <div className="bg-background flex flex-col items-center justify-center p-4 mt-12 md:mt-16">
      <div className="max-w-md scroll-auto">
        <h1>Licencia de Software</h1>
        <p>
          El presente software ha sido desarrollado de manera gratuita y se
          otorga bajo los siguientes términos y condiciones:
        </p>

        <h2>1. Concesión de Licencia</h2>
        <p>
          Se concede a Leonel Silva Gonzalez una licencia no exclusiva,
          intransferible y de uso limitado para el uso del software con el único
          propósito de gestionar las prácticas profesionales. El software no
          puede ser utilizado para fines distintos a los establecidos sin el
          consentimiento explícito del desarrollador.
        </p>

        <h2>2. Propiedad Intelectual y Licencia GPL</h2>
        <p>
          El software, incluyendo su código fuente, diseño y estructura, es
          propiedad intelectual del desarrollador. Sin embargo, se permite la
          modificación, distribución y uso del código bajo los términos de la{" "}
          <Link
            href="https://www.gnu.org/licenses/gpl-3.0.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Licencia Pública General de GNU (GPLv3)
          </Link>
          , lo que significa que cualquier modificación o redistribución del
          software debe cumplir con los términos de dicha licencia.
        </p>

        <h2>3. Limitación de Responsabilidad</h2>
        <p>
          El desarrollador no será responsable por ningún daño directo,
          indirecto, incidental, especial o consecuente que surja del uso o la
          imposibilidad de usar el software, incluyendo, pero no limitado a, la
          pérdida de datos, interrupciones del servicio o cualquier otra
          situación derivada del uso del software.
        </p>

        <h2>4. Uso de Datos Personales</h2>
        <p>
          El desarrollador no tiene acceso a los datos personales almacenados a
          través del uso del software. Dichos datos son gestionados por Leonel
          Silva Gonzalez y son responsabilidad exclusiva de sus administradores.
          El desarrollador no se hace responsable del mal uso o violación de la
          información almacenada en el sistema.
        </p>

        <h2>5. Almacenamiento en AWS</h2>
        <p>
          El software utiliza Amazon Web Services (AWS) para almacenar datos.
          Aunque AWS proporciona medidas de seguridad avanzadas, el
          desarrollador no puede garantizar la seguridad absoluta de la
          información y se deslinda de cualquier responsabilidad en caso de
          brechas de seguridad o accesos no autorizados a los datos almacenados.
        </p>

        <h2>6. Modificaciones</h2>
        <p>
          El desarrollador se reserva el derecho de realizar actualizaciones o
          mejoras al software sin previo aviso, pero no tiene obligación alguna
          de mantener o actualizar el software una vez entregado a Leonel Silva
          Gonzalez.
        </p>

        <h2>7. Terminación</h2>
        <p>
          La licencia de uso del software puede ser revocada en cualquier
          momento por el desarrollador, en caso de violación de los términos
          establecidos en esta licencia.
        </p>

        <h2>8. Jurisdicción</h2>
        <p>
          Esta licencia se rige por las leyes de los Estados Unidos Mexicanos.
          Cualquier controversia relacionada con el uso del software será
          resuelta por los tribunales competentes de la Ciudad de México.
        </p>
      </div>
    </div>
  );
};

export default License;
