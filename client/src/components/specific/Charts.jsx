import React from 'react'
import {Line, Bar, Doughnut} from 'react-chartjs-2'
import {ArcElement, CategoryScale, Chart as ChartJS, Filler, Legend, LinearScale, LineElement, plugins, PointElement, scales, Tooltip} from 'chart.js'
import { getLast7Days } from '../../lib/features'

const labels=getLast7Days();
ChartJS.register(
   CategoryScale,
   Tooltip,
   Filler,
   LinearScale,
   PointElement,
   LineElement,
   ArcElement,
   Legend

)
const lineChartOptions={
    responsive:true,
    plugins:{
             legend:{
                display:false,
             },
             title:{
                display:false,
             },


    },

    scales:{
            x:{
                grid:{
                    display:false,
                },
              

            },
            y:{
                beginAtZero:true,
                grid:{
                    display:false,
                },
                 
            },


    }
}

const LineChart = ({value=[]}) => {
    const data={
      labels,
         datasets:[{
            data: value,
            label:"Revenue",
            fill:true,
            backgroundColor:"rgba(75,192,192,0.2)",
            borderColor:"rgba(75,192,192,1)",
         }]
    }
  return (
    <div>
      <Line data={data} options={lineChartOptions} />
    </div>
  )
}


const doughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: 120,
  };
  
  const DoughnutChart = ({ value = [], labels = [] }) => {
    const data = {
      labels,
      datasets: [
        {
          data: value,
          backgroundColor: ["rgba(75,192,192,0.2)", "rgba(255, 99, 132, 0.2)"],
          hoverBackgroundColor: ["rgba(75,192,192,0.4)", "rgba(255, 99, 132, 0.4)"],
          borderColor: ["rgba(75,192,192,1)", "rgba(255, 99, 132, 1)"],
          offset: 40,
        },
      ],
    };
    return (
      <Doughnut
        style={{ zIndex: 10 }}
        data={data}
        options={doughnutChartOptions}
      />
    );
  };

export {LineChart,DoughnutChart}
