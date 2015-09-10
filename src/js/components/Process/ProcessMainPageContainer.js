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
var ProcessHeader = require('./ProcessMainPage/ProcessHeader');
var ProcessBody = require('./ProcessMainPage/ProcessBody');

//Material-ui components
var mui = require('material-ui');
var Tabs = mui.Tabs;




var ProcessMainPageContainer = React.createClass({
    mixins: [State],
    getInitialState: function(){
        return {
            portfolio: PortfolioStore.getPortfolio(),
            //processes: PortfolioStore.getAllProcesses(),
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
                portfolio: PortfolioStore.getPortfolio(),
                //processes: PortfolioStore.getAllProcesses(),
            })

    },
    /* MANAGE STORE CHANGES*/

    /* HANDLE APP STATES CHANGES*/

    _handlePortfolioUpdate: function(changedPortfolio){
        ViewActionCreator.updateComponent(changedPortfolio);
    },
    /* HANDLE APP STATES CHANGES*/
    /* VIEW MODE CHANGES*/
    changeToEditMode: function(){
        this.setState({
            mode: ViewModes.EDIT_MODE
        });
    },
    changeToViewModeWithSave: function(){
        var portfolio=this.state.portfolio;
        this._handlePortfolioUpdate(portfolio);
        this.setState({
            mode: ViewModes.VIEW_MODE,
            nrOfChanges: 0
        });
    },
    changeToViewModeWithCancel: function(){
        this.setState({
            mode: ViewModes.VIEW_MODE,
            portfolio: PortfolioStore.getPortfolio(),
            //processes: PortfolioStore.getAllProcesses(),
            nrOfChanges: 0
        });
    },
    /* VIEW MODE CHANGES*/
    /*HELPERS  Passed by props */
    handlePortfolioChange: function(portfolio){
        this.setState({
            portfolio: portfolio,
            nrOfChanges: this.state.nrOfChanges+1
        })
    },
    handleProcessChange: function(process){
        var portfolio=this.state.portfolio;
//TODO UPDATE
        this.setState({
            portfolio: portfolio,
            nrOfChanges: this.state.nrOfChanges+1
        })

    },
    /*HELPERS  Passed by props */

    render:function(){
        var portfolio= this.state.portfolio;
        var processes= portfolio.processes;
        var mode= this.state.mode;
        var nrOfChanges= this.state.nrOfChanges;
        //console.log("ProjectDetailsContainer: "+PortfolioStore.getStatus());


        var viewToShow;

        if(!PortfolioStore.havePortfolio()){
            viewToShow=(
                <div>Loading...</div>
            );
        } else if(portfolio === null) {
            viewToShow=(
                <div>No portfolio with ID: {this.getParams().portfolioId} found!</div>
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
                        <ProcessHeader
                            defaultProgramProcess={portfolio.defaultProgramProcess}
                            defaultProjectProcess={portfolio.defaultProjectProcess}
                            mode={mode}
                            ></ProcessHeader>
                        <ProcessBody
                            processes={processes}
                            mode={mode}
                            handleProcessChange={this.handleProcessChange}
                            ></ProcessBody>
                    </div>
                </div>
            );
        }

        return (
            <div>{viewToShow}</div>
        )
    }

});

module.exports = ProcessMainPageContainer;