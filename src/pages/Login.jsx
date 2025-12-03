import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");

  const { login } = useAuthContext();
  const navigate = useNavigate();

  const manejarSubmit = (evento) => {
    evento.preventDefault();

    if (login(usuario, contraseña)) {
      navigate("/");
    } else {
      alert("Usuario o contraseña inválidos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#4C0463] px-4 sm:px-6 lg:px-8">
      <div className="bg-white/20 backdrop-blur-md shadow-2xl border-4 border-[#FF6ECE] rounded-2xl p-6 sm:p-8 md:p-10 w-full max-w-md">
        
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-[#FF6ECE] mb-6 sm:mb-8">
          ¡Bienvenido a Outsider's Shop!
        </h2>

        <form onSubmit={manejarSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-bold text-white">
              Usuario
            </label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="mt-1 block w-full rounded-lg border-2 border-white/70 bg-white/10 px-3 py-2 sm:px-4 sm:py-2 text-black placeholder-gray-300 focus:border-[#FF6ECE] focus:ring-[#FF6ECE]"
              placeholder="Ingrese su usuario"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-white">
              Contraseña
            </label>
            <input
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              className="mt-1 block w-full rounded-lg border-2 border-white/70 bg-white/10 px-3 py-2 sm:px-4 sm:py-2 text-black placeholder-gray-300 focus:border-[#FF6ECE] focus:ring-[#FF6ECE]"
              placeholder="Ingrese su contraseña"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF6ECE] hover:bg-[#ff47c9] text-white py-2.5 sm:py-3 rounded-lg font-bold text-lg sm:text-lg transition"
          >
            Ingresar
          </button>
        </form>

        <p className="mt-4 sm:mt-6 text-center text-sm sm:text-base text-white">
          ¿No tenés cuenta?
          <a href="#" className="font-bold ml-1 text-[#FF6ECE] hover:underline">
            Registrate acá
          </a>
        </p>

        
        <p className="mt-2 text-center text-xs text-white/80">
          Credenciales de ejemplo: <br />
          admin / 1234 <br />
          usuario / 1234
        </p>
      </div>
    </div>
  );
};

export default Login;