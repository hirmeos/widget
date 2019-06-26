var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getMetrics() {

  var arr = glob_data;
  var ret_dict = {};

  arr.forEach(function (event) {
    ret_dict[event.measure_uri] ? ret_dict[event.measure_uri] += event.value : ret_dict[event.measure_uri] = event.value;
  });

  return ret_dict;
}

var ExternalLink = function (_React$Component) {
  _inherits(ExternalLink, _React$Component);

  function ExternalLink(props) {
    _classCallCheck(this, ExternalLink);

    return _possibleConstructorReturn(this, (ExternalLink.__proto__ || Object.getPrototypeOf(ExternalLink)).call(this, props));
  }

  _createClass(ExternalLink, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "metrics-dashbord-link" },
        React.createElement(
          "a",
          { className: "btn btn-dark metrics-dashbord-link",
            href: this.props.detailedMetricsLink },
          "View detailed metrics dashboard"
        )
      );
    }
  }]);

  return ExternalLink;
}(React.Component);

var WidgetMain = function (_React$Component2) {
  _inherits(WidgetMain, _React$Component2);

  function WidgetMain(props) {
    _classCallCheck(this, WidgetMain);

    var _this2 = _possibleConstructorReturn(this, (WidgetMain.__proto__ || Object.getPrototypeOf(WidgetMain)).call(this, props));

    _this2.state = {
      showMetrics: false
    };
    return _this2;
  }

  _createClass(WidgetMain, [{
    key: "handleClick",
    value: function handleClick() {
      this.setState({ showMetrics: !this.state.showMetrics });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return React.createElement(
        "div",
        { className: "hirmeos-widget" },
        React.createElement(
          "div",
          { className: "metrics-pre-expand" },
          React.createElement(
            "div",
            { className: "metrics-count-container" },
            React.createElement(
              "button",
              { className: "metrics-widget-btn", onClick: function onClick() {
                  return _this3.handleClick();
                } },
              this.props.totalMetrics
            ),
            React.createElement(
              "p",
              { className: "button-measure-text" },
              "Measures"
            )
          ),
          React.createElement(
            "div",
            { className: "metrics-details-container" },
            React.createElement(
              "h3",
              { className: "metrics-title" },
              typeof widgetTitle === 'undefined' ? "Metrics" : widgetTitle
            ),
            React.createElement(
              "button",
              { className: "btn btn-link", onClick: function onClick() {
                  return _this3.handleClick();
                } },
              this.props.totalMetrics,
              " measures are available"
            )
          )
        ),
        this.state.showMetrics ? this.props.innerContent : null,
        this.props.showLink ? React.createElement(ExternalLink, {
          detailedMetricsLink: detailedMetricsLink,
          detailedMetricsText: detailedMetricsText
        }) : null
      );
    }
  }]);

  return WidgetMain;
}(React.Component);

var App = function (_React$Component3) {
  _inherits(App, _React$Component3);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      var metrics = getMetrics();
      var metricsArray = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.entries(metrics)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ref = _step.value;

          var _ref2 = _slicedToArray(_ref, 2);

          var key = _ref2[0];
          var value = _ref2[1];

          if (value !== 0) {
            metricsArray.push([key, value]);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var metricsCount = metricsArray.length;
      var metricsContent = metricsArray.map(function (values, index) {
        return React.createElement(
          "tr",
          { key: index, className: "table-row-body" },
          React.createElement(
            "td",
            null,
            values[0]
          ),
          React.createElement(
            "td",
            { className: "textAlignCenter" },
            values[1]
          )
        );
      });
      var metricsTable = React.createElement(
        "div",
        { className: "post-expand" },
        React.createElement(
          "table",
          { className: "table table-insert" },
          React.createElement(
            "thead",
            null,
            React.createElement(
              "tr",
              { className: "table-row-head" },
              React.createElement(
                "th",
                null,
                "Measure"
              ),
              React.createElement(
                "th",
                { className: "textAlignCenter" },
                "Value"
              )
            )
          ),
          React.createElement(
            "tbody",
            null,
            metricsContent
          )
        )
      );

      return React.createElement(
        "div",
        { className: "hirmeos-widget" },
        React.createElement(
          "div",
          null,
          React.createElement(WidgetMain, {
            innerContent: metricsTable,
            totalMetrics: metricsCount,
            showLink: showDetailedMetricsLink
          })
        )
      );
    }
  }]);

  return App;
}(React.Component);

function setDefault(variable, default_value) {
  // check if variable is defined, otherwise return default value
  return typeof variable === 'undefined' ? default_value : variable;
}

var url = new URL(setDefault(widget_params.baseUrl, "https://metrics.ubiquity.press/events"));

url.searchParams.append('filter', "work_uri:" + widget_params.uri);

var showDetailedMetricsLink = setDefault(widget_params.showDetailedMetricsLink, false);
var detailedMetricsLink = setDefault(widget_params.detailedMetricsLink, '#NotImplemented');
var detailedMetricsText = setDefault(widget_params.detailedMetricsText, 'View detailed metrics dashboard');

var glob_data = [];

var widgetTitle = widget_params.widgetTitle;
var params = {
  method: "GET"
};

fetch(url, params).then(function (data) {
  return data.json();
}).then(function (res) {
  glob_data = res.data;
}).then(function () {
  var domContainer = document.querySelector('#metrics-block');
  ReactDOM.render(React.createElement(App, null), domContainer);
});