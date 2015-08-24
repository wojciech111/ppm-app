var React = require('react');
//Router
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
//routes names
var routes_names = require('./routes_names');
//Main APP
var App = require('../components/App');
//Template

//Main Pages
var ProjectMainPageContainer = require('../components/Project/ProjectMainPageContainer');

//Details Pages
var ProjectDetailsContainer = require('../components/Project/ProjectDetailsContainer');


//Test Pages
var TestPage = require('../components/Project/TestPage');


//Other Pages
/*var LoginPage = require('../components/Login/LoginPage');
var PortfolioChooserPage = require('../components/Login/PortfolioChooserPage');
<Route name={routes_names.LOGIN} path={routes_names.LOGIN} handler={LoginPage} />
<Route name={routes_names.PORTFOLIO_CHOOSER} path={routes_names.PORTFOLIO_CHOOSER} handler={PortfolioChooserPage} />
*/

//var SignupPage = require('../components/Session/SignupPage');

//TODO template z /portfolio/:id

module.exports = (
    <Route name="app" path="/" handler={App}>

        <Route name={routes_names.PROJECT_MAIN} path={routes_names.PROJECT_MAIN} handler={ProjectMainPageContainer} />
        <Route name={routes_names.DASHBOARD} path={routes_names.DASHBOARD} handler={TestPage} />
        <Route name={routes_names.PROJECT_DETAILS} path={routes_names.PROJECT_DETAILS.concat("/:projectId")} handler={ProjectDetailsContainer} />

        <DefaultRoute handler={TestPage} />
    </Route>
);