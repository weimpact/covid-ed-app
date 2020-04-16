import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import './Dashboard.css'
import _ from 'lodash'
import {drawBarChart, drawLineChart} from './chart.js';

class Dashboard extends Component {

  renderCanvas(id, desc, loadFn) {
    return <Canvas id={id} description={desc} loadData={loadFn} /> }
  
  loadTopCountriesData = (id, drawFn) => () => {
    var url = 'http://covid-ed.herokuapp.com/countries/cases?top=10'

    fetch(url)
      .then(response => response.json())
      .then(data => {
        var values = data.Countries.map((d, k) => d.TotalConfirmed)
        var labels = data.Countries.map((d, k) => d.Country)
        var res = {values: values, labels: labels}
        drawFn(id, res);
      },

        (error) => {console.log("error! fetching api" + url + " " + error)}
      )
  }

  loadCountriesGrowth = (id, drawFn) => () => {
    var url = 'http://covid-ed.herokuapp.com/countries/cases/aggregated?countries=IN,ID&interval=weekly'

    fetch(url)
      .then(response => response.json())
      .then(data => {
        var total = _.max(data.Countries.map((d, k) => d.Cases.length))
        var labels = _.range(total)
        var datasets = data.Countries.map((d, k) => { return { data: d.Cases, label: d.Country, borderColor: "#3e95cd" }})
        var res = {datasets: datasets, labels: labels}
        drawFn(id, res);
      },

        (error) => {console.log("error! fetching api" + url + " " + error)}
      )
  }

  render() {
    return (
      <div className="container">
      <div className="dashboard-row row">
      {this.renderCanvas("top_countries", "Top Countries Total Cases", this.loadTopCountriesData('top_countries', drawBarChart))}
      {this.renderCanvas("countries_growth", "countries growth", this.loadCountriesGrowth('countries_growth', drawLineChart))}
      </div>
      </div>
    );
  }
}


class Canvas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadData: props.loadData,
      id: props.id,
      description: props.description,
      drawFn: props.drawFn,
    }
  }

  componentDidMount() {
    this.state.loadData()
  }

  render() {
    return (
      <div className="col"> {this.state.description}
      <canvas id={this.state.id}></canvas>
      </div>
    ); 
  }

}

ReactDOM.render(<Dashboard />, document.getElementById('dashboard'))
