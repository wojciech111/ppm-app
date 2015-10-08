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
var FilterableProgramList = require('./ProgramMainPage/FilterableProgramList');


//Material-ui components
var mui = require('material-ui');
var Tabs = mui.Tabs;




var ProgramMainPageContainer = React.createClass({
    getInitialState: function(){
        return {
            programs: PortfolioStore.getAllPrograms(),
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
            programs: PortfolioStore.getAllPrograms(),
        })
    },
    /* MANAGE STORE CHANGES*/

    /* HANDLE APP STATES CHANGES*/

    /*_handleProjectUpdate: function(changedProject){
     ViewActionCreator.updateComponent(changedProject);
     },
     /* HANDLE APP STATES CHANGES*/
    /* VIEW MODE CHANGES*/
    changeToEditMode: function(){
        this.setState({
            mode: ViewModes.EDIT_MODE
        });
    },
    changeToViewModeWithSave: function(){
        //TODO handle update project list
        //this._handleProjectUpdate(this.state.project);
        this.setState({
            mode: ViewModes.VIEW_MODE,
            nrOfChanges: 0
        });
    },
    changeToViewModeWithCancel: function(){
        this.setState({
            mode: ViewModes.VIEW_MODE,
            programs: PortfolioStore.getAllPrograms(),
            nrOfChanges: 0
        });
    },

    /* VIEW MODE CHANGES*/
    /*HELPERS  Passed by props */

    handleProgramChange: function(changedProjects){
        //this._handleDecisionUpdate(componentId,decision);
        this.setState({
            nrOfChanges: this.state.nrOfChanges+1
        })

    },
    /*HELPERS  Passed by props */
    render:function(){
        var programs=this.state.programs;
        var mode= this.state.mode;
        var nrOfChanges= this.state.nrOfChanges;
        console.log("program main page");


        var viewToShow;

        if(!PortfolioStore.havePortfolio()){
            viewToShow=(
                <div>Loading...</div>
            );
        } else {
            //console.log("PROJECT:");
            //console.log(project);
            /*var programsBlocks=[];
            for(var i=0;i<programs.length;i++){
                console.log(programs[i].name);
                programsBlocks.push(
                    <ModefulProgram
                        program={programs[i]}
                        mode={mode}
                        key={programs[i].componentId}
                        ></ModefulProgram>
                );
            }*/
            viewToShow = (
                <div>
                    <div className="container-fluid">
                        <ModeChanger
                            nrOfChanges={nrOfChanges} currentMode={mode}
                            changeToEdit={this.changeToEditMode}
                            changeToViewModeWithSave={this.changeToViewModeWithSave}
                            changeToViewModeWithCancel={this.changeToViewModeWithCancel}
                            ></ModeChanger>
                        <FilterableProgramList
                            programs={programs}
                            mode={mode}
                            handleProgramChange={this.handleProgramChange}
                            ></FilterableProgramList>
                    </div>
                </div>
            );
        }

        return (
            <div>{viewToShow}</div>
        )
    }

});

module.exports = ProgramMainPageContainer;