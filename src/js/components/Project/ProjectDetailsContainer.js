var React = require('react');
var Router = require('react-router');

var portfolioStore = require('../../stores/portfolioStore');
var appActions = require('../../actions/appActions');

var mui = require('material-ui');
var Tabs = mui.Tabs;
var Tab = mui.Tab;

var ProjectDetailsHeader = require('./ProjectDetails/ProjectDetailsHeader');
var ProjectOverview = require('./ProjectDetails/ProjectOverview');


var ProjectDetailsContainer = React.createClass({
    mixins: [Router.State],
    getInitialState: function(){
        return {
            project: portfolioStore.getProject(this.getParams().projectId),
            parentComponent: portfolioStore.getParent(this.getParams().projectId)
        }
    },
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
    handleProjectUpdate: function(changedProject){
        appActions.updateComponent(changedProject);
    },
    render:function(){
        var project= this.state.project;
        var parentComponent= this.state.parentComponent;
        return (
            <div>
                <div className="container-fluid">
                    <ProjectDetailsHeader
                        project={project} parentComponent={parentComponent}
                        ></ProjectDetailsHeader>
                </div>
                <Tabs>
                    <Tab label="Overview">
                        <div className="container-fluid">
                            <ProjectOverview
                                project={project}
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