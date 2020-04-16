import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {drawBarChart} from './chart.js';

class Dashboard extends Component {

  renderCanvas(id, desc, loadFn) {
    return <Canvas id={id} description={desc} loadData={loadFn} />
  }
  
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

  render() {
    return (
    <div className="dashboard-row">
      {this.renderCanvas("top_countries", "Top Countries", this.loadTopCountriesData('top_countries', drawBarChart))}
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
      <div> {this.state.description}
      <canvas id={this.state.id} width="250" height="100"></canvas>
      </div>
    ); 
  }

}

ReactDOM.render(<Dashboard />, document.getElementById('dashboard'))
