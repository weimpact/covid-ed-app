import config from "../config.js";
import axios from "axios";

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

function loadFunds(callback) {
  var url = config.backendApi + "/funds";
  axios
    .get(url)
    .then((response) => {
      callback(response.data);
    })
    .catch((error) => console.log("error loading funds", error));
}

function loadMedias(callback) {
  var url = new URL(config.backendApi + "/media");
  url.searchParams.set("type", "image");
  url.searchParams.set("category", "all");

  axios
    .get(url)
    .then((response) => {
      callback(response.data);
    })
    .catch((error) => console.log("error loading media", error));
}

export {
  loadCountriesData,
  loadCountriesGrowth,
  loadLanguages,
  loadFunds,
  loadMedias,
};
