import React from 'react';
import Chart from "chart.js";
//var Chart = require('chart.js');

class ChartReview extends React.Component {
  constructor(props) {
    super(props);
    console.log('Chart Props: ', props);
    this.state = {
      data: props.ratingPercent,
      leftLabel: props.leftYlabel,
      rightLabel: props.rightYlabel

    };
    this.chartRef = React.createRef();
    //this.setHorizontalChart = this.setHorizontalChart.bind(this);
  }

  //var ctx = document.getElementById('canvas').getContext('2d');

  componentDidMount() {
    this.setHorizontalChart();

  }

  setHorizontalChart() {
    console.log('Chart Props component : ', this.props);
    const myChartRef = this.chartRef.current.getContext("2d");
    var horizonalBarChart = new Chart(myChartRef, {
      type: 'horizontalBar',
      data: {
        datasets: [

          {
            backgroundColor: ["#DE7921", "#DE7921", "#DE7921", "#DE7921", "#DE7921"],
            // data: ["60", "10", "30", "2", "10"],
            data: this.state.data ? this.state.data : null,
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
              labels: this.state.leftLabel,
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
              labels: this.state.rightLabel,
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

  render() {
    return (
      <div>
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    )
  }

}

export default ChartReview;
