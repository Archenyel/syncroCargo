import React, { useCallback, useState, useEffect } from "react";
import { PieChart, Pie, Sector } from "recharts";
import IP from './IP';


const dataExample = [
  { name: "Almacenista 1", value: '4'},
  { name: "Almacenista 2", value: 1 },
  { name: "Maiklo", value: 3 },
  { name: "Juan Diaz", value: 2 }
];


//Creacion correcta del data deseado despues de la respuesta del servidor
let data = dataExample.map(empleado =>(
  {
    name: empleado.name,
    value: parseInt(empleado.value)
  }
))

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={fill}
        fontSize={16} // Ajusta el tamaño de la fuente del texto
      >
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={'#c10000'}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={'#d40000'} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 30} // Ajusta la posición x del texto
        y={ey}
        textAnchor={textAnchor}
        fill="#000"

      >{`Tareas: ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 30} // Ajusta la posición x del texto
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#4baaff"
      >
        {`(Carga actual de trabajo ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function Grafica3() {
  const [employes, setEmployes]= useState(data);
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(()=>{
    //Empleo funcion anonima para fetchear datos y obtener un graficado real
    (async()=>{
      const response = await fetch(`${IP.IPUrl}/get_dataWork`,{
        headers: {
          'Content-Type':'application/json'
        }
      })
      if(response.ok){
        const result = await response.json();
        console.log(result);
        setEmployes(result.data);
      }
      else{
        console.log('ERROR FETCHING');
      }
      let data = employes.map(empleado =>(
        {
          name: empleado.name,
          value: parseInt(empleado.value)
        }
      ))
      console.log(JSON.stringify(data));//compruebo la data y seteo mi estado
      setEmployes(data);
    })() //ejecuto la funcion automatica
  },[])
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <div name={'la grafica w2e'}>
      <PieChart width={1200} height={600}> {/* Ajusta el ancho de la gráfica */}
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={employes}
          cx={500} // Ajusta la posición x del centro de la gráfica
          cy={200}
          innerRadius={80}
          outerRadius={100}
          fill="#043e5e"
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </div>
  );
}
