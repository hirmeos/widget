function getMetrics() {

  let arr = glob_data;
  let ret_dict = {};

  arr.forEach(function(event){
    (ret_dict[event.measure]) ?
      ret_dict[event.measure] += event.value :
      ret_dict[event.measure] = event.value;
  });

  return ret_dict
}

class ExternalLink extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="metrics-dashbord-link">
        <a className="btn btn-dark metrics-dashbord-link"
            href={this.props.detailedMetricsLink}>
          View detailed metrics dashboard
        </a>
      </div>
    );
  }
}


class WidgetMain extends React.Component {
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
      <div className="hirmeos-widget">
        <div className="metrics-pre-expand">
          <div className="metrics-count-container">
            <button className="metrics-widget-btn" onClick={() => this.handleClick()}>
              { this.props.totalMetrics }
            </button>
            <p className="button-measure-text">
              Measures
            </p>
          </div>
          <div className="metrics-details-container">
            <h3 className="metrics-title">
              { typeof widgetTitle === 'undefined' ? "Metrics": widgetTitle}
            </h3>
            <button className="btn btn-link" onClick={() => this.handleClick()}>
              { this.props.totalMetrics } measures are available
            </button>
          </div>
        </div>

        { this.state.showMetrics ? this.props.innerContent : null }

        { this.props.showLink ?
            <ExternalLink
              detailedMetricsLink={detailedMetricsLink}
              detailedMetricsText={detailedMetricsText}
            /> :
          null
        }

      </div>
    );
  }
}

class App extends React.Component {

  render() {
    const metrics = getMetrics();
    const metricsArray = [];
    for (const [key, value] of Object.entries(metrics)) {
      if (value !== 0) {
        metricsArray.push([key, value]);
      }
    }
    const metricsCount = metricsArray.length;
    const metricsContent = metricsArray.map((values, index) => {
      return (
        <tr key={index} className="table-row-body">
          <td>{values[0]}</td>
          <td className="textAlignCenter">{values[1]}</td>
        </tr>
      );
    });
    const metricsTable = (
      <div className="post-expand">
        <table className="table table-insert">
          <thead>
          <tr className="table-row-head">
            <th>Measure</th>
            <th className="textAlignCenter">Value</th>
          </tr>
          </thead>
          <tbody>
            {metricsContent}
          </tbody>
        </table>
      </div>
    );

    return (
      <div className="hirmeos-widget">
        <div>
          <WidgetMain
            innerContent={metricsTable}
            totalMetrics={metricsCount}
            showLink={showDetailedMetricsLink}
          />
        </div>
      </div>
    );
  }
}


function setDefault(variable, default_value) {
  // check if variable is defined, otherwise return default value
  return typeof variable === 'undefined' ?
    default_value: variable
}

let url = new URL(
  setDefault(
    widget_params.baseUrl,
    "https://metrics.ubiquity.press/metrics/"
  )
);
url.searchParams.append('uri', widget_params.uri);

let showDetailedMetricsLink = setDefault(
  widget_params.showDetailedMetricsLink,
  false
);
let detailedMetricsLink = setDefault(
  widget_params.detailedMetricsLink,
  '#NotImplemented'
);
let detailedMetricsText = setDefault(
  widget_params.detailedMetricsText,
  'View detailed metrics dashboard'
);

let glob_data = [];

let widgetTitle = widget_params.widgetTitle;
let params = {
  headers: {
    "Authorization": "Bearer " + widget_params.token,
  },
  method: "GET",
};

fetch(url, params)
.then(data => {
  return data.json()
})
.then(res => {
  glob_data = res.data
})
.then(function () {
  const domContainer = document.querySelector('#metrics-block');
  ReactDOM.render(React.createElement(App, null), domContainer);
});
