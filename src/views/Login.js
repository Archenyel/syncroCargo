import React from "react";
import '../index.css';
import { Link } from "react-router-dom";

function Login() {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [loggedIn, setLoggedIn] = useState(false);

  // const handleUsernameChange = (event) => {
  //   setUsername(event.target.value);
  // };

  // const handlePasswordChange = (event) => {
  //   setPassword(event.target.value);
  // };

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
          <img src={require('../assets/elementos-fisicos-almacen.png')} alt="" className="object-cover w-full h-full"/>
        </div>
        {/* <!-- Right: Login Form --> */}
        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 bg-blue-900">
          <h1 className="text-8xl font-sans mb-4 text-white">SYNCRO-CARGO</h1>
          <form action="#" method="POST">
            {/* <!-- Username Input --> */}
            <div className="mb-4">
              <label htmlFor="username" className="block text-white">Username/Email</label>
              <input type="text" id="username" name="username" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off"/>
            </div>
            {/* <!-- Password Input --> */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-white">Password</label>
              <input type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off"/>
            </div>
            {/* <!-- Forgot Password Link --> */}
            <div className="mb-6 text-blue-500">
              <Link to='Operations' className="hover:underline">Forgot Password?</Link>
            </div>
            {/* <!-- Login Button --> */}
            <Link to={'/Operations'} className="bg-gray-500 hover:bg-blue-600 text-white p-8 font-semibold rounded-md py-2 px-5">ACCEDER</Link>
          </form>
          {/* <!-- Sign up  Link --> */}
          <div className="mt-6 text-blue-500 text-center">
            <p className="text-white">Aun no tienes cuenta? <Link to='Operations' className="hover:underline text-blue-500">Solicitala</Link></p>
          </div>
        </div>
      </div>        
    );
  }

export default Login;
