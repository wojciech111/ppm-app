var React = require('react');
//Router
var Router =require('react-router');
var RouteHandler = Router.RouteHandler;
var State = Router.State;
//routes names
var routes_names = require('../config/routes_names');
//Stores
var UserStore = require('../stores/UserStore');
var PortfolioStore = require('../stores/PortfolioStore');
//Action creators
var ViewActionCreator = require('../actions/ViewActionCreator');
//Constants
var AppConstants = require('../constants/AppConstants');
var AppStatuses = AppConstants.AppStatuses;
//Components
var LoginPage = require('./Login/LoginPage');
var PortfolioChooserPage = require('./Login/PortfolioChooserPage');
var AppTemplate = require('./AppTemplate/AppTemplate');
//Material-ui components
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = mui.Styles.Colors;
var RefreshIndicator = mui.RefreshIndicator;


var App = React.createClass({
    //mixins: [Navigation],
    mixins: [State],
    //STORES
    getInitialState: function() {
        return {
            appStatus: this._computeAppStatus(),
            //user: UserStore.getUser(),
            userErrors: UserStore.getErrors(),
            //portfolio: PortfolioStore.getPortfolio(),
            portfolioErrors: PortfolioStore.getErrors()
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
            appStatus: this._computeAppStatus(),
            //user: UserStore.getUser(),
            userErrors: UserStore.getErrors(),
            //portfolio: PortfolioStore.getPortfolio(),
            portfolioErrors: PortfolioStore.getErrors()
        });
    },
    _computeAppStatus: function(){
        //portfolioId w PosrtfolioStore zawsze odzwierciedla id z URL
        console.log(this.getParams().portfolioId+" !== "+PortfolioStore.getCurrentPortfolioId());
        if(this.getParams().portfolioId && !PortfolioStore.isLoading() && (this.getParams().portfolioId !== PortfolioStore.getCurrentPortfolioId())) {
            console.log("portfolio changed to ID from URL param. portfolioId: "+this.getParams().portfolioId);
            ViewActionCreator.changePortfolio(this.getParams().portfolioId);
        }

        var newStatus=null;
        if(!UserStore.isLoggedIn()) {
            newStatus=AppStatuses.LOGGED_OUT;
        } else if(UserStore.isLoggedIn() && !UserStore.haveUser()){
            newStatus=AppStatuses.WAITING_FOR_USER;
        } else if(UserStore.haveUser() && !PortfolioStore.isPortfolioChoosen()){
            newStatus=AppStatuses.HAVE_USER;
        } else if(UserStore.haveUser() && !PortfolioStore.havePortfolio()){
            newStatus=AppStatuses.WAITING_FOR_PORTFOLIO;
        } else if(UserStore.haveUser() && PortfolioStore.havePortfolio()){
            newStatus=AppStatuses.READY_TO_WORK;
        } else {
            newStatus=null;
        }
        return newStatus;
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
        var content = (<RouteHandler />);
        console.log("APP: RERENDER! appStatus: "+this.state.appStatus);
        if(this.state.appStatus === AppStatuses.LOGGED_OUT){
            content = <LoginPage errors={this.state.userErrors} />;
        } else if(this.state.appStatus === AppStatuses.WAITING_FOR_USER){
            content = "Logging in!";
        } else if(this.state.appStatus === AppStatuses.HAVE_USER){
            content = <PortfolioChooserPage errors={this.state.portfolioErrors} />;
        } else if(this.state.appStatus === AppStatuses.WAITING_FOR_PORTFOLIO){
            content = "Waiting for portfolio"

                //<RefreshIndicator size={40} left={80} top={5} status="loading" />
        } else if(this.state.appStatus === AppStatuses.READY_TO_WORK){
            //content="SUCCES!";
            content= (<RouteHandler />);
        } else{
            content="ERROR: No app status! ";
        }
        return (
            <div>{content}</div>
        );
    }
});
module.exports = App;