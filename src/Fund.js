import React from "react";

const Fund = (props) => {
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title"> {props.title} </p>
      </header>
      <div className="card-content">
        <div className="card-image">
          <figure className="image is-4">
            <img src={props.image_url} alt={props.website} />
          </figure>
        </div>
        <div className="content has-text-centered">
          <p> {props.description} </p>
        </div>
      </div>
      <footer className="card-footer">
        <a className="card-footer-item" href={props.donate_url}>
          {" "}
          Donate{" "}
        </a>
        <a className="card-footer-item" href={props.website}>
          {" "}
          Know More{" "}
        </a>
      </footer>
    </div>
  );
};

export default Fund;
