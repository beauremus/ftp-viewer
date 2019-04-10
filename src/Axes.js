import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { max, range } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { select } from 'd3-selection';

class Axes extends Component {
  state = {
    widthScale: scaleLinear()
      .domain([0, max(this.props.data, (d) => d[0])])
      .range([0, this.props.width]),
    heightScale: scaleLinear()
      .domain([0, 80])
      .range([this.props.height, 0])
  }

  // Strategy: https://swizec.com/blog/declarative-d3-charts-react-16-3/swizec/8353
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.data) return;
    const { widthScale, heightScale } = prevState;

    widthScale.domain(range(0, nextProps.data.length));
    heightScale.domain([0, max(nextProps.data)]);

    return { ...prevState, widthScale, heightScale };
  }

  render() {
    const { x, y, data, height, width, innerHeight, innerWidth, device } = this.props;
    const { widthScale, heightScale } = this.state;

    return (
      <svg width={width} height={height} >
        <g transform={`translate(${x}, ${y})`}>
          <g className={"xAxis"} transform={`translate(0, ${innerHeight})`}>
            <line x1={0} x2={innerWidth} y1={0} y2={0} stroke={"black"}></line>
            {/* <text x={width / 2 - x} y={height} dy={"-2rem"}>Time</text> */}
          </g>
          <g className={"yAxis"}>
            <line x1={0} x2={0} y1={0} y2={innerHeight} stroke={"black"}></line>
          </g>
          <text x={innerWidth / 2} y={height} dy={"-2rem"} textAnchor={"middle"}>Time</text>
          <text transform={`rotate(-90)`} x={-height / 2} y={-x} dy={"1rem"}>{device}</text>
        </g>
      </svg>
    );
  }
}

export default Axes;

  // Init Axis
  // const xAxis = axisBottom(x);
  // const yAxis = axisLeft(y);

  // useEffect(() => {
  //   const svgChart = select(ref.current);
  //   // Add Axis
  //   const gxAxis = svgChart.append('g')
  //     .attr('transform', `translate(0, ${this.height})`)
  //     .call(xAxis);

  //   const gyAxis = svgChart.append('g')
  //     .call(yAxis);

  //   // Add labels
  //   svgChart.append('text')
  //     .attr('x', `-${this.height / 2}`)
  //     .attr('dy', '-3.5em')
  //     .attr('transform', 'rotate(-90)')
  //     .text('Axis Y');
  //   svgChart.append('text')
  //     .attr('x', `${this.width / 2}`)
  //     .attr('y', `${this.height + 40}`)
  //     .text('Axis X');
  // },
  //   [this.data]
  // );

// xAxis(select(xAxisRef.current));
// yAxis(select(yAxisRef.current));
