import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import config from "./config.js";
import Grid from "@material-ui/core/Grid";
import "./css/Hospitals.css";

class Hospitals extends Component {
  constructor() {
    super();
    this.state = {
      center: {
        lat: 23.7366384,
        lng: 76.6298291,
      },
      hospitals: [
        { lat: 25.73666, lng: 76.12356 },
        { lat: 28.73666, lng: 76.12356 },
        { lat: 25.73666, lng: 79.12356 },
      ],
    };
  }

  displayHospitals() {
    return this.state.hospitals.map((hosp, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: hosp.lat,
            lng: hosp.lng,
          }}
          onClick={() => console.log("You clicked me!")}
        />
      );
    });
  }

  render() {
    return (
      <div className="hospitals">
        <Grid container spacing={1}>
          <Map
            google={this.props.google}
            zoom={6}
            initialCenter={this.state.center}
          >
            {this.displayHospitals()}
          </Map>
        </Grid>
      </div>
    );
  }
}

export default GoogleApiWrapper({ apiKey: config.googleApiKey })(Hospitals);
