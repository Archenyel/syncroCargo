import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "./SideBar";

const Operations = () => {
  const [data, setData] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [productos, setProductos] = useState([]);
  const [editar, setEditar] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    empresa: "",
    tipo: "",
    operador: "",
    almacenista: "",
    producto: "",
    descripcion: "",
    cantidad: "",
    estatus: "",
    fechaConclusionEstimada: "",
    cortina: "",
  });

  const limpiar = () => {
    setFormData({
      id: "",
      empresa: "",
      tipo: "",
      operador: "",
      almacenista: "",
      producto: "",
      descripcion: "",
      cantidad: "",
      estatus: "",
      fechaConclusionEstimada: "",
      cortina: "",
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
        "http://localhost/integradora/BACK/get_operaciones"
      );
      setData(response.data.operaciones);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getPersonal = async () => {
    try {
      const response = await axios.get(
        "http://localhost/integradora/BACK/get_personal"
      );
      setEmpleados(response.data.personal);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getProductos = async () => {
    try {
      const response = await axios.get(
        "http://localhost/integradora/BACK/get_productos"
      );
      setProductos(response.data.productos);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getEmpresas = async () => {
    try {
      const response = await axios.get(
        "http://localhost/integradora/BACK/get_empresas"
      );
      setEmpresas(response.data.empresas);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //funcion que ingresa los datos del forms a un objeto de la clase formdata, esto por que el codeginiter feo no soporta JSON asi que tenemos que enviarlo como formdata
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("empresa", formData.empresa);
    data.append("tipo", formData.tipo);
    data.append("descripcion", formData.descripcion);
    data.append("producto", formData.producto);
    data.append("cantidad", formData.cantidad);
    data.append("estatus", formData.estatus);
    data.append("fechaConclusionEstimada", formData.fechaConclusionEstimada);

    console.log(data);
    const url = "http://localhost/integradora/BACK/nueva_operacion";

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
    data.append("empresa", formData.empresa);
    data.append("tipo", formData.tipo);
    data.append("operador", formData.operador);
    data.append("almacenista", formData.almacenista);
    data.append("descripcion", formData.descripcion);
    data.append("cantidad", formData.cantidad);
    data.append("estatus", formData.estatus);
    data.append("fechaConclusionEstimada", formData.fechaConclusionEstimada);
    data.append("cortina", formData.cortina);

    const url = "http://localhost/integradora/BACK/cambio_operacion";

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

    const url = "http://localhost/integradora/BACK/baja_operacion";

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

  useEffect(() => {
    getPersonal();
  }, []);

  useEffect(() => {
    getEmpresas();
  }, []);

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <div class="min-h-screen bg-gray-50/50">
      <SideBar />
      <div className=" p-4 xl:ml-80">
        <>
          <div className="App">
            <h1 className="text-2xl text-sky-700 tracking-wide font-semibold">Lista de Operaciones</h1>
          <button onClick={fetchUsers} className="btn rounded bg-sky-600 p-2 text-white font-bold m-4"> ver operaciones</button>
            <table className="table-auto text-center">
              <thead className="border-4 border-sky-700 ">
                <tr>
                  <th>ID</th>
                  <th>empresa</th>
                  <th>tipo</th>
                  <th>operador</th>
                  <th>almacenista</th>
                  <th>producto</th>
                  <th>descripcion</th>
                  <th>cantidad</th>
                  <th>fecha fin</th>
                  <th>cortina</th>
                  <th>Estatus</th>
                  <th>Editar</th>
                  <th>Estatus</th>
                </tr>
              </thead>
              <tbody className="border-4 border-sky-700">
                {data.map((user) => (
                  <tr key={user.id} className="border-3 border-sky-500">
                    <td className="p-3 ">{user.id}</td>
                    <td className="p-3 ">{user.empresa}</td>
                    <td className="p-3 ">{user.tipo}</td>
                    <td className="p-3 ">{user.operador}</td>
                    <td className="p-3 ">{user.almacenista}</td>
                    <td className="p-3 ">{user.producto}</td>
                    <td className="p-3 ">{user.descripcionOperacion}</td>
                    <td className="p-3 ">{user.cantidad}</td>
                    <td className="p-3 ">{user.fechaConclusionEstimada}</td>
                    <td className="p-3 ">
                      {user.cortina === 99 ? user.cortina : "sin asignar "}
                    </td>
                    <td className="p-3 ">{user.estatus}</td>
                    <td className="p-3 ">
                      <button
                        className="bg-orange-500 p-2 rounded text-white hover:bg-orange-300"
                        onClick={() => {
                          editarCampos(user);
                          setEditar(true);
                        }}
                      >
                        {" "}
                        Editar{" "}
                      </button>
                    </td>
                    <td className="p-3 ">
                      <button onClick={() => cambiarEstatus(user.id)}>
                        Estatus {user.id}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6">
            {editar ? <h2 className="font-semibold text-2xl mt-7"> Editar Operacion</h2> : <h2 className="font-semibold text-2xl mt-7">Registrar Operacion</h2>}

            <form onSubmit={editar ? actualizar : handleSubmit} className="my-5">
              <div>
                <label className="m-3">Empresa:</label>
                <select
                  name="empresa"
                  id="empresa"
                  value={formData.empresa}
                  onChange={handleChange}
                  className="border-4 border-teal-500/100"
                >
                  <option value=""> Selecciona una empresa </option>
                  {empresas.map((empresa) => (
                    <option value={empresa.id}>{empresa.nombre}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="m-3">Tipo de operacion:</label>
                <select
                  className="rounded border-2 border-teal-700/100 m-3"
                  name="tipo"
                  id="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                >
                  <option value="">--Please choose an option--</option>
                  <option value="1">carga</option>
                  <option value="0">descarga</option>
                </select>
              </div>
              <div>
                <label className="m-3">Producto:</label>
                <select
                  name="producto"
                  id="producto"
                  value={formData.producto}
                  onChange={handleChange}
                >
                  <option> Selecciona un producto </option>
                  {productos.map((producto) => (
                    <option value={producto.id}>{producto.nombre}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="m-3">
                  cantidad:
                  <input
                    className="rounded border-2 border-teal-700/100 m-3"
                    type="number"
                    name="cantidad"
                    id="cantidad"
                    value={formData.cantidad}
                    onChange={handleChange}
                  ></input>
                </label>
              </div>
              <div>
                <label htmlFor="fecha" className="m-3">Selecciona una fecha:</label>
                <input
                  type="date"
                  id="fechaConclusionEstimada"
                  name="fechaConclusionEstimada"
                  value={formData.fechaConclusionEstimada}
                  onChange={handleChange}
                  className="border-2 border-teal-500/100 "
                ></input>
              </div>
              <div className="mb-4">
                <label className="m-3">
                  descripcion:
                  <input
                    className=" rounded border-2 border-teal-700/100 mt-4 mx-4 p-5"
                    type="text"
                    id="descripcion"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                  ></input>
                </label>
              </div>
              <button type="submit" className="btn bg-green-600/100 hover:bg-green-400 rounded text-white p-2 font-semibold">
                {editar ? "actualizar".toLocaleUpperCase() : "registrar".toLocaleUpperCase()}
              </button>
            </form>
          </div>
        </>
      </div>
    </div>
  );
};

export default Operations;
