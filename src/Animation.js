import React, { Component } from 'react';
import Canvas from './Canvas';

class Animation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    }

    this.updateAnimationState = this.updateAnimationState.bind(this);
  }

  componentDidMount() {
    this.rafId = requestAnimationFrame(this.updateAnimationState);
  }

  updateAnimationState() {
    this.setState({ data: this.props.data });
    this.rafId = requestAnimationFrame(this.updateAnimationState);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
  }

  render() {
    const { data, ...otherProps } = this.props;
    return (
      <Canvas data={this.state.data} {...otherProps} />
    );
  }
}

export default Animation;
