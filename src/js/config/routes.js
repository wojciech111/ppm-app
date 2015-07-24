var React = require('react');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

var routes_names = require('./routes_names');
var App = require('../components/App');

var ProjectMainPage = require('../components/Project/ProjectMainPage');
var AppContext = require('../components/AppContext/AppContext');



module.exports = (
    <Route name="app" path="/" handler={App}>
        <Route name={routes_names.PROJECT_MAIN} path={routes_names.PROJECT_MAIN} handler={ProjectMainPage} />
        {//<Route name="project-main" path={routes_names.PROJECT_MAIN+"/:username"} handler={ProjectMainPage} />
        }
        <DefaultRoute handler={AppContext} />
    </Route>
);