import _ from "lodash";

function collectConfirmed(data) {
  var values = data.Countries.map((d, k) => d.TotalConfirmed);
  var labels = data.Countries.map((d, k) => d.Country);
  return {
    title: "countries total cases (top)",
    values: values,
    labels: labels,
  };
}

function collectCountriesDeath(data) {
  var values = data.Countries.map((d, k) => d.TotalDeaths);
  var labels = data.Countries.map((d, k) => d.Country);
  return {
    title: "countries deaths (top)",
    values: values,
    labels: labels,
  };
}

function collectCountriesCasesGrowth(data) {
  var total = _.max(data.Countries.map((d, k) => d.Cases.length));
  var labels = _.range(total);
  var datasets = data.Countries.map((d, k) => {
    return { data: d.Cases, label: d.Country, borderColor: "#3e95cd" };
  });
  var res = {
    title: "countries growth",
    datasets: datasets,
    labels: labels,
  };
  return res;
}

export { collectConfirmed, collectCountriesCasesGrowth, collectCountriesDeath };
