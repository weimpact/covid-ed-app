import React, { Component } from "react";
import "./css/App.css";
import Home from "./Home.js";
import About from "./About.js";
import Support from "./Support.js";
import Hospitals from "./Hospitals.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Choices } from "./Choices.js";
import { loadLanguages } from "./scripts/client.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      languages: {
        values: [],
        label: "",
        selected: "",
      },
      languageChanged: this.languageChanged,
      pages: [
        {
          path: "/",
          view: Home,
          display: "Home",
        },
        {
          path: "/about",
          view: About,
          display: "About",
        },
        {
          path: "/support",
          view: Support,
          display: "Support",
        },
        {
          path: "/hospitals",
          view: Hospitals,
          display: "Hospitals",
        },
      ],
    };
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

  languageChanged(event) {
    this.setState({
      languages: { ...this.state.languages, selected: event.target.value },
    });
  }
  renderBreadCrumb(link, i) {
    return (
      <Link color="inherit" to={link.path} key={i}>
        {link.display}
      </Link>
    );
  }

  render() {
    return (
      <div className="App">
        <Router>
          <header className="App-header">
            <Breadcrumbs aria-label="breadcrumb">
              {this.state.pages.map((l, i) => this.renderBreadCrumb(l, i))}
            </Breadcrumbs>
            <Choices
              key="choice"
              values={this.state.languages.values}
              selected={this.state.languages.selected}
              callback={this.state.languageChanged.bind(this)}
            />
          </header>
          <Switch>
            <Route exact path="/">
              <Home locale={this.state.languages.selected} />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/support">
              <Support />
            </Route>
            <Route path="/hospitals">
              <Hospitals />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
