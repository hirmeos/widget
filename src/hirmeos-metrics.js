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
        <button className="metrics-widget-btn" onClick={() => this.handleClick()}>
          { this.props.totalMetrics }
        </button>
        <div className="width-80">
          { typeof widgetTitle === 'undefined' ? "Metrics": widgetTitle}
        </div>
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
      <table className="table table-bordered width-100">
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
    );

    return (
      <div className="hirmeos-widget">
        <div>
          <ListItems
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
