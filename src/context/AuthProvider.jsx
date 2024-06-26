import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  const perfil = async (token) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/perfil`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await axios.get(url, options);
      setAuth(respuesta.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const actualizarPerfil = async (datos) => {
    const token = localStorage.getItem("token");
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/tecnico/${datos.id}`;
      const options = {
        headers: {
          method: "PUT",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await axios.put(url, datos, options);
      perfil(token);
      return { respuesta: respuesta.data.msg, tipo: true };
    } catch (error) {
      return { respuesta: error.response.data.msg, tipo: false };
    }
  };
  const verificarAdmin = async (datos) => {
    const token = localStorage.getItem("token");
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/tecnico/verificar-admin/${datos}`;
      const options = {
        headers: {
          method: "get",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await axios.get(url, options);
      return { respuesta: respuesta.data.msg, tipo: true };
    } catch (error) {
      return { respuesta: error.response.data.msg, tipo: false };
    }
  };

  const actualizarPassword = async (datos) => {
    const token = localStorage.getItem("token");
    try {
      const url = `${
        import.meta.env.VITE_BACKEND_URL
      }/tecnico/actualizarpassword`;
      const options = {
        headers: {
          method: "PUT",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await axios.put(url, datos, options);
      return { respuesta: respuesta.data.msg, tipo: true };
    } catch (error) {
      return { respuesta: error.response.data.msg, tipo: false };
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      perfil(token);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        actualizarPerfil,
        actualizarPassword,
        verificarAdmin,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
