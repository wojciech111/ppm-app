var React = require('react');
var Router = require('react-router');
var AppConstants = require('../../constants/AppConstants');

var PortfolioStore = require('../../stores/PortfolioStore');
var ViewActionCreator = require('../../actions/ViewActionCreator');

var mui = require('material-ui');
var Tabs = mui.Tabs;
var Tab = mui.Tab;

var ModeChanger = require('../Utils/ModeChanger');
var ProjectDetailsHeader = require('./ProjectDetails/ProjectDetailsHeader');
var ProjectOverview = require('./ProjectDetails/ProjectOverview');

var StoreStatuses = AppConstants.StoreStatuses;
var ViewModes = AppConstants.ViewModes;


var ProjectDetailsContainer = React.createClass({
    mixins: [Router.State],
    getInitialState: function(){
        return {
            project: null,
            parentComponent: null,
            mode: ViewModes.VIEW_MODE,
            nrOfChanges: 0,
            portfolioId: 1600
        }
    },
    /* MANAGE STORE CHANGES*/
    componentDidMount: function(){
        PortfolioStore.addChangeListener(this._onChange);
        this._loadPortfolio(this.state.portfolioId);
    },
    componentWillUnmount: function(){
        PortfolioStore.removeChangeListener(this._onChange);
    },
    _onChange: function(){
        if(PortfolioStore.getStatus() === StoreStatuses.UP_TO_DATE || PortfolioStore.getStatus() === StoreStatuses.MODIFIED) {
            this.setState({
                project: PortfolioStore.getProject(this.getParams().projectId),
                parentComponent: PortfolioStore.getParent(this.getParams().projectId)
            })
        }
    },
    /* MANAGE STORE CHANGES*/

    /* HANDLE APP STATES CHANGES*/
    _loadPortfolio: function(portfolioId){
        if(PortfolioStore.getStatus() === StoreStatuses.EMPTY) {
            ViewActionCreator.loadPortfolio(portfolioId);
        }else if(PortfolioStore.getCurrentPortfolioId() !== portfolioId){
            console.log("PortfolioStore.getCurrentPortfolioId() !== portfolioId");
        }
    },

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


    render:function(){
        var project= this.state.project;
        var parentComponent= this.state.parentComponent;
        var mode= this.state.mode;
        var nrOfChanges= this.state.nrOfChanges;
        console.log("PDC: "+PortfolioStore.getStatus());
        var viewToShow;
        if(PortfolioStore.getStatus() === StoreStatuses.EMPTY || PortfolioStore.getStatus() === StoreStatuses.WAITING_FOR_DATA){
            viewToShow=(
                <div>Loading...</div>
            );
        } else {
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
                        <Tab label="Overview">
                            <div className="container-fluid">
                                <ProjectOverview
                                    project={project}
                                    mode={mode}
                                    handleProjectChange={this.handleProjectChange}
                                    ></ProjectOverview>
                            </div>
                        </Tab>
                        <Tab label="Evaluation" >
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
                        <Tab label="Recommendations" >
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
                        <Tab label="Stakeholders" >
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
                        <Tab label="Schedule" >
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
                        <Tab label="Financial" >
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