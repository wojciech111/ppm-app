var React = require('react');
//Router
var State = require('react-router').State;
//routes names
var routes_names = require('../../config/routes_names');

//Stores
var UserStore = require('../../stores/UserStore');
var PortfolioStore = require('../../stores/PortfolioStore');
//Action creators
var ViewActionCreator = require('../../actions/ViewActionCreator');
//Constants
var AppConstants = require('../../constants/AppConstants');
var StoreStatuses = AppConstants.StoreStatuses;
var ViewModes = AppConstants.ViewModes;
//Components
var ModeChanger = require('../Commons/ModeChanger');
var UserDetails = require('./UserDetails/UserDetails');

//Material-ui components
var mui = require('material-ui');
var Tabs = mui.Tabs;
var Tab = mui.Tab;

//TODO NO ACTION CONNECTED


var UserDetailsContainer = React.createClass({
    mixins: [State],
    getInitialState: function(){
        return {
            //portfolio: PortfolioStore.getPortfolio(),
            user: UserStore.getUser(),
            mode: ViewModes.VIEW_MODE,
            nrOfChanges: 0,
        }
    },
    /* MANAGE STORE CHANGES*/
    componentDidMount: function(){
        //PortfolioStore.addChangeListener(this._onChange);
        UserStore.addChangeListener(this._onChange);
        //this._loadPortfolio(this.state.portfolioId);
    },
    componentWillUnmount: function(){
        //PortfolioStore.removeChangeListener(this._onChange);
        UserStore.removeChangeListener(this._onChange);
    },
    _onChange: function(){
            this.setState({
                //portfolio: PortfolioStore.getPortfolio(),
                user: UserStore.getUser()
            })

    },
    /* MANAGE STORE CHANGES*/

    /* HANDLE APP STATES CHANGES*/

    _handleUserUpdate: function(changedUser){
        //ViewActionCreator.updateUser(changedUser);
    },
    /* HANDLE APP STATES CHANGES*/
    /* VIEW MODE CHANGES*/
    changeToEditMode: function(){
        this.setState({
            mode: ViewModes.EDIT_MODE
        });
    },
    changeToViewModeWithSave: function(){
        this._handleUserUpdate(this.state.user);
        this.setState({
            mode: ViewModes.VIEW_MODE,
            nrOfChanges: 0
        });
    },
    changeToViewModeWithCancel: function(){
        this.setState({
            mode: ViewModes.VIEW_MODE,
            user: UserStore.getUser(),
            nrOfChanges: 0
        });
    },
    /* VIEW MODE CHANGES*/
    /*HELPERS  Passed by props */
    handleUserChange: function(user){
        this.setState({
            user: user,
            nrOfChanges: this.state.nrOfChanges+1
        })

    },
    /*HELPERS  Passed by props */

    render:function(){
        var user= this.state.user;
        var mode= this.state.mode;
        var nrOfChanges= this.state.nrOfChanges;
        //console.log("ProjectDetailsContainer: "+PortfolioStore.getStatus());


        var viewToShow;

        if(!UserStore.haveUser()){
            viewToShow=(
                <div>Loading...</div>
            );
        } else if(user === null) {
            viewToShow=(
                <div>No user found!</div>
            );
        }else {
            //console.log("PROJECT:");
            //console.log(project);
            viewToShow = (
                <div>
                    <div className="container-fluid">
                        <ModeChanger
                            nrOfChanges={nrOfChanges} currentMode={mode}
                            changeToEdit={this.changeToEditMode}
                            changeToViewModeWithSave={this.changeToViewModeWithSave}
                            changeToViewModeWithCancel={this.changeToViewModeWithCancel}
                            ></ModeChanger>
                        <UserDetails
                            user={user}
                            mode={mode}
                            handleUserChange={this.handleUserChange}
                            ></UserDetails>
                    </div>
                </div>
            );
        }

        return (
            <div>{viewToShow}</div>
        )
    }

});

module.exports = UserDetailsContainer;