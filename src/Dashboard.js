import React, { Component } from "react";
import "./css/Dashboard.css";
import Introduction from "./Introduction.js";
import axios from "axios";
import { MultipleChoice } from "./Choices.js";
import config from "./config.js";
import Media from "./media.js";

import { loadCountriesData, loadCountriesGrowth } from "./scripts/client.js";
import {
  collectConfirmed,
  collectCountriesCasesGrowth,
  collectCountriesDeath,
} from "./scripts/converter.js";
import {
  drawBarChart,
  drawLineChart,
  drawPieChart,
  updateLineChart,
} from "./scripts/chart.js";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCountries: [],
      selectedCountries: [],
      graphs: {
        growthLineChart: null,
        topBarChart: null,
        pieChart: null,
      },
    };
  }

  renderCanvas(id, desc, loadFn) {
    return <Canvas id={id} description={desc} loadData={loadFn} />;
  }

  loadTopCountriesData = (id) => (data) => {
    var res = collectConfirmed(data);
    var chart = drawBarChart(id, res);
    this.setState({ graphs: { ...this.state.graphs, topBarChart: chart } });
  };

  loadCountriesGrowth = (id) => (data) => {
    var res = collectCountriesCasesGrowth(data);
    var chart = this.state.graphs.growthLineChart;
    if (chart != null) {
      updateLineChart(chart, res);
    } else {
      chart = drawLineChart(id, res);
      this.setState({
        graphs: { ...this.state.graphs, growthLineChart: chart },
      });
    }
  };

  loadCountriesDeath = (id) => (data) => {
    var res = collectCountriesDeath(data);
    var chart = drawPieChart(id, res);
    this.setState({ graphs: { ...this.state.graphs, pieChart: chart } });
  };

  loadCountries() {
    var url = config.backendApi + "/countries";
    axios
      .get(url)
      .then((response) => {
        var values = response.data.map((d) => {
          return { name: d.Slug, value: d.Slug };
        });
        this.setState({ allCountries: values });
      })
      .catch((error) => console.log("error loading countries data", error));
  }

  countriesChanged(event) {
    var selected = event.target.value;
    this.setState({ selectedCountries: selected });
  }

  refreshCountriesGrowth(event) {
    var countries = this.state.selectedCountries.join(",");
    loadCountriesGrowth(
      countries,
      this.loadCountriesGrowth("countries_growth")
    )();
  }

  componentWillMount() {
    this.loadCountries();
  }

  renderDashboardOptions() {
    return (
      <div className="column is-full">
        <nav className="level">
          <div className="level-left" />
          <div className="level-right">
            <p className="level-item">Countries:</p>
            <div className="level-item">
              <MultipleChoice
                id="country_choices"
                placeholder="Countries"
                multiple={true}
                values={this.state.allCountries}
                selected={this.state.selectedCountries}
                label="Countries to compare"
                onChange={this.countriesChanged.bind(this)}
                onClose={this.refreshCountriesGrowth.bind(this)}
              />
            </div>
            <div className="level-item field">
              <input
                id="cases_aggregation"
                type="checkbox"
                className="switch"
              />
              <label className="label">Weekly</label>
            </div>
          </div>
        </nav>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <Media summary={true} />
        <div className="columns is-multiline dashboard">
          {this.renderDashboardOptions()}
          <div className="column is-half">
            {this.renderCanvas(
              "top_countries",
              "Top Countries Total Cases",
              loadCountriesData(
                { top: 10 },
                this.loadTopCountriesData("top_countries")
              )
            )}
          </div>
          <div className="column is-half">
            {this.renderCanvas(
              "countries_growth",
              "weekly countries growth",
              loadCountriesGrowth(
                "ID,IN",
                this.loadCountriesGrowth("countries_growth")
              )
            )}
          </div>
          <div className="column is-half">
            <Introduction />
          </div>
          <div className="countries_with_deaths column is-half">
            {this.renderCanvas(
              "countries_with_deaths",
              "Countries With Deaths",
              loadCountriesData(
                { deaths: true },
                this.loadCountriesDeath("countries_with_deaths")
              )
            )}
          </div>
        </div>
      </div>
    );
  }
}

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadData: props.loadData,
      id: props.id,
      description: props.description,
      drawFn: props.drawFn,
    };
  }

  componentDidMount() {
    this.state.loadData();
  }

  render() {
    return (
      <div className="columns">
        <div className="column">
          <canvas id={this.state.id}></canvas>
        </div>
      </div>
    );
  }
}

export default Dashboard;
