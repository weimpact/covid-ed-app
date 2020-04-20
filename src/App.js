import React, { Component } from "react";
import "./css/App.css";
import Home from "./Home.js";
import About from "./About.js";
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
          path: "/voluneteer",
          view: About,
          display: "Volunteer",
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
            <Choices {...this.state.languages} />
          </header>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/volunteer">
              <About />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
