import React, { Component } from "react";

const Banner = (props) => {
  return (
    <div className="tabs is-centered is-medium is-full-width">
      <ul>
        {props.pages.map((link, i) => (
          <li>
            <a href={link.path}>{link.display}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Banner;
