var Chart = require('chart.js')

function drawBarChart(id, data) {
  console.log(id, data)
  var ctx = document.getElementById(id)
  var chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: [{
        label: data.title,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: data.values
      }]
    },
    // Configuration options go here
    options: { fill: false }
  });
}

export {drawBarChart};

