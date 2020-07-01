import React, { Component } from "react";
import { loadMedias } from "./scripts/client.js";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

class Media extends Component {
  constructor(props) {
    super();
    this.state = {
      medias: [],
    };
  }

  refreshMedia(data) {
    console.log("loaded media...", data);
    this.state.medias = data.media;
  }

  componentWillMount() {
    loadMedias(this.refreshMedia.bind(this));
  }

  render() {
    return (
      <SimpleBar>
        <nav className="level">
          <div className="level-left">
            {this.state.medias.map((m, i) => (
              <div className="level-item" key={i}>
                <div className="box">
                  <figure className="image is-128x128">
                    <img src={m.url} />
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
}

export default Media;
