import React from "react";
import merypLogo from "../../assets/merypLogo.png";
import epLogo from "../../assets/epLogo.png";
import LoginForm from "../../components/forms/LoginForm";

function Login() {
  return (
    <div className="relative h-screen flex items-center justify-around bg-blue-400">
      <div className="relative h-full flex flex-col justify-center items-end">
        <img src={merypLogo} className="w-[200px]" alt="Meryp Logo" />
        <img src={epLogo} className="w-[500px]" alt="EP Logo" />
      </div>

      <div className="h-full w-4/5 flex items-center justify-center  bg-gray-600 clip-path-polygon">
        <div className="flex flex-col gap-4 max-w-[400px] w-full ml-[200px]">
          <p className="text-3xl text-white font-semibold">Σύνδεση</p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
