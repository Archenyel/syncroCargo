import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "./SideBar";

const Operations = () => {
  const [inputValue, setInputValue] = useState("");

  const [data, setData] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [operadores, setOperadores] = useState([]);
  const [almacenistas, setAlmacenistas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cortinas, setCortinas] = useState([]);
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

  const [formData2, setFormData2] = useState({
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
    setFormData2(e);
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

  const getCortinas = async () => {
    try {
      const response = await axios.get(
        "http://localhost/integradora/BACK/get_cortinas"
      );
      setCortinas(response.data.cortinas);
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

  const getOperadores = async () => {
    try {
      const response = await axios.get(
        "http://localhost/integradora/BACK/get_operadores"
      );
      setOperadores(response.data.personal);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getAlmacenistas = async () => {
    try {
      const response = await axios.get(
        "http://localhost/integradora/BACK/get_almacenistas"
      );
      setAlmacenistas(response.data.personal);
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

  const cambioEstatus = (id, estatus) => {
    const data = new FormData();

    data.append("id", id);
    data.append("estatus", estatus);

    const url = "http://localhost/integradora/BACK/operacionEstatus";

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

  //funcion que ingresa los datos del forms a un objeto de la clase formdata, esto por que el codeginiter feo no soporta JSON asi que tenemos que enviarlo como formdata
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("empresa", formData.empresa);
    data.append("tipo", formData.tipo);
    data.append("descripcion", formData.descripcion);
    data.append("operador", formData.operador);
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
    const data = new FormData();
    data.append("id", formData2.id);
    data.append("empresa", formData.empresa);
    data.append("tipo", formData.tipo);
    data.append("producto", formData.producto);
    data.append("operador", formData.operador);
    data.append("almacenista", formData.almacenista);
    data.append("descripcion", formData.descripcion);
    data.append("cantidad", formData.cantidad);
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

  const cambiarEstatus = (id, estatus) => {
    const data = new FormData();
    data.append("id", id);
    data.append("estatus", estatus);

    console.log(data);

    const url = "http://localhost/integradora/BACK/operacionEstatus";

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

  function estatus(estatus) {
    switch (estatus) {
      case "1":
        return "asignada";
      case "2":
        return "en ruta";
      case "3":
        return "en cortina";
      case "4":
        return "en carga";
      case "5":
        return "salida";
      case "6":
        return "en entrega";
      case "7":
        return "entragada";
      case "8":
        return "finalizada";
      case "0":
        return "Inactiva";
      default:
        return "Otro contenido para otros estatus";
    }
  }

  useEffect(() => {
    getPersonal();
    getOperadores();
    getEmpresas();
    getProductos();
    getCortinas();
    getAlmacenistas();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <SideBar/>
      <div className=" p-4 xl:ml-80">
        <>
          <div className="App">
          
            <h1 className="text-2xl text-sky-700 tracking-wide font-semibold">
              Lista de Operaciones
            </h1>
            <button
              onClick={fetchUsers}
              className="btn rounded bg-sky-600 p-2 text-white font-bold m-4"
            >
              {" "}
              ver operaciones activas
            </button>
            <button
              onClick={fetchUsers}
              className="btn rounded bg-sky-600 p-2 text-white font-bold m-4"
            >
              {" "}
              ver operaciones concluidas
            </button>
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
                  <th>Baja</th>
                </tr>
              </thead>
              <tbody className="border-4 border-sky-700">
                {data.map((user) => (
                  <tr key={user.id} className="border-3 border-sky-500">
                    <td className="p-3 ">{user.id}</td>
                    <td className="p-3 ">{user.empresa}</td>
                    <td className="p-3 ">
                      {user.tipo === "1" ? "carga" : "descarga"}
                    </td>
                    <td className="p-3 ">{user.operador}</td>
                    <td className="p-3 ">{user.almacenista}</td>
                    <td className="p-3 ">{user.producto}</td>
                    <td className="p-3 ">{user.descripcionOperacion}</td>
                    <td className="p-3 ">{user.cantidad}</td>
                    <td className="p-3 ">{user.fechaConclusionEstimada}</td>
                    <td className="p-3 ">
                      {user.cortina === 99 ? user.cortina : "sin asignar "}
                    </td>
                    <td className="p-3 ">{estatus(user.estatus)}</td>
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
                      <button
                        className="bg-red-500 p-2 rounded text-white hover:bg-orange-300"
                        onClick={() => cambiarEstatus(user.id)}
                      >
                        Dar de baja
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <br />
          {editar ? (
            <>
              <table className="table-auto text-center border-4 border-sky-700">
                <tr>
                  <th> Datos </th>
                  <th>Valores actuales:</th>
                  <th>Valores nuevos</th>
                </tr>
                <tr>
                  <th>ID:</th>
                  <td>{formData2.id}</td>
                  <td>NA</td>
                </tr>
                <tr>
                  <th>Empresa:</th>
                  <td>{formData2.empresa}</td>
                  <td>
                    <select
                      name="empresa"
                      id="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      className="rounded border-2 border-teal-700/100 m-3"
                    >
                      <option value=""> Selecciona una empresa </option>
                      {empresas.map((empresa) => (
                        <option value={empresa.id}>{empresa.nombre}</option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>Tipo de operacion:</th>
                  <td>{formData2.tipo}</td>
                  <td>
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
                  </td>
                </tr>
                <tr>
                  <th>Operador:</th>
                  <td>{formData2.operador}</td>
                  <td>
                    <select
                      className="rounded border-2 border-teal-700/100 m-3"
                      name="operador"
                      id="operador"
                      value={formData.operador}
                      onChange={handleChange}
                    >
                      <option> Operador </option>
                      {operadores.map((empleados) => (
                        <option value={empleados.id}>{empleados.nombre}</option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>Almacenista:</th>
                  <td>{formData2.almacenista}</td>
                  <td>
                    <select
                      className="rounded border-2 border-teal-700/100 m-3"
                      name="almacenista"
                      id="almacenista"
                      value={formData.almacenista}
                      onChange={handleChange}
                    >
                      <option> almacenista </option>
                      {almacenistas.map((empleados) => (
                        <option value={empleados.id}>{empleados.nombre}</option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>Producto:</th>
                  <td>{formData2.producto}</td>
                  <td>
                    <select
                      className="rounded border-2 border-teal-700/100 m-3"
                      name="producto"
                      id="producto"
                      value={formData.producto}
                      onChange={handleChange}
                    >
                      <option> producto </option>
                      {productos.map((producto) => (
                        <option value={producto.id}>{producto.nombre}</option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>Descripcion:</th>
                  <td>{formData2.descripcionOperacion}</td>
                  <td>
                    <input
                      className=" rounded border-2 border-teal-700/100 mt-4 mx-4 p-5"
                      type="text"
                      id="descripcion"
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleChange}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <th>Cantidad:</th>
                  <td>{formData2.cantidad}</td>
                  <td>
                    <input
                      className="rounded border-2 border-teal-700/100 m-3"
                      type="number"
                      name="cantidad"
                      id="cantidad"
                      value={formData.cantidad}
                      onChange={handleChange}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <th>Fecha estimada:</th>
                  <td>{formData2.fechaConclusionEstimada}</td>
                  <td>
                    <input
                      type="date"
                      id="fechaConclusionEstimada"
                      name="fechaConclusionEstimada"
                      value={formData.fechaConclusionEstimada}
                      onChange={handleChange}
                      className="border-2 border-teal-500/100 "
                    ></input>
                  </td>
                </tr>
                <tr>
                  <th>Cortina:</th>
                  <td>{formData2.cortina}</td>
                  <td>
                    <select
                      className="rounded border-2 border-teal-700/100 m-3"
                      name="cortina"
                      id="cortina"
                      value={formData.cortina}
                      onChange={handleChange}
                    >
                      <option> cortina </option>
                      {cortinas.map((cortina) => (
                        <option value={cortina.id}>{cortina.numero}</option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>acciones</th>
                  <td>
                    <button
                      onClick={() => {
                        setEditar(false);
                        limpiar();
                      }}
                      className="btn bg-green-600/100 hover:bg-green-400 rounded text-white p-2 font-semibold"
                    >
                      {"cancelar".toLocaleUpperCase()}
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => actualizar()}
                      className="btn bg-green-600/100 hover:bg-green-400 rounded text-white p-2 font-semibold"
                    >
                      {"actualizar".toLocaleUpperCase()}
                    </button>
                  </td>
                </tr>
              </table>
            </>
          ) : (
            <></>
          )}
          <div className="mt-6">
            {editar ? (
              <h2 className="font-semibold text-2xl mt-7"> Editar Operacion</h2>
            ) : (
              <h2 className="font-semibold text-2xl mt-7">
                Registrar Operacion
              </h2>
            )}

            <form onSubmit={handleSubmit} className="my-5">
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
                <label className="m-3">
                  Operador
                  <select
                    className="rounded border-2 border-teal-700/100 m-3"
                    name="operador"
                    id="operador"
                    value={formData.operador}
                    onChange={handleChange}
                  >
                    <option> Operador </option>
                    {operadores.map((empleados) => (
                      <option value={empleados.id}>{empleados.nombre} </option>
                    ))}
                  </select>
                </label>
              </div>
              <div>
                <label htmlFor="fecha" className="m-3">
                  Selecciona una fecha:
                </label>
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
              <button
                type="submit"
                className="btn bg-green-600/100 hover:bg-green-400 rounded text-white p-2 font-semibold"
              >
                {"registrar".toLocaleUpperCase()}
              </button>
            </form>
          </div>
        </>
      </div>
    </div>
  );
};

export default Operations;
