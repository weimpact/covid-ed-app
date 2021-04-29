import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import Dashboard from "./Dashboard.js";
import FactsMyths from "./FactsMyths.js";
import config from "./config.js";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: props.locale,
      refresh: false,
      rows: [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.locale !== state.locale) {
      return { locale: props.locale, refresh: true };
    }
    return null;
  }

  componentDidUpdate() {
    if (this.state.refresh) {
      this.fetchFactsMyths();
      this.setState({ refresh: false });
    }
  }

  componentDidMount() {
    this.fetchFactsMyths();
  }

  fetchFactsMyths() {
    var url = new URL(config.backendApi + "/facts_myths");
    url.searchParams.set("locale", this.state.locale);

    fetch(url)
      .then((response) => response.json())

      .then(
        (data) => {
          this.setState({ rows: data });
        },

        (error) => {
          console.log("error! fetching api" + url + " " + error);
        }
      );
  }

  render() {
    return (
      <div className="home">
        <Dashboard />
        <FactsMyths rows={this.state.rows} />
      </div>
    );
  }
}

export default Home;
