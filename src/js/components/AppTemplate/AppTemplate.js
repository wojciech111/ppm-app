var React = require('react');
//Router
var Router = require('react-router');
var Navigation = Router.Navigation;
var State = Router.State;
var RouteHandler = Router.RouteHandler;
//routes names
var routes_names = require('../../config/routes_names');
//Stores
//var UserStore = require('../../stores/UserStore');
var PortfolioStore = require('../../stores/PortfolioStore');
//Action creators
var ViewActionCreator = require('../../actions/ViewActionCreator');
//Constants
//var AppConstants = require('../../constants/AppConstants');
//var StoreStatuses = AppConstants.StoreStatuses;
//Components
var AppContextContainer = require('./AppContextContainer');
//Material-ui components
var mui = require('material-ui');
var LeftNav = mui.LeftNav;
var MenuItem = mui.MenuItem;
var AppBar = mui.AppBar;
//Extras
var MediaQuery = require('react-responsive');

/*
TODO PRzekazywanie ze storow danych do contextu przez props
 */


var AppTemplate = React.createClass({
    mixins: [Navigation, State],
    getDefaultProps: function() {
        return {
            menuItems: [
                { route: routes_names.DASHBOARD, text: 'Dashboard' },
                { route: routes_names.PROJECT_MAIN, text: 'Projects' },
                { route: routes_names.PROGRAM_MAIN, text: 'Programs' },
                { route: routes_names.DECISION_MAIN, text: 'Decisions' },
                { route: routes_names.CATEGORY_MAIN, text: 'Categories' },
                { route: routes_names.PROCESS_MAIN, text: 'Processes' },
                { type: MenuItem.Types.SUBHEADER, text: 'Settings' },
                { route: routes_names.PORTFOLIO_DETAILS, text: 'Portfolio' },
                { route: routes_names.ORGANIZATION_DETAILS, text: 'Organization' },
                { route: routes_names.USER_DETAILS, text: 'User' }
            ],
        };
    },
    getInitialState: function() {
        return { title: PortfolioStore.getPortfolio().name };
    },
    _handleHamburgerClick: function(){
        this.refs.menu.toggle();
        console.log('toggle LeftNav');
    },
    _getSelectedIndex() {
        // Get the selected item in LeftMenu
        //console.log('idx LeftNav');
        var currentItem;
        var menuItems = this.props.menuItems;
        for (var i = menuItems.length - 1; i >= 0; i--) {
            currentItem = menuItems[i];
            //console.log(currentItem.type);
            if(currentItem.type !== MenuItem.Types.SUBHEADER) {
                if(currentItem.route && this.context.router.isActive(currentItem.route)) {
                    //console.log(currentItem.route);
                    //console.log(this.context.router.isActive(currentItem.route));
                    return i;
                }
            }
        }
    },

    _onLeftNavChange(e, key, payload) {
        console.log('ROUTER TRANSITION - LeftNav item clicked '+payload.route);
        this.transitionTo(payload.route, {portfolioId: this.getParams().portfolioId});
    },
    /* MANAGE STORE CHANGES*/

    componentDidMount: function(){
        PortfolioStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
        PortfolioStore.removeChangeListener(this._onChange);
    },
    _onChange: function(){
        //console.log("PortfolioStore.havePortfolio():"+PortfolioStore.havePortfolio());
        if(PortfolioStore.havePortfolio()) {
            this.setState({
                title: PortfolioStore.getPortfolio().name
            })
        }
    },
    /* MANAGE STORE CHANGES*/
    render:function(){
        var title = this.state.title;
        var menuItems = this.props.menuItems;

        return (
            <div>
                <MediaQuery minWidth={1224}>
                    <LeftNav ref = "menu"
                             docked = {true}
                             menuItems = {menuItems}
                             header={<AppContextContainer/>}
                             selectedIndex={this._getSelectedIndex()}
                             onChange={this._onLeftNavChange}
                        />
                    <div style={{marginLeft:256}}>
                        <AppBar showMenuIconButton={false} onLeftIconButtonTouchTap = { this._handleHamburgerClick }
                            title = {title} style={{marginBottom:5}}/>
                        <RouteHandler />
                    </div>
                </MediaQuery>
                <MediaQuery maxWidth={1224}>
                    <LeftNav ref = "menu"
                             docked = {false}
                             menuItems = {menuItems}
                             header={<AppContextContainer/>}
                             selectedIndex={this._getSelectedIndex()}
                             onChange={this._onLeftNavChange}
                        />
                    <AppBar showMenuIconButton={true} onLeftIconButtonTouchTap = { this._handleHamburgerClick }
                            title = {title} style={{marginBottom:5}}/>
                    <RouteHandler />
                </MediaQuery>
            </div>
        );
    }
});

module.exports = AppTemplate;