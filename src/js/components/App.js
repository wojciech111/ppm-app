var React = require('react');

var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = mui.Styles.Colors;

var Router =require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;

var AppTemplate = require('./AppTemplate');

var UserStore = require('../stores/UserStore');
var PortfolioStore = require('../stores/PortfolioStore');
var routes_names = require('../config/routes_names');


var App = React.createClass({
    mixins: [Navigation],
    //STORES
    getInitialState: function() {
        return {
            userId: UserStore.getCurrentUserId(),
            portfolioId: PortfolioStore.getCurrentPortfolioId()
        };
    },

    componentDidMount: function() {
        UserStore.addChangeListener(this._onChange);
        PortfolioStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        UserStore.removeChangeListener(this._onChange);
        PortfolioStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState({
            userId: UserStore.getCurrentUserId(),
            portfolioId: PortfolioStore.getCurrentPortfolioId()
        });
    },
    //STORES

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
        var routeHandler = (<RouteHandler />);
        if(this.state.userId === null){
            console.log("APP: need login ID. this.state.userId="+this.state.userId);
            this.transitionTo(routes_names.LOGIN);
        } else if(this.state.portfolioId === null){
            console.log("APP: need portfolio ID. this.state.portfolioId="+this.state.portfolioId);
            this.transitionTo(routes_names.PORTFOLIO_CHOOSER);
        }else{
            console.log("APP: generate template");
            routeHandler= (<AppTemplate><RouteHandler /></AppTemplate>);
        }
        return (
            <div>{routeHandler}</div>
        );
    }
});
module.exports = App;