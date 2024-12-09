"use client";

import React from "react";
import ErrorPage from "../components/error/Error";

const ErrorHandler = ({
  error,
  reset,
}: {
  error: Error; // Updated type for better compatibility
  reset: () => void; // For retry functionality
}) => {
  return (
    <ErrorPage
      errorCode={error.name || "Error"} // Display error name
      errorMessage={error.message || "An unexpected error occurred."}
      onRetry={reset} // Pass reset function for retry button
    />
  );
};

export default ErrorHandler;
