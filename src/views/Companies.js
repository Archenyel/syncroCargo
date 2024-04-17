import React, { useState } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import MapContainer from "../components/MapContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faExchange } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import IP from "../components/IP";
const Companies = () => {
  const [users, setUsers] = useState([]);
  const [coox, setCoox] = useState();
  const [cooy, setCooy] = useState();
  const [editar, setEditar] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    estatus: "",
    direccion: "",
    PElongitud: "",
    PElatitud: "",
  });

  const limpiar = () => {
    setFormData({
      id: "",
      nombre: "",
      estatus: "",
      direccion: "",
      PElongitud: "",
      PElatitud: "",
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
      const response = await axios.get(`${IP.IPUrl}/get_empresas`);
      setUsers(response.data.empresas);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleValueFromChild = (value) => {
    setCoox(value.lng());
    setCooy(value.lat());
  };

  //funcion que ingresa los datos del forms a un objeto de la clase formdata, esto por que el codeginiter feo no soporta JSON asi que tenemos que enviarlo como formdata
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("nombre", formData.nombre);
    data.append("direccion", formData.direccion);
    data.append("estatus", 1);
    data.append("PElongitud", coox);
    data.append("PElatitud", cooy);

    const url = `${IP.IPUrl}/nueva_empresa`;

    axios
      .post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        limpiar();
        fetchUsers();
        toast.success("Nueva empresa agregada exitosamente !");
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
    data.append("estatus", 1);
    data.append("PElongitud", coox);
    data.append("PElatitud", cooy);

    const url = `${IP.IPUrl}/cambio_empresa`;

    axios
      .post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        limpiar();
        fetchUsers();
        toast.success("Empresa actualizada exitosamente !");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error al actualizar los datos de la empresa!");
      });
  };

  const cambiarEstatus = (e) => {
    const data = new FormData();
    data.append("id", e);

    const url = `${IP.IPUrl}/baja_empresa`;

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
      <SideBar />
      <div className=" p-4 xl:ml-80  ">
        <div className="App">
          <h1 className="text-2xl text-sky-700 tracking-wide font-semibold">
            Lista de Empresas
          </h1>
          <button
            onClick={fetchUsers}
            className="btn rounded bg-sky-600 p-2 text-white font-bold m-4"
          >
            ver empresas
          </button>
          <div className="overflow-x-auto">
            <table className="table-auto text-center w-1/2 border-collapse border-2 border-teal-500">
              <thead className="bg-gradient-to-br from-gray-800 to-gray-900 text-white">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Estatus</th>
                  <th>Editar</th>
                  <th>Estatus</th>
                </tr>
              </thead>
              <tbody className="">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-zinc-600 hover:text-white hover:font-semibold border-2 border-teal-500"
                  >
                    <td className="">{user.id}</td>
                    <td className="">{user.nombre}</td>
                    <td className="">{user.estatus}</td>
                    <td className="">
                      <button
                        onClick={() => {
                          editarCampos(user);
                          setEditar(true);
                        }}
                        className="bg-blue-700 p-2 rounded text-white hover:bg-gray-400"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </td>
                    <td className="">
                      <button
                        onClick={() => cambiarEstatus(user.id)}
                        className="bg-red-500 p-2 rounded text-white hover:bg-orange-500"
                      >
                        <FontAwesomeIcon icon={faExchange} />
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
            <h2 className="font-semibold text-2xl mt-7"> Editar Empresa</h2>
          ) : (
            <h2 className="font-semibold text-2xl mt-7">Registrar Empresa</h2>
          )}
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
            {/* <div>
            <label>direccion:</label>
            <input
              className="rounded border-2 border-teal-700/100 m-3"
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
            />
          </div> */}
            <div>
              <p className="text-xl font-bold text-left text-sky-800 mt-3 mb-2 ">
                Seleccione la empresa en el mapa
              </p>
              <p>Las coordenadas son: </p>
              <p>Latitud: {cooy}</p>
              <p>Longitu: {coox}</p>
              <MapContainer onValueChange={handleValueFromChild} />
            </div>
            <button
              className="btn bg-green-600/100 hover:bg-green-400 rounded text-white p-2 font-semibold"
              type="submit"
            >
              {editar ? "actualizar".toUpperCase() : "registrar".toUpperCase()}
            </button>
            {editar ? (
              <button
                className="btn bg-gray-600/100 hover:bg-gray-400 rounded text-white p-2 font-semibold"
                onClick={() => {
                  setEditar(false);
                  limpiar();
                }}
              >
                Cancelar
              </button>
            ) : (
              <></>
            )}
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Companies;
