import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Switch from "@mui/material/Switch";
import { userService } from "../Services/UserServices";
import { useNavigate } from "react-router-dom";
const Cadastro = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    allowdSendEmail: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setFormData((prev) => ({
      ...prev,
      allowdSendEmail: event.target.checked,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevStatus) => !prevStatus);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await userService.createUser(formData);

      if (result.success) {
        console.log("Sucesso:", result.data);
        setSuccess("Usuário Cadastrado com sucesso!");
        navigate("/dashboard", { state: { userId: result.data.id } });
      } else {
        setError(result.message || "Erro ao cadastrar usuário");
      }
    } catch (error) {
      setError("Erro inesperado ao processar a requisição");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Buddy Budge"
            src="src/assets/icone.png"
            className="mx-auto h-14 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Cadastro:
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {success}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="nome"
                className="flex block text-sm/6 font-medium text-gray-900"
              >
                Nome
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Nome Completo"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="flex block text-sm/6 font-medium text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="emailTeste@teste.com.br"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="flex text-sm/6 font-medium text-gray-900"
              >
                Senha
              </label>
              <div className="mt-2 flex items-center space-x-2">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="******"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="flex-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
                <button
                  onClick={togglePasswordVisibility}
                  type="button"
                  className="rounded-r-md bg-gray-200 px-2 py-1 text-gray-500 hover:bg-gray-300 hover:text-gray-700 focus:ring-2 focus:ring-indigo-600"
                >
                  {showPassword ? (
                    <VisibilityOffIcon fontSize="small" />
                  ) : (
                    <VisibilityIcon fontSize="small" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <span>Permitir enviar email </span>
              <Switch
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "black",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "black",
                  },
                  "& .MuiSwitch-track": {
                    backgroundColor: "#6a6e77",
                  },
                }}
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled", color: "black" }}
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`flex w-full justify-center rounded-md bg-custom-gray px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Enviando..." : "Salvar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Cadastro;
