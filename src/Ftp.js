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
      maxPoints: width / 2,
      x: null,
      y: null
    };
  }

  getXScale(domain, advance) {
    const plotLength = 5000000;
    // let initialTime = (new Date()).valueOf() * 1000; // Need microseconds
    let initialTime = null;
    let x1 = null;
    let x2 = null;

    if (typeof domain === "number") {
      x1 = domain;
      x2 = domain + plotLength;
    } else {
      [x1, x2] = domain || [null, null];
    }

    if (advance) {
      // initialTime = x1 + ((x2 - x1) / (1 / advance));
      initialTime = advance;
    } else {
      initialTime = x1;
    }

    return scaleLinear()
      .domain([initialTime, initialTime + plotLength])
      .range([0, width]);
  }

  getYScale() {
    return scaleLinear()
      .domain([-2, 2])
      .range([height, 0])
      .nice();
  }

  componentWillReceiveProps() {
    const { data: newData, info: newInfo } = this.props.data;
    const dataSize = newData.data.length / 2;
    let domainMin = null;
    let domainMax = null;

    this.setState(({ data }) => {
      const result = { info: newInfo };
      let combinedData = data.slice(); // Copy Array

      for (let ii = 0; ii < dataSize; ii++) {
        combinedData.push({
          x: newData.data[ii + dataSize],
          y: newData.data[ii],
        });
      }
      // newData.data.forEach((datum, i) => {
      //   combinedData.push({
      //     // multiply by the frequency
      //     x: microseconds + (i * 694),
      //     y: datum
      //   });
      // });
      result.data = combinedData;


      if (this.state.x === null || this.state.y === null) {
        result.x = this.getXScale(result.data[0].x);
        result.y = this.getYScale();
        [domainMin, domainMax] = this.getXScale(result.data[0].x).domain();
      } else {
        [domainMin, domainMax] = this.state.x.domain();
      }

      if (result.data[result.data.length - 1].x > domainMax) {
        result.data = result.data.slice(result.data.length / 4);
        // console.log(`newFirstPoint: ${result.data[0].x} newX1: ${domainMin + (domainMax - domainMin) / 4}`);
        // console.log(`Diff: ${result.data[0].x - (domainMin + (domainMax - domainMin) / 4)}`);
        // result.x = this.getXScale([domainMin, domainMax], 1 / 4);
        result.x = this.getXScale([domainMin, domainMax], result.data[0].x);
        result.y = this.getYScale();
      }

      return result;
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
          device={this.state.info ? this.state.info.name : ""}
          data={this.state.data}
        />
        <Animation
          xscale={this.state.x}
          yscale={this.state.y}
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
