import React, { Component } from 'react';
import Animation from './Animation';

class Ftp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      info: null,
      isLoading: false,
      error: null,
    };
  }

  componentWillReceiveProps() {
    const { data: newData, info: newInfo } = this.props.data;

    this.setState(({ data }) => {
      let combinedData = data.slice(); // Copy Array
      combinedData.push({ x: newData.timestamp, y: newData.data });
      if (combinedData.length > 800) {
        combinedData = combinedData.slice(800 / 4);
      }
      return {
        data: combinedData,
        info: newInfo
      }
    });
  }

  render() {
    return <Animation
      width={this.props.width}
      height={this.props.height}
      data={this.state.data}
    />;
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