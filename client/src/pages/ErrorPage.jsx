import React from "react";
import { Button } from "antd";
import { useNavigate, useRouteError } from "react-router-dom";
import { AiOutlineWarning } from "react-icons/ai";

function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#3b82f6] to-[#81a7e4]">
      <div className="text-center bg-white p-10 rounded-lg shadow-xl w-4/5 max-w-md">
        <div className="mb-6">
          <AiOutlineWarning className="text-red-500 text-8xl mx-auto" />
        </div>
        <h1 className="text-6xl font-extrabold text-gray-800 mb-4">
          {error?.status}
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          {error?.statusText || "Page not found"}
        </p>
        <Button
          type="primary"
          onClick={() => navigate("/login")}
          className="bg-[#3b82f6] hover:bg-[#2563eb] text-white border-none py-2 px-4 rounded-lg shadow-md"
        >
          Go back
        </Button>
      </div>
    </div>
  );
}

export default ErrorPage;
