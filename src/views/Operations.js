import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faArrowRight, faBusinessTime } from "@fortawesome/free-solid-svg-icons";
import IP from "../components/IP";
import SideBar from "./SideBar";
import { faUpwork } from "@fortawesome/free-brands-svg-icons";

const Operations = () => {
  const [inputValue, setInputValue] = useState("");

  const [data, setData] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [operadores, setOperadores] = useState([]);
  const [almacenistas, setAlmacenistas] = useState([]);
  const [operaciones, setOperaciones] = useState([]);
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
    cortina: "",
  });
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");

  const toggleDescription = (description) => {
    setShowFullDescription(!showFullDescription);
    setSelectedDescription(description);
  };

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
      cortina: "",
    });
  };

  //setea los datos dentro de formData con los datos del usuario seleccionado en la tabla
  const editarCampos = (e) => {
    setFormData({
      id: e.id,
      empresa: e.empresa,
      tipo: e.tipo,
      operador: e.operador,
      almacenista: e.almacenista,
      producto: e.producto,
      descripcion: e.descripcion,
      cantidad: e.cantidad,
      estatus: e.estatus,
      cortina: e.cortina,
    });
    setFormData2(e);
  };

  //funcion que va llenando los campos dentro del objeto formdata(si asi se llama el objeto) con los datos ingresados en el forms
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //peticion usando fetch nativo de js para obtener los datos del backend de los empleados
  const fetchUsers = async (estado) => {
    try {
      const response = await axios.get(`${IP.IPUrl}/get_operaciones/${estado}`);
      setOperaciones(response.data.operaciones);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getCortinas = async () => {
    try {
      const response = await axios.get(`${IP.IPUrl}/get_cortinas`);
      setCortinas(response.data.cortinas);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getPersonal = async () => {
    try {
      const response = await axios.get(`${IP.IPUrl}/get_personal`);
      setEmpleados(response.data.personal);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getOperadores = async () => {
    try {
      const response = await axios.get(`${IP.IPUrl}/get_operadores`);
      setOperadores(response.data.personal);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getAlmacenistas = async () => {
    try {
      const response = await axios.get(`${IP.IPUrl}/get_almacenistas`);
      setAlmacenistas(response.data.personal);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getProductos = async () => {
    try {
      const response = await axios.get(`${IP.IPUrl}/get_productos`);
      setProductos(response.data.productos);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getEmpresas = async () => {
    try {
      const response = await axios.get(`${IP.IPUrl}/get_empresas`);
      setEmpresas(response.data.empresas);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const cambioEstatus = (id, estatus) => {
    const data = new FormData();

    data.append("id", id);
    data.append("estatus", estatus);

    const url = `${IP.IPUrl}/operacionEstatus`;

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (!isValid) {
      toast.warning("Llena el formulario correctamente");
      return;
    }

    const data = new FormData();
    data.append("empresa", formData.empresa);
    data.append("tipo", formData.tipo);
    data.append("descripcion", formData.descripcion);
    data.append("operador", formData.operador);
    data.append("almacenista", formData.almacenista);
    data.append("producto", formData.producto);
    data.append("cantidad", formData.cantidad);
    data.append("estatus", formData.estatus);

    const url = `${IP.IPUrl}/nueva_operacion`;
    try {
      const response = await fetch(url, {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        toast.success("Se ha agregado una operacion");
        limpiar();
      } else {
        toast.error("Error al agregar la operacion");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al agregar la operacion");
    }
  };

  const validateForm = () => {
    if (
      formData.empresa === "" ||
      formData.tipo === "" ||
      formData.producto === "" ||
      formData.cantidad === "" ||
      formData.operador === "" ||
      formData.descripcion === ""
    ) {
      return false;
    }
    return true;
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
    data.append("cortina", formData.cortina);
     console.log(JSON.stringify(Object.fromEntries(data.entries())));
      const url = `${IP.IPUrl}/cambio_operacion`;
      axios
        .post(url, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
           toast.success('Operacion Actualizada');
          limpiar();
          setEditar(false);
          fetchUsers();
        })
        .catch((error) => {
          toast.error('Error al actualizar operacion');
          console.error(error);
        });
  };

  const cambiarEstatus = (id, estatus) => {
    const data = new FormData();
    data.append("id", id);
    data.append("estatus", estatus);

    console.log(data);

    const url = `${IP.IPUrl}/operacionEstatus`;

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
      <SideBar />
      <div className=" p-4 xl:ml-80">
        <>
          <div className="App">
            <h1 className="text-2xl text-sky-700 tracking-wide font-semibold">
              Lista de Operaciones
            </h1>
            <button
              onClick={() => fetchUsers("activas")}
              className="btn rounded bg-green-600/100 p-2 text-white font-bold m-4 hover:bg-green-500/100"
            >
              <p>
                ver operaciones activas
              </p>
              <FontAwesomeIcon icon={faArrowRight}/>
            </button>
            <button
              onClick={() => fetchUsers("pendientes")}
              className="btn rounded bg-orange-600/100 p-2 text-white font-bold m-4 hover:bg-orange-800/100"
            >
              <span className="mr-2">Ver operaciones pendientes</span>
             <FontAwesomeIcon icon={faBusinessTime}/>
            </button>
            <button
              onClick={() => fetchUsers("concluidas")}
              className="btn rounded bg-sky-600 p-2 text-white font-bold m-4"
            >
              {" "}
              ver operaciones concluidas
            </button>
            <div className="overflow-x-auto">
              <table className="table-auto text-center w-full border-collapse border-2 border-teal-500">
                <caption className="caption-top m-3">
                  Tabla de operaciones
                </caption>
                <thead className="border border-teal-700 pb-3">
                  <tr className="bg-gradient-to-br from-gray-800 to-gray-900 text-white">
                    <th>ID</th>
                    <th>Empresa</th>
                    <th>Tipo</th>
                    <th>Operador</th>
                    <th>Almacenista</th>
                    <th>Producto</th>
                    <th>Descripcion</th>
                    <th>Cantidad</th>
                    <th>Cortina</th>
                    <th>Estatus</th>
                    <th>Editar</th>
                    <th>Baja</th>
                  </tr>
                </thead>
                <tbody>
                  {operaciones.map((operacion, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gradient-to-br from-gray-800 to-gray-900 hover:text-white hover:font-semibold border-2 border-teal-500"
                    >
                      <td>{operacion.id}</td>
                      <td className="border-2 border-teal-500 ">
                        {operacion.empresa}
                      </td>
                      <td className="border-2 border-teal-500 ">
                        {operacion.tipo === "1" ? "carga" : "descarga"}
                      </td>
                      <td className="border-2 border-teal-500 ">
                        {operacion.operador}
                      </td>
                      <td className="border-2 border-teal-500 ">
                        {operacion.almacenista}
                      </td>
                      <td className="border-2 border-teal-500 ">
                        {operacion.producto}
                      </td>
                      <td
                        className="p-3 border-2 border-teal-500 cursor-pointer"
                        onClick={() =>
                          toggleDescription(operacion.descripcionOperacion)
                        }
                        title={operacion.descripcionOperacion}
                      >
                        {showFullDescription
                          ? operacion.descripcionOperacion
                          : `${operacion.descripcionOperacion.substring(
                              0,
                              20
                            )}...`}
                      </td>
                      <td className="border-2 border-teal-500 ">
                        {operacion.cantidad}
                      </td>
                      <td className="border-2 border-teal-500 ">
                        {operacion.cortina && operacion.cortina !== '4'
                          ? operacion.cortina
                          : "sin asignar"}
                      </td>
                      <td className="border-2 border-teal-500 ">
                        {estatus(operacion.estatus)}
                      </td>
                      <td>
                        <button
                          className="bg-blue-500 p-2 rounded text-white hover:bg-gray-300"
                          onClick={() => {
                            editarCampos(operacion);
                            setEditar(true);
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                      </td>
                      <td>
                        <button
                          className="bg-red-500 p-2 rounded text-white hover:bg-red-200"
                          onClick={() => cambiarEstatus(operacion.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {editar ? (
            <>
              <h2 className="font-semibold text-2xl mt-7 mb-3 ml-4">
                Actualizar Operacion
              </h2>
              <table className="table-auto text-center border-4 border-sky-700">
                <tbody>
                  <tr>
                    <th> Datos </th>
                    <th>Valores actuales:</th>
                    <th>Valores nuevos</th>
                  </tr>
                  <tr>
                    <th>ID:</th>
                    <td>{formData2.id}</td>
                    <td>{formData2.id}</td>
                  </tr>
                  <tr>
                    <th>Empresa:</th>
                    <td>{formData2.empresa}</td>
                    <td>
                      <input
                        className=" rounded border-2 border-teal-700/100 mt-4 text-center"
                        type="text"
                        id="empresa"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleChange}
                        readOnly
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <th>Tipo de operacion:</th>
                    <td>{formData2.tipo == "0" ? "Descarga" : "Carga"}</td>
                    <td>
                      <input
                        className=" rounded border-2 border-teal-700/100 mt-4 text-center"
                        type="text"
                        id="tipo"
                        name="tipo"
                        value={formData.tipo}
                        onChange={handleChange}
                        readOnly
                      ></input>
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
                          <option value={empleados.id}>
                            {empleados.nombre}
                          </option>
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
                          <option value={empleados.id}>
                            {empleados.nombre}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th>Producto:</th>
                    <td>{formData2.producto}</td>
                    <td>
                      <input
                        className=" rounded border-2 border-teal-700/100 mt-4 text-center"
                        type="text"
                        id="producto"
                        name="producto"
                        value={formData.producto}
                        onChange={handleChange}
                        readOnly
                      ></input>
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
                        className=" rounded border-2 border-teal-700/100 mt-4 text-center"
                        type="text"
                        id="cantidad"
                        name="cantidad"
                        value={formData.cantidad}
                        onChange={handleChange}
                        readOnly
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <th>Cortina:</th>
                    <td>
                      {formData2.cortina && formData2.cortina != 99
                        ? formData2.cortina
                        : "Sin asignar"}
                    </td>
                    <td>
                      <select
                        className="rounded border-2 border-teal-700/100 m-3"
                        name="cortina"
                        id="cortina"
                        onChange={handleChange}
                      >
                        <option value="null" > Sin asignar</option>
                        {cortinas.map((cortina) => (
                          <option key={cortina.id} value={cortina.id}>
                            {cortina.numero}
                          </option>
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
                        className="btn bg-gray-600/100 hover:bg-gray-400 rounded text-white p-2 font-semibold"
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
                </tbody>
              </table>
            </>
          ) : (
            <>
              <h2 className="font-semibold text-2xl mt-7">
                Registrar Operacion
              </h2>
            </>
          )}
          {/*REGISTRO DE LA OPERACION*/}
          <div className="mt-6">
            <form onSubmit={handleSubmit} className="my-5" hidden={editar}>
              <div>
                <label className="m-3">Empresa:</label>
                <select
                  name="empresa"
                  id="empresa"
                  value={formData.empresa}
                  onChange={handleChange}
                  className="rounded border-2 border-teal-500/100"
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
                  <option value="1">Carga</option>
                  <option value="0">Descarga</option>
                </select>
              </div>
              <div>
                <label className="m-3">Producto:</label>
                <select
                  name="producto"
                  id="producto"
                  value={formData.producto}
                  onChange={handleChange}
                  className="rounded border-2 border-teal-700/100 m-3"
                >
                  <option> Selecciona un producto </option>
                  {productos.map((producto) => (
                    <option value={producto.id}>{producto.nombre}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="m-3">
                  Cantidad:
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
                  <p className="font-bold ">Operador</p>
                  <select
                    className="rounded border-2 border-teal-700/100 m-3"
                    name="operador"
                    id="operador"
                    value={formData.operador}
                    onChange={handleChange}
                  >
                    <option value={null}> Selecciona un Operador </option>
                    {operadores.map((empleados) => (
                      <option value={empleados.id}>{empleados.nombre} </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="mb-4 w-1/2">
                <label className="m-3 block">
                  Descripción:
                  <textarea
                    className="rounded border-2 border-teal-700/100 mt-4 mx-4 p-2 w-full h-32 resize-none"
                    id="descripcion"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                  ></textarea>
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
      <ToastContainer />
    </div>
  );
};

export default Operations;
