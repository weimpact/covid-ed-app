import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Fact, Myth } from "./Fact.js";
import "./FactsMyths.css";

import config from "./config.js";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

class FactsMyths extends Component {
  constructor() {
    super();
    this.state = {
      rows: [],
    };
  }

  fetchFactsMyths() {
    var url = config.backendApi + "/facts_myths";

    fetch(url)
      .then((response) => response.json())
      .then(
        (data) => {
          console.log("received......", data);
          this.setState({ rows: data });
        },

        (error) => {
          console.log("error! fetching api" + url + " " + error);
        }
      );
  }

  componentDidMount() {
    this.fetchFactsMyths();
  }

  render() {
    return (
      <div className="container">
        <Paper className="facts_table_paper">
          <TableContainer className={Paper}>
            <Table
              className="facts_myths_table"
              stickyHeader
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Facts</TableCell>
                  <TableCell align="left">Myths</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.rows.map((row) => (
                  <TableRow key={row.name}>
                    <Fact {...row.fact} />
                    <Myth {...row.myth} />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    );
  }
}

ReactDOM.render(<FactsMyths />, document.getElementById("facts_myths"));
