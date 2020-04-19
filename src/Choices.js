import React, { Component } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Typography } from "@material-ui/core";
import "./css/Choices.css";

class Choices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected,
      values: props.values,
      label: props.label,
    };
  }

  handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    this.setState({ value: event.target.value });
  };

  componentWillReceiveProps(props) {
    this.setState({
      selected: props.selected,
      values: props.values,
      label: props.label,
    });
  }

  render() {
    return (
      <div className="choices">
        <Typography variant="body2" color="textPrimary" gutterButton>
          {this.state.label}
        </Typography>
        <Select
          labelId="choices-select-label"
          id="choices-select"
          value={this.state.selected}
          onChange={this.handleChange}
        >
          {this.state.values.map((l, i) => (
            <MenuItem key={i} value={l.value}>
              {" "}
              {l.name}{" "}
            </MenuItem>
          ))}
        </Select>
      </div>
    );
  }
}

export { Choices };