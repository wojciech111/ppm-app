var React = require('react');
var ProjectMainPage = require('./Project/ProjectMainPage');
var Router = require('react-router-component');
var Template = require('./AppTemplate.js');
var Locations = Router.Locations
var Location = Router.Location
var NotFound = Router.NotFound

var App = React.createClass({
    render:function(){
        return (
            <Template>
                <Locations>
                    <Location path="/" handler={ProjectMainPage} />

                </Locations>
            </Template>
        );
    }
});

module.exports = App;