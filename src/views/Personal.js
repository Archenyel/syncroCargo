import React, { useState } from "react";
import axios from "axios";
import SideBar from "./SideBar";

const Personal = () => {
  const [users, setUsers] = useState([]);
  const [editar, setEditar] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    email: "",
    password: "",
    segundoNombre: "",
    apellidoP: "",
    apellidoM: "",
    rol: "",
  });

  const limpiar = () => {
    setFormData({
      id: "",
      nombre: "",
      email: "",
      password: "",
      segundoNombre: "",
      apellidoP: "",
      apellidoM: "",
      rol: "",
    });
  };

  //setea los datos dentro de formData con los datos del usuario seleccionado en la tabla
  const editarCampos = (e) => {
    setFormData(e);
  };

  //funcion que va llenando los campos dentro del objeto formdata(si asi se llama el objeto) con los datos ingresados en el forms
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //peticion usando fetch nativo de js para obtener los datos del backend de los empleados
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost/integradora/BACK/get_personal"
      );
      setUsers(response.data.personal);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //funcion que ingresa los datos del forms a un objeto de la clase formdata, esto por que el codeginiter feo no soporta JSON asi que tenemos que enviarlo como formdata
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("nombre", formData.nombre);
    data.append("segundoNombre", formData.segundoNombre);
    data.append("apellidoP", formData.apellidoP);
    data.append("apellidoM", formData.apellidoM);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("rol", formData.rol);

    const url = "http://localhost/integradora/BACK/nuevo_personal";

    axios
      .post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        limpiar();
        fetchUsers();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const actualizar = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("id", formData.id);
    data.append("nombre", formData.nombre);
    data.append("segundoNombre", formData.segundoNombre);
    data.append("apellidoP", formData.apellidoP);
    data.append("apellidoM", formData.apellidoM);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("rol", formData.rol);

    const url = "http://localhost/integradora/BACK/cambio_personal";

    axios
      .post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        limpiar();
        fetchUsers();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const cambiarEstatus = (e) => {
    const data = new FormData();
    data.append("id", e);

    const url = "http://localhost/integradora/BACK/baja_personal";

    axios
      .post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        fetchUsers();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <SideBar />
      <div className=" p-4 xl:ml-80">
        <>
          <div className="App">
            <h1 className="font-semibold text-2xl mt-7">Lista de Usuarios</h1>
          <button
            className="btn bg-green-600/100 hover:bg-green-400 rounded text-white p-2 my-4 font-semibold"
            onClick={fetchUsers}
          >
            {" "}
            ver empleados
          </button>
            <table className="table-auto text-center">
              <thead className="border-4 border-sky-700 mx-3 px-3">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>segundoNombre</th>
                  <th>apellido 1</th>
                  <th>apellido 2</th>
                  <th>estatus</th>
                  <th>rol</th>
                  <th>registro</th>
                  <th>Editar</th>
                  <th>Estatus</th>
                </tr>
              </thead>
              <tbody className="border-4 border-sky-700">
                {users.map((user) => (
                  <tr key={user.id} className="border-3 border-sky-500">
                    <td className="p-3">{user.id}</td>
                    <td className="p-3">{user.nombre}</td>
                    <td className="p-3">{user.segundoNombre}</td>
                    <td className="p-3">{user.apellidoP}</td>
                    <td className="p-3">{user.apellidoM}</td>
                    <td className="p-4">{user.estatus}</td>
                    <td className="p-4">{user.rol}</td>
                    <td className="p-3">{user.registro}</td>
                    <td className="p-3">
                      <button
                        className="btn bg-green-600/100 hover:bg-green-400 rounded text-white p-2 font-semibold"
                        onClick={() => {
                          editarCampos(user);
                          setEditar(true);
                        }}
                      >
                        {" "}
                        Editar{" "}
                      </button>
                    </td>
                    <td className="p-3">
                      <button
                        className="btn bg-orange-600/100 hover:bg-orange-400 rounded text-white p-2 font-semibold"
                        onClick={() => cambiarEstatus(user.id)}
                      >
                        {" "}
                        Estatus{" "}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <br />
          <br />
          <br />
          <div>
            {editar ? <h1 className="font-semibold text-2xl mt-7"> Editar empleado</h1> : <h1 className="font-semibold text-2xl mt-7">Registrar empleado</h1>}
            <form onSubmit={editar ? actualizar : handleSubmit}>
              <div>
                <label>Nombre:</label>
                <input
                  className="rounded border-2 border-teal-700/100 m-2"
                  required
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>segundo nombre:</label>
                <input
                  className="rounded border-2 border-teal-700/100 m-2"
                  type="text"
                  name="segundoNombre"
                  value={formData.segundoNombre}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>apellido paterno:</label>
                <input
                  className="rounded border-2 border-teal-700/100 m-2"
                  type="text"
                  name="apellidoP"
                  value={formData.apellidoP}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>apelldio materino:</label>
                <input
                  className="rounded border-2 border-teal-700/100 m-2"
                  type="text"
                  name="apellidoM"
                  value={formData.apellidoM}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>email:</label>
                <input
                  className="rounded border-2 border-teal-700/100 m-2"
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>contraseña:</label>
                <input
                  className="rounded border-2 border-teal-700/100 m-2"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='mx-3 mb-3'>
                <label>Rol:</label>
                <label className='p-3'>
                  <input
                    required
                    type="radio"
                    name="rol"
                    value="1"
                    onChange={handleChange}
                  />
                  administrador
                </label>
                <label className='p-3'>
                  <input
                    type="radio"
                    name="rol"
                    value="2"
                    onChange={handleChange}
                  />
                  Operador
                </label>
                <label className='p-3'>
                  <input
                    type="radio"
                    name="rol"
                    value="3"
                    onChange={handleChange}
                  />
                  Almacenista
                </label>
              </div>
              <button
                className="btn bg-green-600/100 hover:bg-green-400 rounded text-white p-2 font-semibold"
                type="submit"
              >
                {editar ? "actualizar".toUpperCase() : "registrar".toUpperCase()}
              </button>
            </form>
          </div>
        </>
      </div>
    </div>
  );
};

export default Personal;
