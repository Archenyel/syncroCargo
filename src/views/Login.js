import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateEmail } from "../utils/ValidationMail";
import IP from "../components/IP";

function Login() {
  const navigation = useNavigate();
  //Declaracion de objeto formulario
  const [formValues, setFormValues] = useState(initializeForm());

  //Manejo de cambios en el input
  const handleChange = (input, event) => {
    //traer el form y setear el dato segun el campo
    setFormValues({ ...formValues, [input]: event.target.value });
  };

  const handleSubmit = async () => {
    if (formValues.email === "" || formValues.password === "") {
      //Campos Vacios
      return toast.error("Todos los campos son obligatorios", {
        theme: "dark",
      });
    }
    if (!validateEmail(formValues.email)) {
      //email no valido
      return toast.error("Email invalido", {
        theme: "dark",
      });
    }
    //Realizar solicitud a la API
    try {
      const formData = new FormData();
      formData.append("email", formValues.email);
      formData.append("password", formValues.password);

      const response = await fetch(`${IP.IPUrl}/login`, {
        method: "POST",
        body: formData,
      })
      if (response.ok) {
        const data = await response.json();
        console.log(data.resultado[0].rol)
        if (data.resultado[0].rol === "1") {
          sessionStorage.setItem("user", JSON.stringify(data));
          navigation("/Operations");
        } else {
          sessionStorage.setItem("user", null);
          toast.error("Credenciales invalidas");
          setFormValues(initializeForm);
        }
      } else {
        throw response.status;
      }
    } catch (err) {
      setFormValues(initializeForm);
      return toast.error("Credenciales Invalidas", {
        theme: "dark",
      });
    }
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // Aquí puedes agregar la lógica de autenticación
  //   // Por simplicidad, asumimos que el inicio de sesión es exitoso si se proporciona un nombre de usuario y contraseña
  //   if (username && password) {
  //     setLoggedIn(true);
  //     alert("Inicio de sesión exitoso!");
  //   } else {
  //     alert("Por favor, ingresa un nombre de usuario y contraseña válidos");
  //   }
  // };
  return (
    <div className="flex justify-center items-center h-screen bg-blue-900">
      {/* <!-- Left: Image --> */}
      <div className="w-1/2 h-screen hidden lg:block bg-white">
        <img
          src={require("../assets/elementos-fisicos-almacen.png")}
          alt=""
          className="object-cover w-full h-full"
        />
      </div>
      {/* <!-- Right: Login Form --> */}
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 bg-blue-900">
        <h1 className="text-8xl font-sans mb-4 text-white">SYNCRO-CARGO</h1>
        <form action="#" method="POST">
          {/* <!-- Username Input --> */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-white">
              Email
            </label>
            <input
              value={formValues.email}
              onChange={(e) => handleChange("email", e)}
              type="text"
              id="username"
              name="username"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
          </div>
          {/* <!-- Password Input --> */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-white">
              Password
            </label>
            <input
              value={formValues.password}
              onChange={(e) => handleChange("password", e)}
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
          </div>
          {/* <!-- Forgot Password Link --> */}
          <div className="mb-6 text-blue-500">
            <a
              href="mailto:syncro_cargo@gmail.com"
              className="hover:underline text-blue-300"
            >
              Forgot Password?
            </a>
          </div>
        </form>
        {/* <!-- Login Button --> */}
        <button
          onClick={() => handleSubmit()}
          className="bg-gray-500 hover:bg-blue-600 text-white p-8 font-semibold rounded-md py-2 px-5"
        >
          ACCEDER
        </button>
        {/* <!-- Sign up  Link --> */}
        <div className="mt-6 text-blue-500 text-center">
          <p className="text-white">
            Aun no tienes cuenta?{" "}
            <a
              href="mailto:syncro_cargo@gmail.com"
              className="hover:underline text-blue-500"
            >
              Solicitala
            </a>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

function initializeForm() {
  return {
    email: "",
    password: "",
  };
}

export default Login;
