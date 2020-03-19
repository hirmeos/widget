# HIRMEOS Metrics Widget

## Setup

Most of the widget has already been configured to allow changes to be made easily. After cloning the repository, run:

```
npm install
```

To run the application locally after all dependencies are installed, run:

```
npm run start
```

This will run the application on [localhost:8080](http://localhost:8080).

## Development

For development purposes, the key parts of the widget have been split into separate files:

1. _src/widget.js_ - This contains the JavaScript for a React-based
   app, which manages the logic for the widget.

2. _src/locales.json_ - This contains the localisation for the widget.

3. _src/config.json_ - This contains the default configuration variables for the widget. See the [Configuration](#configuration) section for information on how this works.

4. _src/style.scss_ - This contains styling for the widget.

5. _dist/index.html_ - This demonstrates how the widget would be integrated into a page, and is used when the application is running locally.

As Babel is part of the build step, JSX code inside _src/widget.js_ widget is allowed.

Upon building the project, all files, except for _(5)_, will be compiled into a single, minified JavaScript file in _dist/widget.js_ - ready for production.

## Bumpverion

A bumpverion config file has been added to this project, starting from release 0.1.2. This is simply to keep track of the code that has been uploaded to our CDN (Refer to **Production-ready implementation**).

With each new official release of the Widget, we produce a min.js file and .css file with a version embedded into the file name. The bumpversion tag created will correspond to this version.

# Production

To create a production-ready, minified version of the widget, simply run the command:

```
npm run build
```

A preset Webpack and Babel configuration will convert any JSX to JavaScript, combine all _src/._ files, and minify the result, before then outputting a single JavaScript file at _dist/widget.js_.

### The _dist/index.html_ file

This file shows how the production-ready JavaScript widget would be integrated into a page. On a live website, this file would likely be minimised as well. This file is also used when running the application locally in development.

After building the widget, it is useful to view this file in your browser to make sure the production steps mentioned above were successful.

```
$ firefox dist/index.html
```

Because the widget has been converted from JSX to JavaScript, we do not need to specify _type="text/jsx"_ when loading this script.

## Configuration

All of the default configuration options within the widget are defined in _src/config.json_.

When the application runs, it will first check to see whether a `widget_params` object exists (it will exist if it is declared in a `<script>` tag prior to the inclusion of the widget on the page).

If the variable exists, its properties will be merged with the default configuration object and will take priority. This variable does not need to exist for the widget to function.

It is not recommended to modify the values of _src/config.json_ directly, as this can impact any user who is using the widget's default values. To customise settings for a single user, declare a `widget_params` variable inside the HTML file calling the widget instead.

### Variables

The widget can be customised by setting values in the `widget_params` variable. Currently, these include:

- `uri`: Required - The URI of the book / chapter you want to display metrics for.

- `locale`: Language code for locale that the widget should be displayed in (default is 'en').

- `baseUrl`: Base URL for querying metrics. Can be set if you have a local instance of the metrics API (default is 'https://metrics-api.operas-eu.org').

- `WidgetTitle`: The title that appears on the widget
  (default is 'Metrics').

- `showDetailedMetricsLink`: `true` or `false`, whether or not to display link to detailed metrics (if available; default is `false`).

- `detailedMetricsLink`: URL link to detailed metrics (no default).

- `detailedMetricsText`: Text to show for displaying the link to detailed metrics (default is 'Show detailed metrics').

- `styling`: An object containing all style overrides. See [Styling](#styling) the available options within this object.

Only `uri` needs to be set in order for the widget to work.

### Styling

Styling options can be overriden by adding a `styling` value to the `widget_params` variable (see [Variables](#variables)). This variable does not need to exist for the widget to work properly, and it will use all of the default styling values . Currently, these include:

- `widgetBorder`: `true` or `false`, whether the widget should have a border (default is `false`)

- `widgetBorderWidth`: The width of the widget border (default is '2px')

- `widgetBorderColor`: The color of the widget border (default is 'grey')

- `headerBackgroundColor`: The background color of the widget header (default is '#ffffff')

- `headerTextColor`: The text color of the widget header (default is '#212529')

- `headerButtonBackgroundColor`: The background color of the toggle button in the widget header (default is 'transparent')

- `headerButtonTextColor`: The text color of the toggle button in the widget header (default is '#007bff')

- `tableBackgroundColor`: The background color of the table containing the metrics (default is '#ffffff')

- `tableTextColor`: The text color of the table containing the metrics (default is '#212529')

- `metricsCountBorderColor`: The border color of the rounded rectangle containing the total count of available metrics (default is '#212529')

- `infomarkBackgroundColor`: The background color of the '?' icon next to each metric type (default is '#343a40')

- `infomarkTextColor`: The text color of the '?' icon next to each metric type (default is '#ffffff')

- `detailButtonBackgroundColor`: The background color of the 'show detailed metrics' button beneath the metrics table (default is '#343a40')

- `detailButtonTextColor`: The background color of the 'show detailed metrics' button beneath the metrics table (default is '#ffffff')
