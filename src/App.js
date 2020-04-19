import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { loadLanguages } from "./scripts/client.js";
import { Choices } from "./Choices.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      links: ["Home", "About Us", "Volunteer"],
      languages: {
        values: [],
        label: "",
        selected: "",
      },
    };
  }

  handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  renderBreadCrumb(link, i) {
    return (
      <Link color="inherit" href="/" onClick={this.handleClick} key={i}>
        {link}
      </Link>
    );
  }

  componentDidMount() {
    let currComp = this;
    loadLanguages((data) => {
      var values = data.map((d) => {
        return { name: d.language, value: d.tag };
      });
      currComp.setState({
        languages: { values: values, label: "Language:", selected: "en-US" },
      });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Breadcrumbs aria-label="breadcrumb">
            {this.state.links.map((l, i) => this.renderBreadCrumb(l, i))}
          </Breadcrumbs>
          <Choices {...this.state.languages} />
        </header>
      </div>
    );
  }
}

export default App;
