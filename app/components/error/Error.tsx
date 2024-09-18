import Link from "next/link";
import { AlertCircle } from "lucide-react";

interface ErrorProps {
  errorCode?: string | number;
  errorMessage?: string;
}

const ErrorPage = ({
  errorCode = "Oops!",
  errorMessage = "Something went wrong. Please try again.",
}: ErrorProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-500">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <AlertCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{errorCode}</h1>
        <p className="text-lg text-gray-600 mb-8">{errorMessage}</p>
        {/*<Button asChild className="w-full bg-red-500 hover:bg-red-600">*/}
        <Link href="/">Return to Home</Link>
        {/*</Button>*/}
      </div>
    </div>
  );
};

export default ErrorPage;
