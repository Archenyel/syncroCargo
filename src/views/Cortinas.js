import React, { useState } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import IP from '../components/IP';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {ToastContainer, toast} from 'react-toastify';
import { faEdit, faExchange } from "@fortawesome/free-solid-svg-icons";
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
        `${IP.IPUrl}/get_cortinas`
      );
      setUsers(response.data.cortinas);
      toast.success('Cortinas consultadas')
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
    const url = `${IP.IPUrl}/nueva_cortina`;

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

    const url = `${IP.IPUrl}/baja_cortina`;

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

    const url = `${IP.IPUrl}/cambio_cortina`;

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
          <div className="App">
            <h1 className="font-semibold text-2xl mt-7">Lista de Cortinas</h1>
          <button
            className="btn bg-green-600/100 hover:bg-green-400 rounded text-white p-2 font-semibold my-4"
            onClick={fetchUsers}
          >
            {" "}
            ver cortinas
          </button>
            <div className="overflow-x-auto">
            <table className="table-auto text-center w-1/4 border-collapse border-2 border-teal-500">
            <caption className="caption-top m-3">Tabla de Cortinas</caption>
              <thead>
                <tr className="bg-gradient-to-br from-gray-800 to-gray-900 text-white">
                  <th>ID</th>
                  <th>Numero</th>
                  <th>Estatus</th>
                  <th>Editar</th>
                  <th>Estatus</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} 
                  className="hover:bg-zinc-600 hover:text-white hover:font-semibold border-2 border-teal-500"
                  >
                    <td className="">{user.id}</td>
                    <td className="">{user.numero}</td>
                    <td className="">{user.estatus}</td>
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
                    <td className="p-3">
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
      <ToastContainer/>
    </div>
  );
};

export default Cortinas;
