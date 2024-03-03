import React, { useState, useEffect } from "react";
import axios from "axios";

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
    <>
      <button onClick={fetchUsers}> ver operaciones</button>
      <br />
      <div className="App">
        <h1>Lista de Operaciones</h1>
        <table>
          <thead>
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
          <tbody>
            {data.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.empresa}</td>
                <td>{user.tipo}</td>
                <td>{user.operador}</td>
                <td>{user.almacenista}</td>
                <td>{user.producto}</td>
                <td>{user.descripcionOperacion}</td>
                <td>{user.cantidad}</td>
                <td>{user.fechaConclusionEstimada}</td>
                <td>{user.cortina === 99 ? user.cortina : "sin asignar "}</td>
                <td>{user.estatus}</td>
                <td>
                  <button class="bg-indigo-500"
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

                    Estatus {user.id}
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
      <p class="text-6xl color-red-800"> ola k ase</p>
      <div>
        {editar ? <h1> Editar Operacion</h1> : <h1>Registrar Operacion</h1>}

        <form onSubmit={editar ? actualizar : handleSubmit}>
          <div>
            <label>Empresa:</label>
            <select
              name="empresa"
              id="empresa"
              value={formData.empresa}
              onChange={handleChange}
            >
              <option value=""> Selecciona una empresa </option>
              {empresas.map((empresa) => (
                <option value={empresa.id}>{empresa.nombre}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Tipo de operacion:</label>
            <select
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
            <label>Producto:</label>
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
            <label>
              cantidad:
              <input
                type="number"
                name="cantidad"
                id="cantidad"
                value={formData.cantidad}
                onChange={handleChange}
              ></input>
            </label>
          </div>
          <div>
            <label for="fecha">Selecciona una fecha:</label>
            <input
              type="date"
              id="fechaConclusionEstimada"
              name="fechaConclusionEstimada"
              value={formData.fechaConclusionEstimada}
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <label>
              descripcion:
              <input
                type="text"
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
              ></input>
            </label>
          </div>
          <button type="submit">{editar ? "actualizar" : "registrar"}</button>
        </form>
      </div>
    </>
  );
};

export default Operations;
