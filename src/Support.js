import React, { Component } from "react";
import Fund from "./Fund.js";
import { loadFunds } from "./scripts/client.js";
import Media from "./media.js";

class Support extends Component {
  constructor() {
    super();
    this.state = {
      funds: [],
    };
  }

  loadFundsCallback(data) {
    console.log("loaded...", data);
    this.setState({
      funds: data,
    });
  }

  componentDidMount() {
    loadFunds(this.loadFundsCallback.bind(this));
  }

  renderFund(fund, i) {
    return (
      <div className="column is-half">
        <Fund {...fund} key={i} />;
      </div>
    );
  }

  render() {
    return (
      <div className="fund_information">
        <div className="container">
          <div className="columns is-multiline">
            {this.state.funds.map((fund, i) => this.renderFund(fund, i))}
          </div>
        </div>
        <div className="container">
          <Media summary={false} />
        </div>
      </div>
    );
  }
}

export default Support;
