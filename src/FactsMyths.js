import React, { Component } from "react";
import { Fact, Myth } from "./Fact.js";
import "./css/FactsMyths.css";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

class FactsMyths extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: props.rows,
    };
  }

  static getDerivedStateFromProps(props, state) {
    return { rows: props.rows };
  }

  render() {
    return (
      <div className="container">
        <Paper className="facts_table_paper">
          <TableContainer className="table_container">
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
                {this.state.rows.map((row, i) => (
                  <TableRow key={i}>
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

export default FactsMyths;
