import React, { useState } from "react";
import axios from "axios";

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
    <>
      <button onClick={fetchUsers}> ver empresas</button>
      <br />
      <div className="App">
        <h1>Lista de Emprsas</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Direccion</th>
              <th>Estatus</th>
              <th>Editar</th>
              <th>Estatus</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nombre}</td>
                <td>{user.direccion}</td>
                <td>{user.estatus}</td>
                <td>
                  <button
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
      <br />
      <br />
      <br />
      <div>
        {editar ? <h1> Editar Empresa</h1> : <h1>Registrar Empresa</h1>}
        <form onSubmit={editar ? actualizar : handleSubmit}>
          <div>
            <label>Nombre:</label>
            <input
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
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
            />
          </div>
          <button type="submit">{editar ? "actualizar" : "registrar"}</button>
        </form>
      </div>
    </>
  );
};

export default Companies;
