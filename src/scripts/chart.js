var Chart = require("chart.js");

function drawBarChart(id, data) {
  var ctx = document.getElementById(id);
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.labels,
      datasets: [
        {
          barPercentage: 0.5,
          label: data.title,
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: data.values,
        },
      ],
    },
    // Configuration options go here
    options: { fill: false },
  });
}

function drawLineChart(id, data) {
  new Chart(document.getElementById(id), {
    type: "line",
    data: {
      labels: data.labels,
      datasets: data.datasets,
      backgroundColor: ["#3e95cd", "#8e5ea2"],
    },
    options: {
      title: {
        display: true,
        text: data.title,
      },
    },
  });
}

function drawPieChart(id, data) {
  new Chart(document.getElementById(id), {
    type: "pie",
    data: {
      labels: data.labels,
      datasets: [
        {
          label: data.title,
          backgroundColor: [
            "red",
            "#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#e8c3b9",
            "#c45850",
            "#145853",
          ],
          data: data.values,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: data.title,
      },
      legend: { display: false },
    },
  });
}

export { drawBarChart, drawLineChart, drawPieChart };
