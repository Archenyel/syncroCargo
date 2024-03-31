import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const BubbleChart = () => {
  const data1 = [3, 4, 3, 5, 4, 10, 12];
  const data2 = [1, 3, 2, 4, 5, 7, 9];
  const data3 = [2, 5, 4, 6, 7, 11, 14];

  const options = {
    chart: {
      type: 'area'
    },
    title: {
      text: 'Gráfico de Área Triple'
    },
    xAxis: {
      categories: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
    },
    yAxis: {
      title: {
        text: 'Valores'
      }
    },
    plotOptions: {
      area: {
        stacking: 'normal',
        fillOpacity: 0.5 // Controla la opacidad del relleno del área
      }
    },
    series: [{
      name: 'Área 1',
      data: data1,
      color: 'rgba(255, 0, 0, 0.5)' // Color del área 1 con opacidad reducida
    }, {
      name: 'Área 2',
      data: data2,
      color: 'rgba(0, 0, 255, 0.5)' // Color del área 2 con opacidad reducida
    }, {
      name: 'Área 3',
      data: data3,
      color: 'rgba(0, 255, 0, 0.5)' // Color del área 3 con opacidad reducida
    }]
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default BubbleChart;
