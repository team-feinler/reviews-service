import React from 'react';
import Chart from "chart.js";
//var Chart = require('chart.js');

const ChartReview = (props) => {

  //const myChartRef = this.chartRef.current.getContext("2d");
  var context = document.getElementById("chart");
  if (context) {
    var ctx = document.getElementById('chart').getContext("2d");
    var horizonalBarChart = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        datasets: [
          {
            backgroundColor: ["#DE7921", "#DE7921", "#DE7921", "#DE7921", "#DE7921"],
            // data: ["60", "10", "30", "2", "10"],
            data: props.ratingPercent ? props.ratingPercent : null,
            label: null
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: false,
            gridLines: {
              display: false
            },
            scaleLabel: {
              display: true,
              labelString: ''
            },
            ticks: {
              steps: 8,
              stepSize: 10,
              max: 100,
              min: 0
            },
            stacked: true
          }],
          yAxes: [
            {
              barPercentage: 0.6,
              display: true,
              position: 'left',
              type: 'category',
              // labels: ["5 star", "4 star", "3 star", "2 star", "1 star"],
              labels: props.leftYlabel,
              weight: 1,
              stacked: true,
              gridLines: {
                display: false,
                drawBorder: false
              }

            },
            {
              offset: true,
              display: true,
              position: 'right',
              type: 'category',
              // labels: ["5%", "60%", "10%", "15%", "10%"],
              labels: props.rightYlabel,
              gridLines: {
                display: false,
                drawBorder: false
              }
            }
          ]
        }
      }
    });

  }



  return (
    <div>
      <canvas id="chart" />
    </div>
  );

}

export default ChartReview;