import React, { Component } from 'react';
import * as d3 from "d3-shape";
import PureCanvas from './PureCanvas';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.saveContext = this.saveContext.bind(this);
  }

  saveContext(ctx) {
    this.ctx = ctx;
  }

  componentDidUpdate() {
    const { data, maxLength } = this.props;
    const width = this.ctx.canvas.width;
    const height = this.ctx.canvas.height;
    let path = new Path2D();
    this.ctx.save();
    // this.ctx.beginPath();
    this.ctx.clearRect(0, 0, width, height);

    if (Array.isArray(data)) { // This must come first; typeof Array == "object"
      const curve = d3.line()
        // .curve(d3.curveMonotoneX)
        .x(d => this.props.xscale(d.x))
        .y(d => this.props.yscale(d.y));

      path = new Path2D(curve(data));
      // data.forEach(({ x, y }, i) => {
      //   const length = maxLength;
      //   const pointsPerPixel = 1; // TODO: This should be a prop

      //   if (i === 0) {
      //     this.ctx.moveTo(this.props.xscale(x), this.props.yscale(y));
      //   } else {
      //     this.ctx.lineTo(this.props.xscale(x), this.props.yscale(y));
      //   }
      // })
    } else if (typeof data === "object") {
      if (!data) return;
      const values = Object.values(data);
      values.forEach(localData => {
        localData.forEach(({ x, y }, i) => {
          const pointsPerPixel = width / maxLength;

          if (i === 0) {
            this.ctx.moveTo(i * pointsPerPixel, y);
          } else {
            this.ctx.lineTo(i * pointsPerPixel, y);
          }
        })
      });
    }

    this.ctx.strokeStyle = "red";
    this.ctx.stroke(path);
    this.ctx.restore();
  }

  render() {
    const { width, height, ...otherProps } = this.props;
    return (
      <PureCanvas
        contextRef={this.saveContext}
        width={width}
        height={height}
        {...otherProps}
      />
    );
  }
}

export default Canvas;