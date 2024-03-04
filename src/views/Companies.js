import React, { useState } from "react";
import axios from "axios";
import SideBar from "./SideBar";

const Companies = () => {
  const [users, setUsers] = useState([]);
  const [editar, setEditar] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    direccion: "",
    estatus: "",

  });

  const limpiar = () => {
    setFormData({
      id: "",
      nombre: "",
      direccion: "",
      estatus: "",
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
        "http://localhost/integradora/BACK/get_empresas"
      );
      setUsers(response.data.empresas);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //funcion que ingresa los datos del forms a un objeto de la clase formdata, esto por que el codeginiter feo no soporta JSON asi que tenemos que enviarlo como formdata
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("nombre", formData.nombre);
    data.append("direccion", formData.direccion);
    data.append("estatus", formData.estatus);


    const url = "http://localhost/integradora/BACK/nueva_empresa";

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
    data.append("direccion", formData.direccion);
    data.append("estatus", formData.estatus);

    const url = "http://localhost/integradora/BACK/cambio_empresa";

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

    const url = "http://localhost/integradora/BACK/baja_empresa";

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
    <div class="min-h-screen bg-gray-50/50">
      <SideBar/>
      <div className=" p-4 xl:ml-80">
      <div className="App">
        <h1 className="text-2xl text-sky-700 tracking-wide font-semibold">Lista de Empresas</h1>
        <button onClick={fetchUsers} className="btn rounded bg-sky-600 p-2 text-white font-bold m-4"> ver empresas</button>
        <table className="table-auto text-center">
          <thead className="border-4 border-sky-700 ">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Direccion</th>
              <th>Estatus</th>
              <th>Editar</th>
              <th>Estatus</th>
            </tr>
          </thead>
          <tbody className="border-4 border-sky-700">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="p-3">{user.id}</td>
                <td className="p-3">{user.nombre}</td>
                <td className="p-3">{user.direccion}</td>
                <td className="p-3">{user.estatus}</td>
                <td className="p-3">
                  <button
                    onClick={() => {
                      editarCampos(user);
                      setEditar(true);
                    }}
                    className="bg-orange-500 p-2 rounded text-white hover:bg-orange-300"
                  >
                    {" "}
                    Editar{" "}
                  </button>
                </td>
                <td className="p-3">
                  <button onClick={() => cambiarEstatus(user.id)}>
                    {" "}
                    Estatus{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        {editar ? <h2 className="font-semibold text-2xl mt-7"> Editar Empresa</h2> : <h2 className="font-semibold text-2xl mt-7">Registrar Empresa</h2>}
        <form onSubmit={editar ? actualizar : handleSubmit} className="my-5">
          <div>
            <label>Nombre:</label>
            <input
              className="rounded border-2 border-teal-700/100 m-3"
              required
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>direccion:</label>
            <input
              className="rounded border-2 border-teal-700/100 m-3"
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
            />
          </div>
          <button className="btn bg-green-600/100 hover:bg-green-400 rounded text-white p-2 font-semibold"
           type="submit">{editar ? "actualizar".toUpperCase() : "registrar".toUpperCase()}</button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default Companies;
