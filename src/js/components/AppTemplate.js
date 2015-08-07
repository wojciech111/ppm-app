var React = require('react');

var PortfolioStore = require('../stores/PortfolioStore');
var AppConstants = require('../constants/AppConstants');

var StoreStatuses = AppConstants.StoreStatuses;

var Router = require('react-router');
var routes_names = require('../config/routes_names');

var MediaQuery = require('react-responsive');


var mui = require('material-ui');


var LeftNav = mui.LeftNav;
var MenuItem = mui.MenuItem;
var AppBar = mui.AppBar;

var AppContextContainer = require('./AppContext/AppContextContainer');




var AppTemplate = React.createClass({
    mixins: [Router.Navigation],
    getInitialState: function(){
        return {
            portfolioName: null
        }
    },

    _handleHamburgerClick: function()
    {
        this.refs.menu.toggle();
        console.log('toggle LeftNav');
    },

    getDefaultProps: function() {
        return {
            menuItems: [
                { route: routes_names.PROJECT_MAIN, text: 'Projects' },
                { route: routes_names.PROGRAM_MAIN, text: 'Programs' },
                { route: routes_names.DECISION_MAIN, text: 'Decisions' },
                { route: routes_names.CATEGORY_MAIN, text: 'Categories' },
                { route: routes_names.PROCESS_MAIN, text: 'Processes' },
                { type: MenuItem.Types.SUBHEADER, text: 'Settings' },
                { route: routes_names.PORTFOLIO_DETAILS, text: 'Portfolio' },
                { route: routes_names.ORGANIZATION_DETAILS, text: 'Organization' },
                { route: routes_names.USER_DETAILS, text: 'User' }
            ]
        };
    },

    // Get the selected item in LeftMenu
    _getSelectedIndex() {
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
        console.log('LeftNav item clicked');
        console.log(payload);
        this.transitionTo(payload.route);
    },
    /* MANAGE STORE CHANGES*/
    componentDidMount: function(){
        PortfolioStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
        PortfolioStore.removeChangeListener(this._onChange);
    },
    _onChange: function(){
        if(PortfolioStore.getStatus() === StoreStatuses.UP_TO_DATE || PortfolioStore.getStatus() === StoreStatuses.MODIFIED) {
            this.setState({
                portfolioName: PortfolioStore.getPortfolio().name
            })
        }
    },
    /* MANAGE STORE CHANGES*/
    render:function(){
        var title = "Loading for data...";
        if(this.state.portfolioName !== null) {
            title = this.state.portfolioName;
        }
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
                        {this.props.children}
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
                    {this.props.children}
                </MediaQuery>
            </div>
        );
    }
});

module.exports = AppTemplate;