import React, { Component } from 'react';
import { scaleLinear, scaleTime } from "d3-scale";
import { max } from "d3-array";
import { timeMinute } from "d3-time";
import Animation from './Animation';
import Axes from './Axes';
import './Ftp.css';

const margin = { top: 20, right: 15, bottom: 60, left: 70 };
const outerWidth = 800;
const outerHeight = 600;
const width = outerWidth - margin.left - margin.right;
const height = outerHeight - margin.top - margin.bottom;

class Ftp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      info: null,
      isLoading: false,
      error: null,
    };

    this.date = new Date()

    this.x = scaleTime()
      .domain([0, width])
      .range([0, width]);
    this.y = scaleLinear()
      .domain([0, 60.2])
      .range([height, 0])
      .nice();
  }

  componentWillReceiveProps() {
    const { data: newData, info: newInfo } = this.props.data;

    // console.log(this.x(new Date(newData.timestamp)) + 390)
    // console.log(this.y(newData.data));

    this.setState(({ data }) => {
      let combinedData = data.slice(); // Copy Array
      combinedData.push({ x: new Date(newData.timestamp + 390), y: newData.data });
      if (combinedData.length > width) {
        combinedData = combinedData.slice(width / 4);
      }
      return {
        data: combinedData,
        info: newInfo
      }
    });
  }

  render() {
    return (
      <div className="scatter-container">
        <Axes
          x={margin.left}
          y={margin.top}
          width={outerWidth} // {this.props.width}
          height={outerHeight} // {this.props.height}
          innerHeight={height}
          innerWidth={width}
          margin={margin}
          data={this.state.data}
        />
        <Animation
          xscale={this.x}
          yscale={this.y}
          width={width} // {this.props.width}
          height={height} // {this.props.height}
          style={{
            marginLeft: `${margin.left}px`,
            marginTop: `${margin.top}px`
          }}
          data={this.state.data}
        />
      </div>
    );
  }
}

export default Ftp;

// const date = new Date()
// date.setMinutes(0)
// date.setSeconds(0)
// date.setMilliseconds(0)

// this.state = {
//   dataA: range(7920).map(i => ({
//     x: time.timeMinute.offset(date, i * 30),
//     y: 10 + Math.round(Math.random() * 20),
//   })),
//   dataB: range(7920).map(i => ({
//     x: time.timeMinute.offset(date, i * 30),
//     y: 30 + Math.round(Math.random() * 20),
//   })),
//   dataC: range(7920).map(i => ({
//     x: time.timeMinute.offset(date, i * 30),
//     y: 50 + Math.round(Math.random() * 20),
//   })),
//   dataD: range(7920).map(i => ({
//     x: time.timeMinute.offset(date, i * 30),
//     y: 70 + Math.round(Math.random() * 20),
//   })),
// }

// next = () => {
//   const packageSize = 7910;
//   const dataA = this.state.dataA.slice(packageSize);
//   const dataB = this.state.dataB.slice(packageSize);
//   const dataC = this.state.dataC.slice(packageSize);
//   const dataD = this.state.dataD.slice(packageSize);

//   Array(packageSize).fill(null).forEach(_ => {
//     dataA.push({
//       x: time.timeMinute.offset(last(dataA).x, 30),
//       y: 10 + Math.round(Math.random() * 20),
//     });
//     dataB.push({
//       x: time.timeMinute.offset(last(dataB).x, 30),
//       y: 30 + Math.round(Math.random() * 20),
//     });
//     dataC.push({
//       x: time.timeMinute.offset(last(dataC).x, 30),
//       y: 50 + Math.round(Math.random() * 20),
//     });
//     dataD.push({
//       x: time.timeMinute.offset(last(dataD).x, 30),
//       y: 70 + Math.round(Math.random() * 20),
//     });
//   });

//   this.setState({ dataA, dataB, dataC, dataD });
// }