function getMetrics() {
  return {
    'tweets': 10,
    'hypothesis': 15,
    'downloads': 250,
    'views': 900,
    'wikipedia': 0,
    'googlebooks': 0
  };
}

class ListItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMetrics: false
    };
  }

  handleClick() {
    this.setState({
      showMetrics: !this.state.showMetrics
    });
  }

  render() {
    return React.createElement("div", {
      className: "inlne-block-100"
    }, React.createElement("button", {
      className: "btn",
      onClick: () => this.handleClick()
    }, this.props.totalMetrics), React.createElement("div", {
      className: "width-100"
    }, "Metrics"), React.createElement("div", {
      className: "metrics-dashbord-link"
    }, React.createElement("a", {
      href: "#DetailedMetricsDashboard"
    }, "View detailed metrics")), this.state.showMetrics ? this.props.innerContent : null);
  }

}

class App extends React.Component {
  render() {
    const metrics = getMetrics(); // Will be replaced by AJAX call once the Metrics-API is ready

    const metricsArray = [];

    for (const [key, value] of Object.entries(metrics)) {
      if (value !== 0) {
        metricsArray.push([key, value]);
      }
    }

    const metricsCount = metricsArray.length;
    const moves = metricsArray.map((values, index) => {
      return React.createElement("li", {
        className: "arrowed",
        key: index
      }, React.createElement("div", {
        className: "flex-display"
      }, React.createElement("div", {
        className: "flex-1"
      }, values[0]), React.createElement("div", {
        className: "width-50-perc"
      }, values[1])));
    });
    const innerMoves = React.createElement("div", {
      className: "inner-content"
    }, moves);
    return React.createElement("div", {
      className: "hirmeos-widget"
    }, React.createElement("div", null, React.createElement(ListItems, {
      innerContent: innerMoves,
      totalMetrics: metricsCount
    })));
  }

} // const domContainer = document.querySelector('#metrics-block');


const domContainer = document.querySelector('#metrics-block');
ReactDOM.render(React.createElement(App, null), domContainer);
