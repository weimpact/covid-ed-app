var topk = {}

$.get("http://localhost:8080/countries/cases?top=10", function(data){ drawTopCountries(data.Countries); });
$.get("http://localhost:8080/countries/cases/aggregated?countries=ID,IN,SG&interval=daily", function(data){ 
    drawLines(data.CountriesCases, "countries_growth_daily"); 
});

$.get("http://localhost:8080/countries/cases/aggregated?countries=ID,IN,SG,Italy", function(data){ 
    drawLines(data.CountriesCases, "countries_growth_weekly"); 
});

function drawTopCountries(data) {
    var labels = $(data).map(function() { return this.Country }).get();
    var values = $(data).map(function() { return this.TotalConfirmed }).get();
    var ctx = document.getElementById('top_countries')
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: labels,
            datasets: [{
                label: 'Top Countries',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: values
            }]
        },

        // Configuration options go here
        options: {
            fill: false
        }
    });
}

function drawLines(data, canvasId) {
    var labels = $(data).map(function() { return this.Country }).get();
    var maxX = 0;
    var dataSet = $(data).map(
        function(i, d) {
            var ds = { data: d.Cases, label: d.Country, borderColor: "#3e95cd" };
            var m = d.Cases.length
            if (m > maxX) { maxX = m };
            return ds;
        }
    ).get();
    ylabels = _.range(maxX);
    console.log(maxX, ylabels)
    var chart = new Chart(document.getElementById(canvasId), {
        type: 'line',
        data: {
            labels: ylabels,
            datasets: dataSet
        },
        options: {
            title: {
                display: true,
                text: 'Covid Growth Country Pattern'
            }
        }
    });
}
