var React = require('react');
var AppHeader = require('./AppHeader/AppHeader.js');
var AppMenu = require('./AppMenu/AppMenu.js');

var MediaQuery = require('react-responsive');

var mui = require('material-ui');

var ThemeManager = new mui.Styles.ThemeManager();
var Colors = mui.Styles.Colors;

var LeftNav = mui.LeftNav;
var MenuItem = mui.MenuItem;
var AppBar = mui.AppBar;
var FlatButton = mui.FlatButton;








var Template = React.createClass({
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
    _handleHamburgerClick: function()
    {
        this.refs.menu.toggle();
        console.log('toggle LeftNav');
    },
    render:function(){
        // className="container-fluid"
        var menuItems = [
            { route: 'get-started', text: 'Get Started' },
            { route: 'customization', text: 'Customization' },
            { route: 'components', text: 'Components' },
            { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
            {
                type: MenuItem.Types.LINK,
                payload: 'https://github.com/callemall/material-ui',
                text: 'GitHub'
            },
            {
                text: 'Disabled',
                disabled: true
            },
            {
                type: MenuItem.Types.LINK,
                payload: 'https://www.google.com',
                text: 'Disabled Link',
                disabled: true
            },
        ];
        /*<div className="row">
         <div className="col-md-2">
         <AppMenu></AppMenu>
         </div>
         <div className="col-md-10">
         <AppHeader ></AppHeader>
         {this.props.children}
         </div>
         </div>*/
        return (

            <div>
                <MediaQuery minWidth={1224}>
                    <LeftNav ref = "menu" docked = {true}  menuItems = {menuItems} />
                    <div style={{marginLeft:256}}>
                        <AppBar showMenuIconButton={false} onLeftIconButtonTouchTap = { this._handleHamburgerClick }
                            title = "Portfolio Name - Organization"
                            iconElementRight={<FlatButton label="Change" />}/>
                        {this.props.children}
                    </div>
                </MediaQuery>
                <MediaQuery maxWidth={1224}>
                    <LeftNav ref = "menu" docked = {false}  menuItems = {menuItems} />
                    <AppBar showMenuIconButton={true} onLeftIconButtonTouchTap = { this._handleHamburgerClick }
                            title = "Portfolio Name - Organization"/>
                    {this.props.children}
                </MediaQuery>
            </div>
        );
    }
});

module.exports = Template;