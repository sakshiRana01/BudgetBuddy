import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import "../../src/compoments/Styles/UserData.css"
export const Chart = ({date,money}) => {
 
  
  const state = {
    series: [{
      name: 'Rupees',
      data:money
    }],
    options: {
      chart: {
        height: 230,
        type: 'area',
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return "Rs" + val ;
        },
        offsetY: -20,
        style: {
          fontSize: '15px',
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: date,
        position: 'left',
        axisBorder: {
          show: false
        },
        style:{
            fontSize:'20px',
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            }
          }
        },
        tooltip: {
          enabled: false,
        }
       
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + "Rs";
          }
        }
      },
     
    },
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={state.options} series={state.series} type="area" height={230} />
      </div>
    </div>
  );
};

export default Chart;
