import React, { useState } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IP from '../components/IP';
import { faEdit, faExchange } from "@fortawesome/free-solid-svg-icons";
import { faMarkdown } from "@fortawesome/free-brands-svg-icons";
const Products = () => {
  const [users, setUsers] = useState([]);
  const [editar, setEditar] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    estatus: "",
    stock: "",
  });

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
        `${IP.IPUrl}/get_productos`
      );
      setUsers(response.data.productos);
    } catch (error) {
      console.error("Error:", error);
    }
  };

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

  //funcion que ingresa los datos del forms a un objeto de la clase formdata, esto por que el codeginiter feo no soporta JSON asi que tenemos que enviarlo como formdata
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("nombre", formData.nombre);
    data.append("estatus", formData.estatus);
    data.append("stock", formData.stock);

    const url = `${IP.IPUrl}/nuevo_producto`;

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

    const url = `${IP.IPUrl}/baja_producto`;

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

  const actualizar = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("id", formData.id);
    data.append("nombre", formData.nombre);
    data.append("estatus", formData.estatus);
    data.append("stock", formData.stock);

    const url = `${IP.IPUrl}/cambio_producto`;

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

  return (
    <div className="min-h-screen bg-gray-50/50">
      <SideBar />
      <div className=" p-4 xl:ml-80">
        <>
          <br />
          <div className="App">
            <h1 className="font-semibold text-2xl mt-7">Lista de Productos</h1>
          <button
            className="btn bg-sky-600/100 hover:bg-sky-400 rounded text-white p-2 font-semibold my-4"
            onClick={fetchUsers}
          >
            {" "}
            ver productos
          </button>
          <div className="overflow-x-auto w-1/2">
            <table className="table-auto text-center w-full border-collapse border-2 border-teal-500">
              <caption className="caption-top m-3">Tabla de Productos</caption>
              <thead>
                <tr className="bg-gradient-to-br from-gray-800 to-gray-900 text-white">
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Estatus</th>
                  <th>stock</th>
                  <th>Editar</th>
                  <th>Estatus</th>
                </tr>
              </thead>
              <tbody className="x">
                {users.map((user) => (
                  <tr key={user.id} className="">
                    <td className="">{user.id}</td>
                    <td className="">{user.nombre}</td>
                    <td className="">{user.estatus}</td>
                    <td className="">{user.stock}</td>
                    <td className="">
                      <button
                        className="btn bg-blue-600/100 hover:bg-gray-400 rounded text-white p-2 font-semibold"
                        onClick={() => {
                          editarCampos(user);
                          setEditar(true);
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit}/>
                      </button>
                    </td>
                    <td className="">
                      <button
                        className="btn bg-red-600/100 hover:bg-orange-500 rounded text-white p-2 font-semibold"
                        onClick={() => cambiarEstatus(user.id)}
                      >
                        <FontAwesomeIcon icon={faExchange}/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
          <br />
          <br />
          <br />
          <div>
            {editar ? <h1 className="font-semibold text-2xl mt-7"> Editar Productos</h1> : <h1 className="font-semibold text-2xl mt-7">Registrar Productos</h1>}
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
                <label>stock:</label>
                <input
                  className="rounded border-2 border-teal-700/100 m-2"
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                />
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

export default Products;
