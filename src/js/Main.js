var App = require('./components/App');
var React = require('react');
var injectTapEventPlugin = require("react-tap-event-plugin");

injectTapEventPlugin();

React.render(<App />, document.getElementById('main'));