import React, { useState, useEffect } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

// const dataResponse = [
//   { cortina: 1, fechaInicio: '10/04/2024 15:12:28', duracion: 13, humedad: 28, temperatura: 27.6 },
//   { cortina: 2, fechaInicio: '10/04/2024 15:11:30', duracion: 186, humedad: 30, temperatura: 27.1 },
//   { cortina: 1, fechaInicio: '12/04/2024 03:31:01', duracion: 11, humedad: 33, temperatura: 24.1 },
//   // ... otros datos
// ];

export default function Grafica4({dataResponse}) {
  const [data, setData] = useState({});

  useEffect(() => {
    console.log('Hola amigo',dataResponse[0]);
    const formattedData = {};
    dataResponse.forEach((item) => {
      const { cortina, humedad, temperatura } = item;
      if (!formattedData[cortina]) {
        formattedData[cortina] = [];
      }
      formattedData[cortina].push({ x: temperatura, y: humedad });
    });
    setData(formattedData);
  }, []);

  return (
    <ScatterChart
      width={500}
      height={400}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
      }}
    >
      <CartesianGrid />
      <XAxis type="number" dataKey="x" name="Temperatura" unit="°C" />
      <YAxis type="number" dataKey="y" name="Humedad" unit="%" />
      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
      {Object.keys(data).map((cortina, index) => (
        <Scatter
          key={index}
          name={`Cortina ${cortina}`}
          data={data[cortina]}
          fill={index % 2 === 0 ? "#8884d8" : "#82ca9d"} // Alternar colores cortina 1 morado cortina 2 verde
        />
      ))}
    </ScatterChart>
  );
}
