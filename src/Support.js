import React, { Component } from "react";
import Fund from "./Fund.js";
import { loadFunds } from "./scripts/client.js";
import Container from "@material-ui/core/Container";

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
    return <Fund {...fund} key={i} />;
  }

  render() {
    return (
      <div className="fund_information">
        <Container>
          {this.state.funds.map((fund, i) => this.renderFund(fund, i))}
        </Container>
      </div>
    );
  }
}

export default Support;
