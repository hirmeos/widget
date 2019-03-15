var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    'googlebooks': 0
  };
}

var ListItems = function (_React$Component) {
  _inherits(ListItems, _React$Component);

  function ListItems(props) {
    _classCallCheck(this, ListItems);

    var _this = _possibleConstructorReturn(this, (ListItems.__proto__ || Object.getPrototypeOf(ListItems)).call(this, props));

    _this.state = {
      showMetrics: false
    };
    return _this;
  }

  _createClass(ListItems, [{
    key: 'handleClick',
    value: function handleClick() {
      this.setState({ showMetrics: !this.state.showMetrics });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        { className: 'inlne-block-100' },
        React.createElement(
          'button',
          { className: 'btn', onClick: function onClick() {
              return _this2.handleClick();
            } },
          this.props.totalMetrics
        ),
        React.createElement(
          'div',
          { className: 'width-100' },
          'Metrics'
        ),
        React.createElement(
          'div',
          { className: 'metrics-dashbord-link' },
          React.createElement(
            'a',
            { href: '#DetailedMetricsDashboard' },
            'View detailed metrics'
          )
        ),
        this.state.showMetrics ? this.props.innerContent : null
      );
    }
  }]);

  return ListItems;
}(React.Component);

var App = function (_React$Component2) {
  _inherits(App, _React$Component2);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      var metrics = getMetrics(); // Will be replaced by AJAX call once the Metrics-API is ready
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
      var moves = metricsArray.map(function (values, index) {
        return React.createElement(
          'li',
          { className: 'arrowed', key: index },
          React.createElement(
            'div',
            { className: 'flex-display' },
            React.createElement(
              'div',
              { className: 'flex-1' },
              values[0]
            ),
            React.createElement(
              'div',
              { className: 'width-50-perc' },
              values[1]
            )
          )
        );
      });
      var innerMoves = React.createElement(
        'div',
        { className: 'inner-content' },
        moves
      );

      return React.createElement(
        'div',
        { className: 'hirmeos-widget' },
        React.createElement(
          'div',
          null,
          React.createElement(ListItems, {
            innerContent: innerMoves,
            totalMetrics: metricsCount
          })
        )
      );
    }
  }]);

  return App;
}(React.Component);

var domContainer = document.querySelector('#metrics-block');
ReactDOM.render(React.createElement(App, null), domContainer);