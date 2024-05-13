import logoConfirm from "/images/confirmar.jpg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Mensaje from "../componets/Alertas/Mensaje";

export const Confirmar = () => {
  const { token } = useParams();
  const [mensaje, setMensaje] = useState({});
  const verifyToken = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/confirmar/${token}`;
      const respuesta = await axios.get(url);
      setMensaje({ respuesta: respuesta.data.msg, tipo: true });
    } catch (error) {
      setMensaje({ respuesta: error.response.data.msg, tipo: false });
    }
  };
  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <div className="w-full h-screen relative">
      <div className="absolute inset-0 bg-[url('/images/tecnico.jpg')] bg-no-repeat bg-cover bg-center opacity-70 blur-sm"></div>
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="bg-white p-10 rounded-xl z-10 lg:w-2/5 sm-2/5 w-auto absolute">
          {Object.keys(mensaje).length > 0 && (
            <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
          )}
          <div className="flex items-center justify-center mb-8">
            <img
              class="h-80 w-80 rounded-full border-4 border-solid border-black"
              src={logoConfirm}
              alt="Confirmar Técnico"
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="poppins-bold text-2xl md:text-2xl lg:text-3xl text-center text-black mt-12">
              ¡Muchas Gracias por confirmar tu cuenta!
            </p>
            <p className="poppins-semibold text-black mt-8">
              Ya puedes iniciar sesión
            </p>
            <Link
              to="/"
              className="poppins-regular p-3 m-5 w-full text-center green text-white  border rounded-xl hover:scale-105 duration-300 hover:bg-emerald-900 hover:text-white"
            >
              Iniciar sesión
            </Link>
            {/* <Link
              to="/login"
              className="poppins-regular p-3 m-5 w-full text-center green text-white  border rounded-xl hover:scale-105 duration-300 hover:bg-emerald-900 hover:text-white"
            >
              Iniciar sesión
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};
