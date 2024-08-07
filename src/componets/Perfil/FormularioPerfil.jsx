import { useContext, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthContext from "../../context/AuthProvider";
import Mensaje from "../Alertas/Mensaje";

const FormularioPerfil = () => {
  const [mensaje, setMensaje] = useState({});
  const { auth, actualizarPerfil, loading } = useContext(AuthContext);
  const [loading2, setLoading2] = useState(false);
  useEffect(() => {
    if (!loading && !auth._id) {
    }
  }, [loading, auth]);

  const formik = useFormik({
    initialValues: {
      id: auth._id,
      nombre: auth.nombre || "",
      apellido: auth.apellido || "",
      telefono: auth.telefono || "",
      email: auth.email || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      nombre: Yup.string()
        .required("El nombre es obligatorio")
        .matches(/^[a-zA-ZÀ-ÿ]+$/, "El nombre solo debe contener letras")
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(20, "El nombre debe tener máximo 20 caracteres"),
      apellido: Yup.string()
        .required("El apellido es obligatorio")
        .matches(/^[a-zA-ZÀ-ÿ]+$/, "El apellido solo debe contener letras")
        .min(3, "El apellido debe tener al menos 3 caracteres")
        .max(20, "El apellido debe tener máximo 20 caracteres"),
      telefono: Yup.string()
        .matches(/^[0-9]*$/, "El teléfono solo puede contener números")
        .min(5, "El teléfono debe tener al menos 6 números")
        .max(10, "El teléfono debe tener 10 números")
        .required("El teléfono es obligatorio"),
      email: Yup.string()
        .email("El correo electrónico no es válido")
        .required("El correo electrónico es obligatorio"),
    }),
    onSubmit: async (values) => {
      setLoading2(true);
      const resultado = await actualizarPerfil(values);
      setMensaje(resultado);
      setLoading2(false);
      setTimeout(() => {
        setMensaje({});
      }, 3000);
    },
  });

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div className="mt-5">
        <h1 className="poppins-bold text-black">Actualizar Datos Técnico</h1>
        <hr className="my-4" />
      </div>
      <form onSubmit={formik.handleSubmit}>
        {Object.keys(mensaje).length > 0 && (
          <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
        )}

        <div className="flex flex-wrap mb-3">
          <div className="w-1/2 pr-2">
            <label htmlFor="nombre" className="poppins-semibold text-black">
              Nombre:{" "}
            </label>
            <input
              id="nombre"
              type="text"
              className="poppins-regular border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-xl"
              placeholder="nombre"
              name="nombre"
              value={formik.values.nombre}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.nombre && formik.errors.nombre ? (
              <div className="text-red-500">{formik.errors.nombre}</div>
            ) : null}
          </div>
          <div className="w-1/2 pl-2">
            <label htmlFor="apellido" className="poppins-semibold text-black">
              Apellido:{" "}
            </label>
            <input
              id="apellido"
              type="text"
              className="poppins-regular border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-xl"
              placeholder="apellido"
              name="apellido"
              value={formik.values.apellido}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.apellido && formik.errors.apellido ? (
              <div className="text-red-500">{formik.errors.apellido}</div>
            ) : null}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="telefono" className="poppins-semibold text-black">
            Teléfono:{" "}
          </label>
          <input
            id="telefono"
            type="text"
            className="poppins-regular border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-xl"
            placeholder="telefono"
            name="telefono"
            value={formik.values.telefono}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.telefono && formik.errors.telefono ? (
            <div className="text-red-500">{formik.errors.telefono}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="poppins-semibold text-black">
            Correo electrónico:{" "}
          </label>
          <input
            id="email"
            type="text"
            className="poppins-regular border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-xl"
            placeholder="correo electrónico"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500">{formik.errors.email}</div>
          ) : null}
        </div>

        <button
          type="submit"
          className={`poppins-regular bg-[#5B72C3] w-full p-3 text-white rounded-xl hover:bg-[#3D53A0] cursor-pointer transition-all duration-300 ${
            loading2 ? "animate-pulse" : ""
          }`}
          disabled={loading2}
        >
          {loading2 ? "Cargando..." : "Actualizar Datos"}
        </button>
      </form>
    </>
  );
};

export default FormularioPerfil;
