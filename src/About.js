import React, { Component } from "react";

class About extends Component {
  constructor() {
    super();
    this.state = {
      content: [
        {
          title: "What's our aim ?",
          description: `covided aims to provide information necessary to understand the
                current situation, also hoping to help you to deal with it and
                how you could help others`,
        },
        {
          title: "Who're we ?",
          description: `We're volunteers not associated with any org, and building an opensource solution. If you would like to collaborate or give feedback please
            reach out to devdinu.cs@gmail.com`,
        },
        {
          title: "Is it official Data?",
          description: `The data is a collection and aggregated from different source, metrics are backed from https://api.covid19api.com/ and use the information after validating yourself.`,
        },
        {
          title: "Disclaimer",
          description: `The source's collected from various sites/blogs/knowledge is our own and we still would suggest user to verify and take it as per their state`,
        },
      ],
    };
  }

  renderExpansion(k, cont) {
    return (
      <article className="message">
        <div className="message-header">{cont.title}</div>
        <div className="message-body">{cont.description}</div>
      </article>
    );
  }

  render() {
    return (
      <div className="container">
        <div className="about_section">
          {this.state.content.map((c, i) => this.renderExpansion(i, c))}
        </div>
      </div>
    );
  }
}

export default About;
