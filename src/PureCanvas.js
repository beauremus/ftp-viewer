import React, { Component } from 'react';

class PureCanvas extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { width, height, contextRef, style } = this.props;
    return (
      <canvas
        width={width}
        height={height}
        ref={node =>
          node ? contextRef(node.getContext('2d')) : null
        }
        style={style}
      />
    );
  }
}

export default PureCanvas;
