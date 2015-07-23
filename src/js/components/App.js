var React = require('react');

var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;
var NotFound = Router.NotFound;

var AppRoutes = require('../constants/AppRoutes');
var AppTemplate = require('./AppTemplate.js');
var ProjectMainPage = require('./Project/ProjectMainPage');


var App = React.createClass({
    render:function(){
        return (
            <AppTemplate>
                <Locations>
                    <Location path="/" handler={ProjectMainPage} />
                    <Location path={AppRoutes.PROJECT_MAIN} handler={ProjectMainPage} />
                </Locations>
            </AppTemplate>
        );
    }
});
module.exports = App;