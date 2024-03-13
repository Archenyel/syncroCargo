import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

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
    </div>
  );
};

export default Graphics;
