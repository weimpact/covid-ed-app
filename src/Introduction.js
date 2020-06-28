import React, { Component } from "react";

class Introduction extends Component {
  render() {
    return (
      <article className="message deaths_description">
        <div className="message-header">Introduction</div>
        <div className="message-body">
          The risk of infection is serious if you are in an area where there are
          confirmed cases, and the World Health Organization (WHO) has labeled
          the outbreak a pandemic. <br />
          Many countries around the world have now imposed travel restrictions,
          but if you have recently traveled to an affected area or been in close
          contact with someone with the virus, <br />
          you should seek medical advice and try to stay away from public
          places.
        </div>
      </article>
    );
  }
}

export default Introduction;
