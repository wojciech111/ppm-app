var React = require('react');

var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = mui.Styles.Colors;

var RouteHandler = require('react-router').RouteHandler;
var AppTemplate = require('./AppTemplate');


var App = React.createClass({
    //Material-ui settings
    childContextTypes: {
        muiTheme: React.PropTypes.object.isRequired
    },
    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },
    componentWillMount() {
        ThemeManager.setPalette({
            accent1Color: Colors.blue500
        });
    },
    //End of Material-ui settings
    render:function(){

        return (
            <AppTemplate>
                <RouteHandler />
            </AppTemplate>
        );
    }
});
module.exports = App;