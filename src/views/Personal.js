import React, { useState } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import IP from "../components/IP";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faHandshakeAltSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";

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
      const response = await axios.get(`${IP.IPUrl}/get_personal`);
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

    const url = `${IP.IPUrl}/nuevo_personal`;

    axios
      .post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        limpiar();
        fetchUsers();
        toast.success("Usuario actualizado");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error al actualizar al usuario");
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

    const url = `${IP.IPUrl}/cambio_personal`;

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

    const url = `${IP.IPUrl}/baja_personal`;

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
              className="btn bg-sky-600/100 hover:bg-sky-400 rounded text-white p-2 my-4 font-semibold"
              onClick={fetchUsers}
            >
              ver empleados
            </button>
            <div className="overflow-x-auto">
              <table className="table-auto text-center w-full border-collapse border-2 border-teal-700">
                <caption className="caption-top m-3">
                  Tabla de empleados
                </caption>
                <thead className="border border-teal-700 pb-3">
                  <tr className="bg-gradient-to-br from-gray-800 to-gray-900 text-white">
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Segundo N</th>
                    <th>Apellido P</th>
                    <th>Apellido M</th>
                    <th>Estatus</th>
                    <th>Rol</th>
                    <th>Fecha Ingreso</th>
                    <th>Editar</th>
                    <th>Suspender</th>
                  </tr>
                </thead>
                <tbody className="border-2 border-teal-700">
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-zinc-600 hover:text-white hover:font-semibold border-2 border-teal-700"
                    >
                      <td className="border-2 border-teal-500">{user.id}</td>
                      <td className="border-2 border-teal-500">
                        {user.nombre}
                      </td>
                      <td className="border-2 border-teal-500">
                        {user.segundoNombre}
                      </td>
                      <td className="border-2 border-teal-500">
                        {user.apellidoP}
                      </td>
                      <td className="border-2 border-teal-500">
                        {user.apellidoM}
                      </td>
                      <td className="border-2 border-teal-500">
                        {user.estatus}
                      </td>
                      <td className="border-2 border-teal-500">{user.rol}</td>
                      <td className="border-2 border-teal-500">
                        {user.registro}
                      </td>
                      <td className="">
                        <button
                          className="btn bg-blue-600/100 hover:bg-gray-400 rounded text-white p-3 font-semibold"
                          onClick={() => {
                            editarCampos(user);
                            setEditar(true);
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                      </td>
                      <td className="">
                        <button
                          className="btn bg-red-600/100 hover:bg-orange-400 rounded text-white p-3 font-semibold"
                          onClick={() => cambiarEstatus(user.id)}
                        >
                          <FontAwesomeIcon icon={faHandshakeAltSlash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            {editar ? (
              <h1 className="font-semibold text-2xl mt-7"> Editar empleado</h1>
            ) : (
              <h1 className="font-semibold text-2xl mt-7">
                Registrar empleado
              </h1>
            )}
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
              <div className="mx-3 mb-3">
                <label>Rol:</label>
                <label className="p-3">
                  <input
                    required
                    type="radio"
                    name="rol"
                    value="1"
                    onChange={handleChange}
                  />
                  administrador
                </label>
                <label className="p-3">
                  <input
                    type="radio"
                    name="rol"
                    value="2"
                    onChange={handleChange}
                  />
                  Operador
                </label>
                <label className="p-3">
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
                {editar
                  ? "actualizar".toUpperCase()
                  : "registrar".toUpperCase()}
              </button>
              <button
                className="btn bg-gray-600/100 hover:bg-gray-400 rounded text-white p-2 font-semibold"
                onClick={() => {
                  setEditar(false);
                  limpiar();
                }}
              >
                Cancelar
              </button>
            </form>
          </div>
        </>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Personal;
