const supportedLocales = ["en", "fr", "de", "it", "es", "pt", "el"];

const widgetLocale = {
  "widgetTitle":{
    "en": "Metrics",
    "fr": "Statistiques",
    "de": "Statistiken",
    "it": "Statistiche",
    "es": "Estadística",
    "pt": "Estatístico",
    "el": "Στατιστικά"
  },
  "detailsLink": {
    "en": "measures available",
    "fr": "indicateurs disponibles",
    "de": "Metriken vorhanden",
    "it": "misure disponibili",
    "es": "medidas disponibles",
    "pt": "indicadores disponíveis",
    "el": "Τύποι στατιστικών διαθέσιμοι"
  },
  "dataType": {
    "en": "Measures",
    "fr": "Indicateurs",
    "de": "Metriken",
    "it": "Misure",
    "es": "Medidas",
    "pt": "Indicadores",
    "el": "Τύποι στατιστικών"
  },
  "tableHeaderNumber": {
    "en": "Value",
    "fr": "Nombre",
    "de": "Wert",
    "it": "Quantità",
    "es": "Valor",
    "pt": "Número",
    "el": "Τιμή"
  },
  "tableHeaderType": {
    "en": "Type",
    "fr": "Type",
    "de": "Typ",
    "it": "Tipo",
    "es": "Tipo",
    "pt": "Tipo",
    "el": "Τύπος"
  },
  "tableHeaderSource": {
    "en": "Source",
    "fr": "Source",
    "de": "Quelle",
    "it": "Provenienza",
    "es": "Fuente",
    "pt": "Fonte",
    "el": "Πηγή"
  },
  "viewDetails": {
    "en": "Show details",
    "fr": "Voir détails",
    "de": "Details anzeigen",
    "it": "Vedi",
    "es": "Ver detalles",
    "pt": "Ver detalhes",
    "el": "Προβολή λεπτομερειών"
  },
  "hideDetails": {
    "en": "Hide details",
    "fr": "Masquer détails",
    "de": "Details ausblenden",
    "it": "Nascondi",
    "es": "Ocultar detalles",
    "pt": "Ocultar detalhes",
    "el": "Απόκρυψη λεπτομερειών"
  },
  "hoverLinkMeasureDefinition": {
    "en": "Click to see definition",
    "fr": "Cliquez pour voir la définition",
    "de": "Klicken Sie hier, um die Definition zu sehen",
    "it": "Clicca per vedere la definizione",
    "es": "Haga clic para ver la definición",
    "pt": "Clique para ver a definição",
    "el": "Κάντε κλικ για να δείτε τον ορισμό"
  }
};


function setDefault(variable, default_value) {
  // check if variable is defined, otherwise return default value
  return typeof variable === "undefined" ?
    default_value: variable
}


function setLocale(languageCode) {
  // will use the first part of the language code to assign locale
  let localeCode = setDefault(
    languageCode.split("_")[0],
    "en"
  );
  if (!supportedLocales.includes(localeCode)) {
    console.log(`Cannot recognise language code ${localeCode}`);
    localeCode = "en";
  }

  return localeCode
}


function getLocale(detail) {
  // ensure global "localeLanguage" variable is set before running this
  let value = widgetLocale[detail][localeLanguage];
  if (typeof value === "undefined" || value.length === 0) {
    console.log(`No locale value for ${detail} ${localeLanguage}`);
  }
  return value
}


function setMeasuresDict(dataArr) {

  let measureDict = {};

  dataArr.forEach(function(measure){
    measureDict[measure.measure_uri] = {
      "source": measure.source,
      "type": measure.type,
    };
  });

  return measureDict
}


function getMeasureInfo() {
  return fetch(measureUrl)
    .then(data => {
      return data.json()
    })
    .then(res => {
      return res.data;
    })
    .then(function (measure_mappings) {
        measure_data = setMeasuresDict(measure_mappings);
    })
}


function fetchMetricsData(url, params) {
  return fetch(url, params)
    .then(data => {
      return data.json()
    })
    .then(res => {
      glob_data = res.data
    })
}

function fetchAPIData(url, params) {
  return Promise.all([getMeasureInfo(), fetchMetricsData(url, params)])
}

function getMetrics() {

  let arr = glob_data;
  let ret_dict = {};

  arr.forEach(function(event){
    (ret_dict[event.measure_uri]) ?
      ret_dict[event.measure_uri] += event.value :
      ret_dict[event.measure_uri] = event.value;
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
              { getLocale("detailsLink") }
            </p>
          </div>
          <div className="metrics-details-container">
            <h3 className="metrics-title">
              { typeof widgetTitle === "undefined" ? getLocale("widgetTitle"): widgetTitle}
            </h3>
            <button className="btn btn-link" onClick={() => this.handleClick()}>
              { this.state.showMetrics ? getLocale("hideDetails") : getLocale("viewDetails") }
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


class WidgetTableRow extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    window.open(this.props.values[0], "_blank");
  }

  render() {
    return (
        <tr className="table-row-body" onClick={() => this.handleClick()} title={ getLocale("hoverLinkMeasureDefinition") }>
          <td>{measure_data[this.props.values[0]].source}</td>
          <td>{measure_data[this.props.values[0]].type}</td>
          <td className="textAlignCenter">{this.props.values[1]}</td>
        </tr>
    )
  }
}


class App extends React.Component {

  render() {
    const metrics = getMetrics();

    if (Object.entries(metrics).length === 0 && metrics.constructor === Object) {
      console.log("No metrics available for this entry.");
      return <span hidden={true}></span>
    }

    const metricsArray = [];
    for (const [key, value] of Object.entries(metrics)) {
      if (value !== 0) {
        metricsArray.push([key, value]);
      }
    }
    const metricsCount = metricsArray.length;
    const metricsContent = metricsArray.map((values, index) => {
      return (
        <WidgetTableRow
          key={index}
          values={values}
        />
      );
    });
    const metricsTable = (
      <div className="post-expand">
        <table className="table table-insert">
          <thead>
          <tr className="table-row-head">
            <th>
              { getLocale("tableHeaderSource") }
            </th>
            <th>
              { getLocale("tableHeaderType") }
            </th>
            <th className="textAlignCenter">
              { getLocale("tableHeaderNumber") }
            </th>
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


let base_url = new URL(
  setDefault(
    widget_params.baseUrl,
    "https://metrics.ubiquity.press"
  )
);

let url = new URL(base_url + "events");
let measureUrl = new URL(base_url + "measures");
let measure_data;

url.searchParams.append("filter", "work_uri:" + widget_params.uri);

let showDetailedMetricsLink = setDefault(
  widget_params.showDetailedMetricsLink,
  false
);
let detailedMetricsLink = setDefault(
  widget_params.detailedMetricsLink,
  "#NotImplemented"
);
let detailedMetricsText = setDefault(
  widget_params.detailedMetricsText,
  "View detailed metrics dashboard"
);

// Set language code for translations
let localeSetting = setDefault(
  widget_params.locale,
  "en"
);
let localeLanguage = setLocale(localeSetting);


let glob_data = [];

let widgetTitle = widget_params.widgetTitle;
let params = {
  method: "GET",
};

fetchAPIData(url, params)
  .then(function () {
    const domContainer = document.querySelector("#metrics-block");
    ReactDOM.render(React.createElement(App, null), domContainer);
  });
