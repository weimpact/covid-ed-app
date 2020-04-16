import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

class App extends Component {
  constructor() {
    super();
    this.state = {
      links: ["Home", "About Us", "Volunteer"],
    };
  }

  handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  renderBreadCrumb(link) {
    return (
      <Link color="inherit" href="/" onClick={this.handleClick}>
        {link}
      </Link>
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Breadcrumbs aria-label="breadcrumb">
            {this.state.links.map((l) => this.renderBreadCrumb(l))}
          </Breadcrumbs>
        </header>
      </div>
    );
  }
}

export default App;
