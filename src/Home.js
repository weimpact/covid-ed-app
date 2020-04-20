import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import Dashboard from "./Dashboard.js";
import FactsMyths from "./FactsMyths.js";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: props.locale,
    };
  }

  render() {
    return (
      <body>
        <div className="home">
          <Dashboard />
          <FactsMyths />
        </div>
      </body>
    );
  }
}

export default Home;
