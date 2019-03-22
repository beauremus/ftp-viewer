import React, { Component } from 'react';
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
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.clearRect(0, 0, width, height);

    if (Array.isArray(data)) { // This must come first; typeof Array == "object"
      data.forEach(({ x, y }, i) => {
        const length = maxLength;
        const pointsPerPixel = 1; // TODO: This should be a prop

        if (i === 0) {
          this.ctx.moveTo(i * pointsPerPixel, y * 20 - 800);
        } else {
          this.ctx.lineTo(i * pointsPerPixel, y * 20 - 800);
        }
      })
    } else if (typeof data === "object") {
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
    this.ctx.stroke();
    this.ctx.restore();
  }

  render() {
    return (
      <PureCanvas
        contextRef={this.saveContext}
        width={this.props.width}
        height={this.props.height}
      />
    );
  }
}

export default Canvas;