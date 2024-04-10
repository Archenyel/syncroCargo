import React, {useState, useEffect} from 'react'
import IP from './IP'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
export default function Grafica3() {
  const [workers, setWorkers] = useState([]);
  const [newDataGraficaPie, setDataGraficaPie] = useState([]);
    
    useEffect(()=>{
        const getDailyWork = async () => {
        try {
          const response = await fetch(`${IP.IPUrl}/get_dataWork`, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            }
          });
          if (response.ok) {
            const result = await response.json();
            console.log(result.data);
            setWorkers(result.data);
            const newDataGraficaPie = workers.map(worker => ({
              y: parseInt(worker.TAREAS),
              name: worker.nombre
            }));
            setDataGraficaPie(newDataGraficaPie); // Actualizar el estado con los nuevos datos
          } else {
            throw response;
          }
        } catch (err) {
          console.log(err);
        }
      };
        getDailyWork();
    },[])
    
      
    const optionPieGraphic = {
        chart: {
          type: 'pie'
        },
        title: {
          text: 'Operaciones Pendientes Almacenistas'
        },
        tooltip: {
          valueSuffix: '%'
        },
        subtitle: {
          text: 'Rendimiento por Almacenista'
        },
        plotOptions: {
          series: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: [{
              enabled: true,
              distance: 20
            }, {
              enabled: true,
              distance: -40,
              format: '{point.percentage:.1f}%',
              style: {
                fontSize: '1.2em',
                textOutline: 'none',
                opacity: 0.7
              },
              filter: {
                operator: '>',
                property: 'percentage',
                value: 10
              }
            }]
          }
        },
        series: [
          {
            name: 'Operaciones activas referente al total',
            colorByPoint: true,
            data: newDataGraficaPie // Usar newDataGraficaPie aquí
          }
        ]
      };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={optionPieGraphic} />
    </div>
  )
}
