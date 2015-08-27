var React = require('react');
//Router
var Router =require('react-router');
var Navigation = Router.Navigation;
//routes names
var routes_names = require('../../config/routes_names');
//Stores
var UserStore = require('../../stores/UserStore');
var PortfolioStore = require('../../stores/PortfolioStore');
//Action creators
var ViewActionCreator = require('../../actions/ViewActionCreator');
//Constants
var AppConstants = require('../../constants/AppConstants');
var ActionTypes = AppConstants.ActionTypes;
//var StoreStatuses = AppConstants.StoreStatuses;
//Components
//Material-ui components
var mui = require('material-ui');
var DropDownMenu = mui.DropDownMenu;
var ListItem = mui.ListItem;
var List = mui.List;
var Avatar = mui.Avatar;
var FlatButton = mui.FlatButton;

/*
 TODO ReDesign troszke
 */


var AppContextContainer = React.createClass({
    mixins: [Navigation],
    //STORES
    getInitialState: function() {
        return {
            user: UserStore.getUser(),
            portfolio: PortfolioStore.getPortfolio()
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
        //console.log("AppContextContainer onChange");
        this.setState({
            user: UserStore.getUser(),
            portfolio: PortfolioStore.getPortfolio()
        });
    },
    //STORES
    _handleSelectChange: function(e, selectedIndex, menuItem) {
        console.log(menuItem);
        this.transitionTo(routes_names.PORTFOLIO, {portfolioId: menuItem.componentId});
        ViewActionCreator.changePortfolio(menuItem.componentId);
    },
    _handleLogout: function(){
        ViewActionCreator.logout();
    },
    render:function(){
        //console.log(typeof this.state.user+ " "+typeof this.state.portfolio);
        if(!UserStore.haveUser() || !PortfolioStore.havePortfolio()){
            return (<div>Loading...</div>);
        } else {
            var user = this.state.user;
            var portfolio = this.state.portfolio;
            var availablePortfolios = [];
            var i=0;
            var selected=0;
            var avatarOrg;
            var nameOrg;
            var employeeOrg;
            for (var e = 0; e < user.employees.length; e++) {
                for (var p = 0; p < user.employees[e].organization.portfolios.length; p++) {
                    availablePortfolios.push(
                        {
                            componentId: user.employees[e].organization.portfolios[p].componentId,
                            payload: i,
                            text: user.employees[e].organization.portfolios[p].name
                        }
                    );
                    if(user.employees[e].organization.portfolios[p].componentId === portfolio.componentId){
                        selected=i;
                        avatarOrg=(<Avatar>{user.employees[e].organization.shortName.toUpperCase().slice(0,1)}</Avatar>);
                        nameOrg=user.employees[e].organization.shortName;
                        employeeOrg="as "+user.employees[e].firstName+" "+user.employees[e].secondName;

                    }
                    i++;
                }
            }
            var avatarUser=(<Avatar>{user.username.toUpperCase().slice(0,1)}</Avatar>);

            return (
                <div>
                    <FlatButton label={"Logout"} secondary={true} onClick={this._handleLogout}/>

                    <DropDownMenu style={{"width":"100%"}}
                                  autoWidth={false}
                                  onChange={this._handleSelectChange}
                                  selectedIndex={selected}
                                  menuItems={availablePortfolios} />
                    <List>
                        <ListItem key={1}
                                  primaryText={user.username}
                                  leftAvatar={avatarUser}
                                  secondaryText={user.email}
                                  disabled={true}>
                        </ListItem>
                        <ListItem key={2}
                                  primaryText={nameOrg}
                                  leftAvatar={avatarOrg}
                                  secondaryText={employeeOrg}
                                  disabled={true}>
                        </ListItem>
                    </List>

                </div>
            );
        }
    }
});

module.exports = AppContextContainer;