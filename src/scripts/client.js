import config from "../config.js";

function loadCountriesData(filter, callback) {
  var url = new URL(config.backendApi + "/countries/cases");
  if (filter.top != undefined) {
    url.searchParams.set("top", filter.top);
  }
  if (filter.deaths != undefined) {
    url.searchParams.set("deaths", filter.deaths);
  }

  return function load() {
    fetch(url)
      .then((response) => response.json())
      .then(
        (data) => callback(data),

        (error) => {
          console.log("error! fetching api" + url + " " + error);
        }
      );
  };
}

function loadCountriesGrowth(countries, callback) {
  var url = new URL(config.backendApi + "/countries/cases/aggregated");
  url.searchParams.set("interval", "weekly");
  url.searchParams.set("countries", countries);

  return function load() {
    fetch(url)
      .then((response) => response.json())
      .then(
        (data) => callback(data),

        (error) => {
          console.log("error! fetching api" + url + " " + error);
        }
      );
  };
}

function loadLanguages(callback) {
  var url = config.backendApi + "/languages";

  fetch(url)
    .then((response) => response.json())
    .then(
      (data) => callback(data),

      (error) => {
        console.log("error! fetching api" + url + " " + error);
      }
    );
}

export { loadCountriesData, loadCountriesGrowth, loadLanguages };
