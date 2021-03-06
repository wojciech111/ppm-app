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
var ProjectDetailsHeader = require('./ProjectDetails/ProjectDetailsHeader');
var ProjectOverview = require('./ProjectDetails/ProjectOverview');
var ProjectEvaluation = require('./ProjectDetails/ProjectEvaluation');
var ProjectDecisions = require('./ProjectDetails/ProjectDecisions');
var ProjectFinance = require('./ProjectDetails/ProjectFinance');
//Material-ui components
var mui = require('material-ui');
var Tabs = mui.Tabs;
var Tab = mui.Tab;



var ProjectDetailsContainer = React.createClass({
    mixins: [State],
    getInitialState: function(){
        return {
            project: PortfolioStore.getProject(this.getParams().projectId),
            parentComponent: PortfolioStore.getParent(this.getParams().projectId),
            mode: ViewModes.VIEW_MODE,
            nrOfChanges: 0,
        }
    },
    /* MANAGE STORE CHANGES*/
    componentDidMount: function(){
        PortfolioStore.addChangeListener(this._onChange);
        //this._loadPortfolio(this.state.portfolioId);
    },
    componentWillUnmount: function(){
        PortfolioStore.removeChangeListener(this._onChange);
    },
    _onChange: function(){
        //if(PortfolioStore.getStatus() === StoreStatuses.UP_TO_DATE || PortfolioStore.getStatus() === StoreStatuses.MODIFIED) {
            this.setState({
                project: PortfolioStore.getProject(this.getParams().projectId),
                parentComponent: PortfolioStore.getParent(this.getParams().projectId)
            })
       // }

    },
    /* MANAGE STORE CHANGES*/

    /* HANDLE APP STATES CHANGES*/
    /*_loadPortfolio: function(portfolioId){
        if(PortfolioStore.getStatus() === StoreStatuses.EMPTY) {
            ViewActionCreator.loadPortfolio(portfolioId);
        }else if(PortfolioStore.getCurrentPortfolioId() !== portfolioId){
            console.log("PortfolioStore.getCurrentPortfolioId() !== portfolioId");
        }
    },*/

    _handleProjectUpdate: function(changedProject){
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
        this._handleProjectUpdate(this.state.project);
        this.setState({
            mode: ViewModes.VIEW_MODE,
            nrOfChanges: 0
        });
    },
    changeToViewModeWithCancel: function(){
        this.setState({
            mode: ViewModes.VIEW_MODE,
            project: PortfolioStore.getProject(this.getParams().projectId),
            nrOfChanges: 0
        });
    },
    /* VIEW MODE CHANGES*/
    /*HELPERS  Passed by props */
    handleProjectChange: function(project){
        this.setState({
            project: project,
            nrOfChanges: this.state.nrOfChanges+1
        })

    },
    /*HELPERS  Passed by props */
    _handleTabActive:function(tab ){
        console.log("TAB CLICKED: "+tab.props.route);

    },

    render:function(){
        var project= this.state.project;
        var parentComponent= this.state.parentComponent;
        var mode= this.state.mode;
        var nrOfChanges= this.state.nrOfChanges;
        //console.log("ProjectDetailsContainer: "+PortfolioStore.getStatus());
        var viewToShow;

        if(!PortfolioStore.havePortfolio()){
            viewToShow=(
                <div>Loading...</div>
            );
        } else if(project === null) {
            viewToShow=(
                <div>No project with ID: {this.getParams().projectId} found!</div>
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
                        <ProjectDetailsHeader
                            project={project}
                            parentComponent={parentComponent}
                            mode={mode}
                            handleProjectChange={this.handleProjectChange}
                            ></ProjectDetailsHeader>
                    </div>
                    <Tabs>
                        <Tab label="Overview"
                             route={routes_names.OVERVIEW}
                             onActive={this._handleTabActive} >
                            <div className="container-fluid">
                                <ProjectOverview
                                    project={project}
                                    mode={mode}
                                    handleProjectChange={this.handleProjectChange}
                                    ></ProjectOverview>
                            </div>
                        </Tab>
                        <Tab label="Evaluation"
                             route={routes_names.EVALUATION}
                             onActive={this._handleTabActive} >
                            <div className="container-fluid">
                                <ProjectEvaluation
                                    project={project}
                                    mode={mode}
                                    handleProjectChange={this.handleProjectChange}
                                    ></ProjectEvaluation>
                            </div>
                        </Tab>
                        <Tab label="Decisions"
                             route={routes_names.DECISIONS}
                             onActive={this._handleTabActive} >
                            <div className="container-fluid">
                                <ProjectDecisions
                                    project={project}
                                    mode={mode}
                                    handleProjectChange={this.handleProjectChange}
                                    ></ProjectDecisions>
                            </div>
                        </Tab>
                        <Tab label="Finance"
                             route={routes_names.FINANCE}
                             onActive={this._handleTabActive} >
                            <div className="container-fluid">
                                <ProjectFinance
                                    project={project}
                                    mode={mode}
                                    handleProjectChange={this.handleProjectChange}
                                    ></ProjectFinance>
                            </div>
                        </Tab>
                        <Tab label="Stakeholders"
                             route={routes_names.STAKEHOLDERS}
                             onActive={this._handleTabActive} >
                        <div>
                            <h2 >Tab Two Template Example</h2>
                            <p>
                                This is another example of a tab template!
                            </p>
                            <p>
                                Fair warning - the next tab routes to home!
                            </p>
                        </div>
                        </Tab>
                    </Tabs>
                </div>
            );
        }

        return (
            <div>{viewToShow}</div>
        )
    }

});

module.exports = ProjectDetailsContainer;