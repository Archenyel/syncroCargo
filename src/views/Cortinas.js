import React, { useState } from "react";
import axios from "axios";

const Cortinas = () => {
  const [users, setUsers] = useState([]);
  const [editar, setEditar] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    numero: "",
    estatus: "",
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
        "http://localhost/integradora/BACK/get_cortinas"
      );
      setUsers(response.data.cortinas);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const limpiar = () => {
    setFormData({
      id: "",
      numero: "",
      estatus: "",
    });
  };

  //funcion que ingresa los datos del forms a un objeto de la clase formdata, esto por que el codeginiter feo no soporta JSON asi que tenemos que enviarlo como formdata
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("numero", formData.numero);
    data.append("estatus", formData.estatus);

    const url = "http://localhost/integradora/BACK/nueva_cortina";

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

    const url = "http://localhost/integradora/BACK/baja_cortina";

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
    data.append("numero", formData.numero);
    data.append("estatus", formData.estatus);

    const url = "http://localhost/integradora/BACK/cambio_cortina";

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
    <>
      <button onClick={fetchUsers}> ver cortinas</button>
      <br />
      <div className="App">
        <h1>Lista de Cortinas</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Numero</th>
              <th>Estatus</th>
              <th>Editar</th>
              <th>Estatus</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.numero}</td>
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
        {editar ? <h1> Editar Cortina</h1> : <h1>Registrar cortina</h1>}
        <form onSubmit={editar ? actualizar : handleSubmit}>
          <div>
            <label>Numero:</label>
            <input
              required
              type="number"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
            />
          </div>
          <button type="submit">{editar ? "actualizar" : "registrar"}</button>
        </form>
      </div>
    </>
  );
};

export default Cortinas;
