import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { select } from 'd3-selection';

const Axes = props => {
  const xAxisRef = React.createRef();
  const yAxisRef = React.createRef();

  // Init Scales
  const x = scaleLinear()
    .domain([0, max(props.data, (d) => d[0])])
    .range([0, props.width])
    .nice();
  const y = scaleLinear()
    .domain([0, 80])
    .range([props.height, 0])
    .nice();

  // Init Axis
  const xAxis = axisBottom(x);
  const yAxis = axisLeft(y);

  xAxis(select(xAxisRef.current));
  yAxis(select(yAxisRef.current));

  return (
    <svg className="svg-plot" width={props.width} height={props.height} >
      <g transform={`translate(${props.margin.left}, ${props.margin.top})`}></g>
      <g ref={xAxisRef} transform={`translate(0, ${props.height})`}></g>
      <g ref={yAxisRef}></g>
      <text
        x={-props.height / 2}
        dy={"-3.5em"}
        transform={"rotate(-90)"}
      >
        Axis Y
      </text>
      <text x={props.width / 2} y={props.height + 40}>Axis X</text>
    </svg>
  );
}

export default Axes;