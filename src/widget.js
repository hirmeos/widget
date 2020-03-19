'use strict';
import defaultConfig from './config.json';
import locales from './locales.json';
import './style.scss';

const e = React.createElement;

class Widget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isOpen: true,
      config: {},
      measures: {},
      events: {}
    };
  }

  // Returns a Promise for an API request to the /measures endpoint
  fetchMeasures(config) {
    return new Promise((resolve, reject) => {
      const measures = {};
      fetch(`${config.baseUrl}/measures`)
        .then(res => res.json())
        .then(
          ({ data }) => {
            // Store the response data as a dictionary, with the key being
            // the measure_uri and the value being an object containing the
            // source and type variables that already exist in the response
            data.forEach(({ measure_uri, source, type }) => {
              measures[measure_uri] = { source, type };
            });

            // Return the dictionary of measures
            resolve(measures);
          },
          error => {
            console.error(error);
            reject('There was an error fetching measures', error);
          }
        );
    });
  }

  // Returns a Promise for an API request to the /events endpoint
  fetchEvents(config) {
    return new Promise((resolve, reject) => {
      fetch(
        `${config.baseUrl}/events?filter=work_uri%3A${encodeURIComponent(
          config.uri
        )}`
      ) //todo: encode this!
        .then(res => res.json())
        .then(
          ({ data }) => {
            const events = {};

            // Store the response data as a dictionary, with the key being
            // the measure_uri and the value being the value property from
            // the response. If it already exists, we simply increment the value.
            // The event_id is used as a unique key identifier in React.
            data.forEach(({ measure_uri, event_id, value }) => {
              events[measure_uri]
                ? (events[measure_uri].value += value)
                : (events[measure_uri] = { event_id, value });
            });

            // Return the dictionary of events
            resolve(events);
          },
          error => {
            console.error(error);
            reject('There was an error fetching events', error);
          }
        );
    });
  }

  // Gets the locale string based on the detail argument received
  getLocaleString(detail) {
    const locale = this.state.config.locale;

    try {
      return locales[detail][locale];
    } catch (error) {
      console.warn(`Locale '${detail}' not found for '${locale}'`);
      return '';
    }
  }

  // Returns the config by merging the defaults with any specified
  // by the user in the 'widget_params' object
  fetchConfig() {
    return new Promise(resolve => {
      let config = { ...defaultConfig };
      if (typeof widget_params !== 'undefined') {
        config = { ...config, ...widget_params };
        config.styling = { ...defaultConfig.styling, ...widget_params.styling };
      }
      resolve(config);
    });
  }

  // Convert the first letter of each word to upper case.
  // Does not convert acronyms to title case.
  toTitleCase(text) {
    return text
      .split(' ')
      .map(x => x[0].toUpperCase() + x.slice(1))
      .join(' ');
  }

  // Called when the script is ready to go
  componentDidMount() {
    this.fetchConfig().then(config => {
      this.fetchMeasures(config).then(measures => {
        this.fetchEvents(config).then(events => {
          this.setState({ isLoading: false, config, measures, events });
        });
      });
    });
  }

  render() {
    const { isLoading, measures, events } = this.state;

    // If you want to display something whilst the data is being
    // fetched from the API, replace 'null' below with a JSX component
    return isLoading ? null : (
      <section className='hirmeos-widget'>
        <header className='metrics-header'>
          <div className='metrics-title'>
            <h3 className='metrics-title-text'>
              {this.state.config.widgetTitle ||
                this.getLocaleString('widgetTitle')}
            </h3>
            <button
              className='metrics-view-toggle'
              onClick={() => this.setState({ isOpen: !this.state.isOpen })}
            >
              {this.state.isOpen
                ? this.getLocaleString('hideDetails')
                : this.getLocaleString('viewDetails')}
            </button>
          </div>
          <div className='metrics-count'>
            <div className='metrics-count-val'>
              <span className='metrics-count-val-text'>
                {Object.keys(events).length}
              </span>
            </div>
            <span className='metrics-count-details'>
              {this.getLocaleString('detailsLink')}
            </span>
          </div>
        </header>
        {this.state.isOpen && (
          <table className='metrics-table'>
            <thead className='metrics-table-head'>
              <tr>
                <th>{this.getLocaleString('tableHeaderType')}</th>
                <th>{this.getLocaleString('tableHeaderSource')}</th>
                <th className='metrics-table-center'>
                  {this.getLocaleString('tableHeaderNumber')}
                </th>
              </tr>
            </thead>
            <tbody className='metrics-table-body'>
              {Object.keys(events).map(event => {
                const measure = measures[event];

                return (
                  <tr key={events[event].event_id}>
                    <td>
                      {this.toTitleCase(measure.type)}
                      <div className='metrics-table-info'>
                        <a
                          href={event}
                          target='_blank'
                          rel='noopener noreferrer'
                          title={this.getLocaleString(
                            'hoverLinkMeasureDefinition'
                          )}
                        >
                          ?
                        </a>
                      </div>
                    </td>
                    <td>{measure.source}</td>
                    <td className='metrics-table-center'>
                      {events[event].value}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {this.state.config.showDetailedMetricsLink && (
          <div className='metrics-detailed-button'>
            <a href={this.state.config.detailedMetricsLink}>
              {this.state.config.detailedMetricsText}
            </a>
          </div>
        )}

        {/* Apply custom styling */}
        <style jsx='true'>{`
          .hirmeos-widget {
            border-width: ${this.state.config.styling.widgetBorder
              ? this.state.config.styling.widgetBorderWidth
              : '0'} !important;
            border-color: ${this.state.config.styling
              .widgetBorderColor} !important;
          }
          .metrics-header {
            background: ${this.state.config.styling
              .headerBackgroundColor} !important;
            color: ${this.state.config.styling.headerTextColor} !important;
          }
          .metrics-view-toggle {
            background: ${this.state.config.styling
              .headerButtonBackgroundColor} !important;
            color: ${this.state.config.styling
              .headerButtonTextColor} !important;
          }
          .metrics-table {
            background: ${this.state.config.styling
              .tableBackgroundColor} !important;
            color: ${this.state.config.styling.tableTextColor} !important;
          }
          .metrics-detailed-button {
            background: ${this.state.config.styling
              .detailButtonBackgroundColor} !important;
            color: ${this.state.config.styling
              .detailButtonTextColor} !important;
          }
          .metrics-count-val {
            border-color: ${this.state.config.styling
              .metricsCountBorderColor} !important;
          }
          .metrics-table-info {
            background: ${this.state.config.styling
              .infomarkBackgroundColor} !important;
            color: ${this.state.config.styling.infomarkTextColor} !important;
          }
        `}</style>
      </section>
    );
  }
}

const domContainer = document.querySelector('#metrics-block');
ReactDOM.render(e(Widget), domContainer);
