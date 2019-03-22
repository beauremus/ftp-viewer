import { Component } from 'react';

class Dpm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      info: null,
      isLoading: false,
      error: null,
    };

    this.dpm = new window.DPM();

    this.addRequest = drfString => {
      this.dpm.addRequest(drfString, (data, info) => {
        this.setState({
          data,
          [drfString]: { data, info },
          isLoading: false
        });
      }, error => {
        this.setState({
          error,
          isLoading: false
        });
      });
    }

    if (Array.isArray(this.props.drf)) {
      this.props.drf.forEach(this.addRequest);
    } else if (typeof this.props.drf === "string") {
      this.addRequest(this.props.drf);
    } else {
      this.setState({
        error: "No valid DRF property",
        isLoading: false
      });

      console.error("No valid DRF property");
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.dpm.start();
  }

  render() {
    return this.props.children(this.state);
  }
}

export default Dpm;