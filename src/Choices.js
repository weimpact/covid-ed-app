import React, { Component } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import { Typography } from "@material-ui/core";
import "./css/Choices.css";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";

class Choices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected,
      values: props.values,
      label: props.label,
      callback: props.callback,
    };
  }

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
        <Typography variant="body2" color="textPrimary">
          {this.state.label}
        </Typography>
        <Select
          labelId="choices-select-label"
          id="choices-select"
          value={this.state.selected}
          onChange={this.state.callback}
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

class MultipleChoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onChange: props.onChange,
      onClose: props.onClose,
      values: props.values,
      placeholder: props.placeholder,
      selected: props.selected,
      id: props.id,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (state.values.length !== props.values.length) {
      return { values: props.values };
    }
    if (state.selected.length !== props.selected.length) {
      return { selected: props.selected };
    }
    return null;
  }

  render() {
    return (
      <div className="multiple_choices">
        <Typography variant="body2" color="textPrimary">
          {this.state.label}
        </Typography>
        <Select
          id={this.state.id}
          multiple
          labelId="multiple-choices-select-label"
          value={this.state.selected}
          onChange={this.state.onChange}
          onClose={this.state.onClose}
          input={<Input />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>{this.state.placeholder}</em>;
            }
            if (selected.length < 3) {
              return selected.join(",");
            }
            return [selected.slice(0, 3), "..."].join(",");
          }}
        >
          <MenuItem disabled value="">
            <em>{this.state.placeholder}</em>
          </MenuItem>
          {this.state.values.map((l, i) => (
            <MenuItem key={l.name} value={l.value}>
              <Checkbox checked={this.state.selected.indexOf(l.value) > -1} />
              <ListItemText primary={l.name} />
            </MenuItem>
          ))}
        </Select>
      </div>
    );
  }
}

export { MultipleChoice, Choices };
