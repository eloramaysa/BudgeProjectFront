import React from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header>
      <img
        alt="Your Company"
        src="src/assets/icone.png"
        className="mx-auto h-14 w-auto"
      />
      <h1 className="mt-10 mb-10 text-center text-4xl/9 font-bold tracking-tight text-gray-900">
        BUDDY BUDGE
      </h1>
      <div style={{ marginTop: "1rem" }}>
        <button
          style={{ marginRight: "0.5rem" }}
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          style={{ marginRight: "0.5rem" }}
          onClick={() => navigate("/cadastro")}
        >
          Cadastro
        </button>
      </div>
    </header>
  );
};

export default Header;
