import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica de autenticación
    // Por simplicidad, asumimos que el inicio de sesión es exitoso si se proporciona un nombre de usuario y contraseña
    if (username && password) {
      setLoggedIn(true);
      alert("Inicio de sesión exitoso!");
    } else {
      alert("Por favor, ingresa un nombre de usuario y contraseña válidos");
    }
  };

  if (loggedIn) {
    return <h2>Bienvenido, {username}!</h2>;
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nombre de Usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    );
  }
}

export default Login;
