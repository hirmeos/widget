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

        <div className="metrics-dashbord-link">
          <a className="btn btn-dark metrics-dashbord-link"
             href="#DetailedMetricsDashboard">
            View detailed metrics dashboard
          </a>
        </div>
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
          />
        </div>
      </div>
    );
  }
}

let url = new URL(
  typeof widget_params.baseUrl === 'undefined' ?
    "https://metrics.ubiquity.press/metrics/": widget_params.baseUrl
);

url.searchParams.append('uri', widget_params.uri);

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
