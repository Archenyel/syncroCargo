import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import IP from "../components/IP";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import BubbleChart from "../components/Grafica2";
import Grafica3 from "../components/Grafica3";

const firebaseConfig = {
  apiKey: "AIzaSyAbo3nsU9HlZ9kkFm5j8RmNe7XFulAa9pM",
  authDomain: "quiero-de.firebaseapp.com",
  databaseURL: "https://quiero-de-default-rtdb.firebaseio.com",
  projectId: "quiero-de",
  storageBucket: "quiero-de.appspot.com",
  messagingSenderId: "267109888442",
  appId: "1:267109888442:web:8a1805575e695223e6ad83",
  measurementId: "G-HD7N7BFE50",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Graphics = () => {
  const [data, setData] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const citiesCollection = collection(db, "sensores");
        const citySnapshot = await getDocs(citiesCollection);
        const data = citySnapshot.docs.map((doc) => doc.data());

        setData(data);

        const recuentos = {};
        data.forEach(({ lugar }) => {
          recuentos[lugar] = (recuentos[lugar] || 0) + 1;
        });

        setCategorias(Object.values(recuentos));
      } catch (error) {
        console.error("Error al obtener datos de Firestore:", error);
      }
    };
    fetchData();
  }, []);

  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Uso total por cortina",
    },
    xAxis: {
      categories: ["Cortina 1", "Cortina 2", "Cortina 3", "Cortina 4"],
    },
    yAxis: {
      title: {
        text: "Usos",
      },
    },
    series: [
      {
        name: "Uso medido",
        data: categorias,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <SideBar />
      <div className=" p-4 xl:ml-80">
        <div>graphicassassssss</div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
      <div className=" p-4 xl:ml-80">
        <div>graphicassassssss</div>
        <div>
          {/* Envuelve el componente BubbleChart con un contenedor div */}
          <BubbleChart />
        </div>
      </div>
      <div className="p-4 xl:ml-80">
        <p className="font-bold text-xl text-blue-700">
          Rendimiento del personal en tareas actuales
        </p>
        <div className="text-center mx-auto w-full max-w-xl">
          {/* 
    La grafica revelara los pendientes de nuestros empleados segun sus operaciones activas asignadas con el fin de ver
    la productividad o retraso en tiempo real de dichas tareas
    */}
          <div className="text-left w-full">
            <p className="text-gray-500/100 mx-3 px-3">
              ----- Para consultar el control de tareas por almacenista pasa el
              cursor sobre la grafica ---
            </p>
          </div>
          <div>
            <Grafica3 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graphics;
