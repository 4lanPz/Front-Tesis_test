import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Mensaje from "../Alertas/Mensaje";
import { useFormik } from "formik";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import * as Yup from "yup";

const ModalNuevoTecnico = ({ onCancel }) => {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      ruc: "",
      telefono: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
        .required("El nombre es obligatorio")
        .matches(/^[a-zA-Z]+$/, "El nombre solo puede contener letras")
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(20, "El nombre debe tener máximo 20 caracteres"),
      apellido: Yup.string()
        .required("El apellido es obligatorio")
        .matches(/^[a-zA-Z]+$/, "El apellido solo puede contener letras")
        .min(3, "El apellido debe tener al menos 3 caracteres")
        .max(20, "El apellido debe tener máximo 20 caracteres"),
      ruc: Yup.string()
        .matches(/^[0-9]*$/, "El teléfono solo puede contener números")
        .min(10, "El RUC debe tener al menos 10 números")
        .max(13, "El RUC debe tener máximo 13 números")
        .required("El RUC es obligatorio"),
      telefono: Yup.string()
        .matches(/^[0-9]*$/, "El teléfono solo puede contener números")
        .min(6, "El teléfono debe tener al menos 6 números")
        .max(10, "El teléfono debe tener 10 números")
        .required("El teléfono es obligatorio"),
      email: Yup.string()
        .email("El correo electrónico no es válido")
        .required("El correo electrónico es obligatorio"),
      password: Yup.string()
        .required("La contraseña es obligatoria")
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/registro`;
        const respuesta = await axios.post(url, values);
        setMensaje({ respuesta: respuesta.data.msg, tipo: true });
        formik.resetForm();
        setLoading(false);
        setTimeout(() => {
          onCancel();
        }, 3000);
      } catch (error) {
        setMensaje({
          respuesta: error.response.data?.errors[0].msg,
          tipo: false,
        });
        setLoading(false);
      }
    },
  });
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-3/4 p-10 rounded-xl flex flex-col overflow-y-scroll h-3/4">
        <h1 className="poppins-bold text-center font-black text-black mb-3">
          Registrar nuevo técnico
        </h1>
        <div className="justify-center items-center">
          <div className="text-center"></div>
          <form onSubmit={formik.handleSubmit} className="mb-2">
            <div className="flex flex-wrap mb-3">
              <div className="w-1/2 pr-5">
                <label className="mb-1 block poppins-semibold" htmlFor="nombre">
                  Nombre:
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Ingresa tu nombre"
                  className="poppins-regular block w-full rounded-xl border border-gray-300 placeholder:text-gray-700 p-2 text-black"
                />
                {formik.touched.nombre && formik.errors.nombre ? (
                  <div className="text-red-500 poppins-regular">
                    {formik.errors.nombre}
                  </div>
                ) : null}
              </div>
              <div className="w-1/2 pl-5">
                <label
                  className="mb-1 block poppins-semibold"
                  htmlFor="apellido"
                >
                  Apellido:
                </label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={formik.values.apellido}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Ingresa tu apellido"
                  className="poppins-regular block w-full rounded-xl border border-gray-300 placeholder:text-gray-700 p-2 text-black"
                />
                {formik.touched.apellido && formik.errors.apellido ? (
                  <div className="text-red-500 poppins-regular">
                    {formik.errors.apellido}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex flex-wrap mb-3">
              <div className="w-1/2 pr-5">
                <label className="mb-1 block poppins-semibold" htmlFor="ruc">
                  Número de RUC:
                </label>
                <input
                  type="text"
                  id="ruc"
                  name="ruc"
                  value={formik.values.ruc}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Ingresa tu número de RUC"
                  className="poppins-regular block w-full rounded-xl border border-gray-300 placeholder:text-gray-700 p-2 text-black"
                />
                {formik.touched.ruc && formik.errors.ruc ? (
                  <div className="text-red-500 poppins-regular">
                    {formik.errors.ruc}
                  </div>
                ) : null}
              </div>
              <div className="w-1/2 pl-5">
                <label
                  className="mb-1 block poppins-semibold"
                  htmlFor="telefono"
                >
                  Teléfono / celular:
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formik.values.telefono}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Ingresa tu teléfono o celular"
                  className="poppins-regular block w-full rounded-xl border border-gray-300 placeholder:text-gray-700 p-2 text-black"
                />
                {formik.touched.telefono && formik.errors.telefono ? (
                  <div className="text-red-500 poppins-regular">
                    {formik.errors.telefono}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="mt-3">
              <label className="mb-1 block poppins-semibold" htmlFor="email">
                Correo electrónico:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Ingresa tu correo"
                className=" poppins-regular block w-full rounded-xl border border-gray-300 placeholder:text-gray-700 p-2 text-black"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 poppins-regular">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div className="mt-3 mb-3">
              <label className="mb-1 block poppins-semibold" htmlFor="password">
                Contraseña:
              </label>
              <div className="flex items-center">
                <div className="flex-grow pr-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="********************"
                    className="poppins-regular block w-full rounded-xl border border-gray-300 placeholder:text-gray-700 p-2 text-black"
                  />
                </div>
                <div className="flex-shrink-0 ">
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="flex items-center justify-center bg-[#5B72C3] rounded-full w-10 h-9 hover:scale-100 hover:bg-[#3D53A0]"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible className="text-white text-xl" />
                    ) : (
                      <AiOutlineEye className="text-white text-xl" />
                    )}
                  </button>
                </div>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 poppins-regular">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            {Object.keys(mensaje).length > 0 && (
              <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
            )}
            <div className="flex flex-grid text-center">
              <div className="w-2/3 px-5">
                <button
                  type="submit"
                  className={`w-full poppins-regular  m-3 text-white border py-2 rounded-xl duration-300 bg-[#5267b4] hover:bg-[#3D53A0] hover:text-white mb-0 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Cargando..." : "Registrar nuevo técnico"}
                </button>
              </div>
              <div className="w-2/3 px-5">
                <button
                  type="button"
                  className={
                    "w-full poppins-regular m-3 text-white border py-2 rounded-xl duration-300 bg-[#9b1746] hover:bg-[#af4369] hover:text-white mb-0 "
                  }
                  onClick={onCancel}
                >
                  {" "}
                  Cerrar{" "}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalNuevoTecnico;
