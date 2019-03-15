import React from 'react';
import ReactDOM from 'react-dom';
import './hirmeos-metrics.css';

function getMetrics() {
  return {
    'tweets': 10,
    'hypothesis': 15,
    'downloads': 250,
    'views': 900,
    'wikipedia': 0,
    'googlebooks': 0,
  }
}

class ListItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMetrics: false,
    };
  }

  handleClick() {
    this.setState({ showMetrics: !this.state.showMetrics });
  }

  render() {
    return (
      <div className="inlne-block-100">
        <button className="btn" onClick={() => this.handleClick()}>
          { this.props.totalMetrics }
        </button>
        <div className="width-100">Metrics</div>
        <div className="metrics-dashbord-link">
          <a href="#DetailedMetricsDashboard">
            View detailed metrics
          </a>
        </div>
        { this.state.showMetrics ? this.props.innerContent : null }
      </div>
    );
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
      return (
        <li className="arrowed" key={index}>
          <div className="flex-display">
            <div className="flex-1">
              {values[0]}
            </div>
            <div className="width-50-perc">
              {values[1]}
            </div>
          </div>
        </li>
      );
    });
    const innerMoves = <div className="inner-content">{moves}</div>

    return (
      <div className="hirmeos-widget">
        <div>
          <ListItems
            innerContent={innerMoves}
            totalMetrics={metricsCount}
          />
        </div>
      </div>
    );
  }
}

const domContainer = document.querySelector('#metrics-block');
ReactDOM.render(<App/>, domContainer);
