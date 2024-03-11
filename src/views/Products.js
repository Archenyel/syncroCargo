import React, { useState } from "react";
import axios from "axios";
import SideBar from "./SideBar";
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
        "http://localhost/integradora/BACK/get_productos"
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

    const url = "http://localhost/integradora/BACK/nuevo_producto";

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

    const url = "http://localhost/integradora/BACK/baja_producto";

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

    const url = "http://localhost/integradora/BACK/cambio_producto";

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
    <div class="min-h-screen bg-gray-50/50">
      <SideBar />
      <div className=" p-4 xl:ml-80">
        <>
          <button
            className="btn bg-green-600/100 hover:bg-green-400 rounded text-white p-2 font-semibold"
            onClick={fetchUsers}
          >
            {" "}
            ver productos
          </button>
          <br />
          <div className="App">
            <h1 className="font-semibold text-2xl mt-7">Lista de Productos</h1>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Estatus</th>
                  <th>stock</th>
                  <th>Editar</th>
                  <th>Estatus</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.nombre}</td>
                    <td>{user.estatus}</td>
                    <td>{user.stock}</td>
                    <td>
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
                    <td>
                      <button
                        className="btn bg-green-600/100 hover:bg-green-400 rounded text-white p-2 font-semibold"
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
                {editar ? "actualizar" : "registrar"}
              </button>
            </form>
          </div>
        </>
      </div>
    </div>
  );
};

export default Products;
