var React = require('react');
var AppStore = require('../stores/AppStore');
var AppContext = require('./AppContext/AppContext');
var AppRoutes = require('../constants/AppRoutes');


var MediaQuery = require('react-responsive');


var mui = require('material-ui');

var ThemeManager = new mui.Styles.ThemeManager();
var Colors = mui.Styles.Colors;

var LeftNav = mui.LeftNav;
var MenuItem = mui.MenuItem;
var AppBar = mui.AppBar;




var Template = React.createClass({

    //Material-ui settings
    childContextTypes: {
        muiTheme: React.PropTypes.object
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

    getDefaultProps: function() {
        return {
            menuItems: [
                { route: AppRoutes.PROJECT_MAIN, text: 'Projects' },
                { route: AppRoutes.PROGRAM_MAIN, text: 'Programs' },
                { route: AppRoutes.DECISION_MAIN, text: 'Decisions' },
                { route: AppRoutes.CATEGORY_MAIN, text: 'Categories' },
                { route: AppRoutes.PROCESS_MAIN, text: 'Processes' },
                { type: MenuItem.Types.SUBHEADER, text: 'Settings' },
                { route: AppRoutes.PORTFOLIO_DETAILS, text: 'Portfolio' },
                { route: AppRoutes.ORGANIZATION_DETAILS, text: 'Organization' },
                { route: AppRoutes.USER_DETAILS, text: 'User' }
            ]
        };
    },
    _handleHamburgerClick: function()
    {
        this.refs.menu.toggle();
        console.log('toggle LeftNav');
    },
    // Get the selected item in LeftMenu
   /* _getSelectedIndex() {
        var currentItem;
        var menuItems = this.props.menuItems;
        for (var i = menuItems.length - 1; i >= 0; i--) {
            currentItem = menuItems[i];
            if (currentItem.route && this.context.router.isActive(currentItem.route)) {
                return i;
            }
        }
    },

    _onLeftNavChange(e, key, payload) {
        // Do DOM Diff refresh
        this.context.router.transitionTo(payload.route);
    },*/
    render:function(){
        var portfolio = AppStore.getPortfolio();
        var menuItems = this.props.menuItems;

        return (
            <div>
                <MediaQuery minWidth={1224}>
                    <LeftNav ref = "menu"
                             docked = {true}
                             menuItems = {menuItems}
                             header={<AppContext/>}
                             //selectedIndex={this._getSelectedIndex()}
                             //onChange={this._onLeftNavChange}
                        />
                    <div style={{marginLeft:256}}>
                        <AppBar showMenuIconButton={false} onLeftIconButtonTouchTap = { this._handleHamburgerClick }
                            title = {portfolio.name}/>
                        {this.props.children}
                    </div>
                </MediaQuery>
                <MediaQuery maxWidth={1224}>
                    <LeftNav ref = "menu" docked = {false}  menuItems = {menuItems} header={<AppContext/>} />
                    <AppBar showMenuIconButton={true} onLeftIconButtonTouchTap = { this._handleHamburgerClick }
                            title = {portfolio.name}/>
                    {this.props.children}
                </MediaQuery>
            </div>
        );
    }
});

module.exports = Template;