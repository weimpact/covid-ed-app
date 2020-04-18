import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./css/Dashboard.css";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { loadCountriesData, loadCountriesGrowth } from "./scripts/client.js";
import {
  collectConfirmed,
  collectCountriesCasesGrowth,
  collectCountriesDeath,
} from "./scripts/converter.js";
import { drawBarChart, drawLineChart, drawPieChart } from "./scripts/chart.js";

class Dashboard extends Component {
  renderCanvas(id, desc, loadFn) {
    return <Canvas id={id} description={desc} loadData={loadFn} />;
  }

  loadTopCountriesData = (id) => (data) => {
    var res = collectConfirmed(data);
    drawBarChart(id, res);
  };

  loadCountriesGrowth = (id) => (data) => {
    var res = collectCountriesCasesGrowth(data);
    drawLineChart(id, res);
  };

  loadCountriesDeath = (id) => (data) => {
    var res = collectCountriesDeath(data);
    drawPieChart(id, res);
  };

  render() {
    return (
      <div className="container">
        <div className="dashboard-row row">
          {this.renderCanvas(
            "top_countries",
            "Top Countries Total Cases",
            loadCountriesData(
              { top: 10 },
              this.loadTopCountriesData("top_countries")
            )
          )}
          {this.renderCanvas(
            "countries_growth",
            "countries growth",
            loadCountriesGrowth(this.loadCountriesGrowth("countries_growth"))
          )}
        </div>
        <Grid container className="countries_with_deaths" spacing={2}>
          <Grid item xs={6} className="countries_with_deaths_desc">
            <Card className="deaths_description" variant="outlined">
              <CardContent>
                <Typography variant="body2" gutterBottom>
                  The risk of infection is serious if you are in an area where
                  there are confirmed cases, and the World Health Organization
                  (WHO) has labeled the outbreak a pandemic. <br />
                  Many countries around the world have now imposed travel
                  restrictions, but if you have recently traveled to an affected
                  area or been in close contact with someone with the virus,{" "}
                  <br />
                  you should seek medical advice and try to stay away from
                  public places.
                </Typography>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            {this.renderCanvas(
              "countries_with_deaths",
              "Countries With Deaths",
              loadCountriesData(
                { deaths: true },
                this.loadCountriesDeath("countries_with_deaths")
              )
            )}
          </Grid>
        </Grid>
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
      <div className="col">
        <Paper variant="outlined">
          <canvas id={this.state.id}></canvas>
        </Paper>
      </div>
    );
  }
}

ReactDOM.render(<Dashboard />, document.getElementById("dashboard"));
