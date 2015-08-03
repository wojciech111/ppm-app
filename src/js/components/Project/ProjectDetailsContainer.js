var React = require('react');
var Router = require('react-router');

var portfolioStore = require('../../stores/portfolioStore');
var appActions = require('../../actions/appActions');
var viewModes = require('../../constants/viewModes');

var mui = require('material-ui');
var Tabs = mui.Tabs;
var Tab = mui.Tab;

var ModeChanger = require('../Utils/ModeChanger');
var ProjectDetailsHeader = require('./ProjectDetails/ProjectDetailsHeader');
var ProjectOverview = require('./ProjectDetails/ProjectOverview');


var ProjectDetailsContainer = React.createClass({
    mixins: [Router.State],
    getInitialState: function(){
        return {
            project: portfolioStore.getProject(this.getParams().projectId),
            parentComponent: portfolioStore.getParent(this.getParams().projectId),
            mode: viewModes.VIEW_MODE,
            nrOfChanges: 0
        }
    },
    /* MANAGE STORE CHANGES*/
    componentDidMount: function(){
        portfolioStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
        portfolioStore.removeChangeListener(this._onChange);
    },
    _onChange: function(){
        this.setState({
            project: portfolioStore.getProject(this.getParams().projectId),
            parentComponent: portfolioStore.getParent(this.getParams().projectId)
        })
    },
    /* MANAGE STORE CHANGES*/

    /* HANDLE APP STATES CHANGES*/

    _handleProjectUpdate: function(changedProject){
        appActions.updateComponent(changedProject);
    },
    /* HANDLE APP STATES CHANGES*/
    /* VIEW MODE CHANGES*/
    changeToEditMode: function(){
        this.setState({
            mode: viewModes.EDIT_MODE
        });
    },
    changeToViewModeWithSave: function(){
        this._handleProjectUpdate(this.state.project);
        this.setState({
            mode: viewModes.VIEW_MODE,
            nrOfChanges: 0
        });
    },
    changeToViewModeWithCancel: function(){
        this.setState({
            mode: viewModes.VIEW_MODE,
            project: portfolioStore.getProject(this.getParams().projectId),
            nrOfChanges: 0
        });
    },
    /* VIEW MODE CHANGES*/
    /*HELPERS     */
    handleProjectChange: function(project){
        this.setState({
            project: project,
            nrOfChanges: this.state.nrOfChanges+1
        })

    },
    /*HELPERS     */


    render:function(){
        var project= this.state.project;
        var parentComponent= this.state.parentComponent;
        var mode= this.state.mode;
        var nrOfChanges= this.state.nrOfChanges;
        //console.log("PDC: "+project.description);
        return (
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
        )
    }

});

module.exports = ProjectDetailsContainer;