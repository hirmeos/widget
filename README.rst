HIRMEOS Metrics Widget
======================

Development
-----------

For development purposes, this project consists of three main files.

1) *src/hirmeos-metrics.js* - This contains javascript for a React-like
   app, which manages the logic for the widget.

2) *src/hirmeos-metrics.css* - This contains styling for the widget.

3) *src/index.html* - This demonstrates how the widget would be
   integrated into a page.

Files *(1)* and *(2)* are designed to simply be loaded from a CDN, so to test
these, simply open file *(3)* in a browser, e.g.

  .. code-block:: bash

    $ firefox src/index.html

Note: the ``baseUrl`` variable has been set to use a local version of the \
metrics-api. Comment this out to query the live API.


Moving to production
--------------------

There are two steps required to get the JavaScript ready for production.
For more detailed instructions, please refer to the resources listed:

**1. Converting JSX into javascript.**

From the project root directory, run the following commands:

  .. code-block:: bash

    $ npm init -y
    $ npm install babel-cli@6 babel-preset-react-app@3
    $ npx babel --watch src --out-dir ./processed --presets react-app/prod

The final command will convert the React/JSX code to pure JavaScript, making
it readable by more browsers, and also allowing it to be minimised.

This command constantly waits, and will update the script as you edit
`src/hirmeos-metrics.js`.

For more information, this was based on:
https://reactjs.org/docs/add-react-to-a-website.html#add-jsx-to-a-project


**2. Minimising the javascript.**

Make sure you complete step 1. From the *processed* directory, run the
following commands:

  .. code-block:: bash

    $ npm install terser
    $ npx terser -c -m -o hirmeos-metrics.min.js -- hirmeos-metrics.js

For more information, this was based on:
https://gist.github.com/gaearon/42a2ffa41b8319948f9be4076286e1f3


The *src/index-min.html* file
-----------------------------

This file shows how the minimised JavaScript widget would be integrated
into a page. You will notice a small difference - because the file has been
converted from JSX to JavaScript, we no longer need to specify *type="text/jsx"* 
when loading this script.

It is useful to view this file in your browser to make sure the
production steps mentioned above were successful.

  .. code-block:: bash

    $ firefox src/index-min.html


The *src/index-from-cdn.html* file
----------------------------------

This shows a production-ready implementation of the widget. Both the JavaScript
and CSS are imported from our CDN, and the React imports are set to the
production versions of these scripts.

Note: the ``baseUrl`` variable has been disabled so the widget will query the
live instance of the metrics-api. Please be sure to update your token
accordingly.

  .. code-block:: bash

    $ firefox src/index-min.html
