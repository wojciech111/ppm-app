var React = require('react');
//var App = require('./components/App');

var injectTapEventPlugin = require("react-tap-event-plugin");

var Router = require('react-router');
var routes = require('./config/routes');

injectTapEventPlugin();


Router.run(routes, function (Root ) {
    React.render(<Root />, document.getElementById('main'));
});
