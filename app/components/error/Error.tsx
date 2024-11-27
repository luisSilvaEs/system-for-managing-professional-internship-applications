import Link from "next/link";
import { AlertCircle } from "lucide-react";

interface ErrorProps {
  errorCode?: string | number;
  errorMessage?: string;
  onRetry?: () => void;
}

const ErrorPage = ({
  errorCode = "Oops!",
  errorMessage = "Something went wrong. Please try again.",
  onRetry,
}: ErrorProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-500">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <AlertCircle
          className="mx-auto h-16 w-16 text-red-500 mb-4"
          data-testid="alert-circle-icon"
        />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{errorCode}</h1>
        <p className="text-lg text-gray-600 mb-8">{errorMessage}</p>
        <div className="space-y-4">
          {onRetry && (
            <button
              onClick={onRetry}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Try Again
            </button>
          )}
          <Link href="/" className="text-blue-500 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
