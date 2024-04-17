import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const BubbleChart = (props) => {
  const data1 = props.temperatura;
  const data2 = props.humedad;

  const optionsTemperatura = {
    chart: {
      type: 'area'
    },
    title: {
      text: 'Gráfico de Área de Temperatura'
    },
    xAxis: {
      categories: props.fechas
    },
    yAxis: {
      min: 0,
      max: 100,
      title: {
        text: 'Escala'
      }
    },
    plotOptions: {
      area: {
        stacking: 'normal',
        fillOpacity: 0.5
      }
    },
    series: [{
      name: 'temperatura',
      data: data1,
      color: 'green'
    }]
  };

  const optionsHumedad = {
    chart: {
      type: 'area'
    },
    title: {
      text: 'Gráfico de Área de Humedad'
    },
    xAxis: {
      categories: props.fechas
    },
    yAxis: {
      min: 0,
      max: 100,
      title: {
        text: 'Escala'
      }
    },
    plotOptions: {
      area: {
        stacking: 'normal',
        fillOpacity: 0.5
      }
    },
    series: [{
      name: 'humedad',
      data: data2,
      color: 'rgba(0, 0, 255, 0.5)'
    }]
  };

  return (
    <div>
      <div>
        <HighchartsReact highcharts={Highcharts} options={optionsTemperatura} />
      </div>
      <div>
        <HighchartsReact highcharts={Highcharts} options={optionsHumedad} />
      </div>
    </div>
  );
};

export default BubbleChart;