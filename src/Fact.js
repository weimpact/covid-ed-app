import React from "react";

import TableCell from "@material-ui/core/TableCell";

const Fact = (props) => {
  return (
    <TableCell component="th" scope="row">
      <div className="title">{props.title}</div>
      <div className="description">{props.description}</div>
      <ul>
        {props.articles
          ? props.articles.map((art, i) => (
              <li key={i}>
                <a href={art.url}>{art.title}</a>
              </li>
            ))
          : ""}
      </ul>
    </TableCell>
  );
};

const Myth = (props) => {
  return (
    <TableCell align="left">
      <div className="title">{props.title}</div>
      <div className="description">{props.description}</div>
    </TableCell>
  );
};

export { Fact, Myth };
