import React, { Component } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

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
          description: `We're volunteers not associated with any org, and building an opensource solution`,
        },
        {
          title: "Disclaimer",
          description: `The source's collected from various sites/blogs/knowledge is our own and we still would suggest user to verify and take it as per their state`,
        },
      ],
    };
  }

  renderExpansion(cont) {
    return (
      <ExpansionPanel expanded={true}>
        <ExpansionPanelSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h5"> {cont.title} </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>{cont.description}</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }

  render() {
    return (
      <Container>
        <div className="about_section">
          {this.state.content.map((c, i) => this.renderExpansion(c))}
        </div>
      </Container>
    );
  }
}

export default About;
