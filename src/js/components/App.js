var React = require('react');

var RouteHandler = require('react-router').RouteHandler;


var AppTemplate = require('./AppTemplate');


var App = React.createClass({
    render:function(){

        return (
            <AppTemplate>
                <RouteHandler />
            </AppTemplate>
        );
    }
});
module.exports = App;