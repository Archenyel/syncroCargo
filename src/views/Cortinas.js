import React, { useState } from "react";
import axios from "axios";
import SideBar from "./SideBar";

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
    <div class="min-h-screen bg-gray-50/50">
      <SideBar />
      <div className=" p-4 xl:ml-80">
        <>
          <div className="App">
            <h1 className="font-semibold text-2xl mt-7">Lista de Cortinas</h1>
          <button
            className="btn bg-green-600/100 hover:bg-green-400 rounded text-white p-2 font-semibold my-4"
            onClick={fetchUsers}
          >
            {" "}
            ver cortinas
          </button>
            <table className="table-auto text-center">
              <thead className="border-4 border-sky-700 ">
                <tr>
                  <th>ID</th>
                  <th>Numero</th>
                  <th>Estatus</th>
                  <th>Editar</th>
                  <th>Estatus</th>
                </tr>
              </thead>
              <tbody className="border-4 border-sky-700">
                {users.map((user) => (
                  <tr key={user.id} className="border-3 border-sky-500">
                    <td className="p-3">{user.id}</td>
                    <td className="p-3">{user.numero}</td>
                    <td className="p-3">{user.estatus}</td>
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
            {editar ? <h1 className="font-semibold text-2xl mt-7"> Editar Cortina</h1> : <h1 className="font-semibold text-2xl mt-7">Registrar cortina</h1>}
            <form onSubmit={editar ? actualizar : handleSubmit}>
              <div>
                <label>Numero:</label>
                <input
                  className="rounded border-2 border-teal-700/100 m-2"
                  required
                  type="number"
                  name="numero"
                  value={formData.numero}
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

export default Cortinas;
