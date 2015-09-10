var React = require('react');
//Router
var State = require('react-router').State;
//routes names
var routes_names = require('../../config/routes_names');

//Stores
//var UserStore = require('../../stores/UserStore');
var PortfolioStore = require('../../stores/PortfolioStore');
//Action creators
var ViewActionCreator = require('../../actions/ViewActionCreator');
//Constants
var AppConstants = require('../../constants/AppConstants');
var StoreStatuses = AppConstants.StoreStatuses;
var ViewModes = AppConstants.ViewModes;
//Components
var ModeChanger = require('../Commons/ModeChanger');
var FilterableDecisionList = require('./DecisionMainPage/FilterableDecisionList');


//Material-ui components
var mui = require('material-ui');
var Tabs = mui.Tabs;




var DecisionMainPageContainer = React.createClass({
    getInitialState: function(){
        return {
            decisions: PortfolioStore.getAllDecisions(),
            mode: ViewModes.VIEW_MODE,
            nrOfChanges: 0,
        }
    },
    /* MANAGE STORE CHANGES*/
    componentDidMount: function(){
        PortfolioStore.addChangeListener(this._onChange);
        //UserStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
        PortfolioStore.removeChangeListener(this._onChange);
        //UserStore.removeChangeListener(this._onChange);
    },
    _onChange: function(){
            this.setState({
                decisions: PortfolioStore.getAllDecisions(),
            })
    },
    /* MANAGE STORE CHANGES*/

    /* HANDLE APP STATES CHANGES*/

    _handleDecisionUpdate: function(decision){
        ViewActionCreator.updateDecision(decision);
    },
    /* HANDLE APP STATES CHANGES*/
    /* VIEW MODE CHANGES*/
    changeToDecisionMode: function(){
        this.setState({
            mode: ViewModes.DECISION_MODE
        });
    },
    changeToViewMode: function(){
        this.setState({
            mode: ViewModes.VIEW_MODE,
            nrOfChanges: 0
        });
    },

    /* VIEW MODE CHANGES*/
    /*HELPERS  Passed by props */

    handleDecisionChange: function(decision){
        this._handleDecisionUpdate(decision);
        this.setState({
            nrOfChanges: this.state.nrOfChanges+1
        })

    },
    /*HELPERS  Passed by props */

    render:function(){
        var decisions= this.state.decisions;
        var mode= this.state.mode;
        var nrOfChanges= this.state.nrOfChanges;
        console.log("decisions");
        console.log(decisions);


        var viewToShow;

        if(!PortfolioStore.havePortfolio()){
            viewToShow=(
                <div>Loading...</div>
            );
        } else {
            //console.log("PROJECT:");
            //console.log(project);
            viewToShow = (
                <div>
                    <div className="container-fluid">
                        <ModeChanger
                            nrOfChanges={nrOfChanges} currentMode={mode}
                            changeToEdit={this.changeToDecisionMode}
                            changeToViewModeWithCancel={this.changeToViewMode}
                            ></ModeChanger>
                        <FilterableDecisionList
                            decisions={decisions}
                            mode={mode}
                            handleDecisionChange={this.handleDecisionChange}
                            ></FilterableDecisionList>
                    </div>
                </div>
            );
        }

        return (
            <div>{viewToShow}</div>
        )
    }

});

module.exports = DecisionMainPageContainer;