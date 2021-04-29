import React, { Component } from "react";
import { loadMedias } from "./scripts/client.js";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

class Media extends Component {
  constructor(props) {
    super();
    this.state = {
      medias: [],
      summary: props.summary,
    };
  }

  refreshMedia(data) {
    this.setState({ medias: data.media });
  }

  componentWillMount() {
    loadMedias(this.refreshMedia.bind(this));
  }

  renderSummary() {
    return (
      <SimpleBar>
        <nav className="level">
          <div className="level-left">
            {this.state.medias.map((m, i) => (
              <div className="level-item" key={i}>
                <div className="box">
                  <figure className="image is-128x128">
                    <a href="/support">
                      {" "}
                      <img alt="support" src={m.url} />{" "}
                    </a>
                  </figure>
                  <div className="content">{m.title}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="level-right">
            <p className="level-item">
              <a className="button" href="/support">
                View More
              </a>
            </p>
          </div>
        </nav>
      </SimpleBar>
    );
  }

  renderDetailed() {
    return (
      <div className="columns is-multiline">
        {this.state.medias.map((m, i) => (
          <div className="column is-one-third" key={m.url}>
            <div className="box">
              <figure className="image ">
                <a href="/#">
                  {" "}
                  <img alt="media" src={m.url} />{" "}
                </a>
              </figure>
              <div className="content">{m.title}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  render() {
    const isSummary = this.state.summary;
    if (isSummary) {
      return this.renderSummary();
    }
    return this.renderDetailed();
  }
}

export default Media;
