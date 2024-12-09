import React from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

const SuccessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Enviado!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Tu solicitud ha sido enviada exitosamente!
        </p>
        {/*<Button asChild className="w-full">*/}
        <Link href="/students">Regresar</Link>
        {/*</Button>*/}
      </div>
    </div>
  );
};

export default SuccessPage;
