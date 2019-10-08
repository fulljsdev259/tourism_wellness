import React, { Component } from "react";
import moment from "moment";

class TimePicker extends Component {
  isEarlierThanEndLimit = (timeValue, endLimit, lastValue, step) => {
    let timeValueIsEarlier =
      moment(timeValue, "h:mmA")
        .add(step, "minutes")
        .diff(moment(endLimit, "h:mmA")) < 0;
    let timeValueIsLaterThanLastValue =
      lastValue === undefined
        ? true
        : moment(lastValue, "h:mmA").diff(moment(timeValue, "h:mmA")) < 0;
    return timeValueIsEarlier && timeValueIsLaterThanLastValue;
  };

  render() {
    let timeValue = this.props.beginLimit || "12:00AM";
    let lastValue;
    let endLimit = this.props.endLimit || "11:59PM";
    let step = this.props.step || 15;

    let options = [];
    options.push(
      <option key={timeValue} value={timeValue}>
        {timeValue}
      </option>
    );
    while (this.isEarlierThanEndLimit(timeValue, endLimit, lastValue, step)) {
      lastValue = timeValue;
      timeValue = moment(timeValue, "h:mmA")
        .add(step, "minutes")
        .format("h:mmA");
      options.push(
        <option key={timeValue} value={timeValue}>
          {timeValue}
        </option>
      );
    }
    return (
        <select
          value={this.props.value}
          onChange={this.props.onChange}
          name={this.props.name}
          className="custom-select"
        >
      {options}
        </select>
    );
  }
}

export default TimePicker;
