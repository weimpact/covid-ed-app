import React, { Component } from "react";

import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class Introduction extends Component {
  render() {
    return (
      <Card className="deaths_description" variant="outlined">
        <CardContent>
          <Typography variant="body2" gutterBottom>
            The risk of infection is serious if you are in an area where there
            are confirmed cases, and the World Health Organization (WHO) has
            labeled the outbreak a pandemic. <br />
            Many countries around the world have now imposed travel
            restrictions, but if you have recently traveled to an affected area
            or been in close contact with someone with the virus, <br />
            you should seek medical advice and try to stay away from public
            places.
          </Typography>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </CardContent>
      </Card>
    );
  }
}

export default Introduction;
