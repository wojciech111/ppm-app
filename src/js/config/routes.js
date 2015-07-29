var React = require('react');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

var routes_names = require('./routes_names');
var App = require('../components/App');

var ProjectMainPage = require('../components/Project/ProjectMainPage');
var TestPage = require('../components/Project/TestPage');
var ProjectDetailsContainer = require('../components/Project/ProjectDetailsContainer');

var AppContextContainer = require('../components/AppContext/AppContextContainer');



module.exports = (
    <Route name="app" path="/" handler={App}>
        <Route name={routes_names.PROJECT_MAIN} path={routes_names.PROJECT_MAIN} handler={ProjectMainPage} />
        <Route name={routes_names.PROGRAM_MAIN} path={routes_names.PROGRAM_MAIN} handler={TestPage} />
        <Route name={routes_names.PROJECT_DETAILS} path={routes_names.PROJECT_DETAILS.concat("/:projectId")} handler={ProjectDetailsContainer} />

        <DefaultRoute handler={AppContextContainer} />
    </Route>
);