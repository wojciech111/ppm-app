var React = require('react');
var Router = require('react-router');
var AppStore = require('../../stores/PortfolioStore');

var mui = require('material-ui');
var Tabs = mui.Tabs;
var Tab = mui.Tab;

var ProjectDetailsHeader = require('./ProjectDetails/ProjectDetailsHeader');


var ProjectDetails = React.createClass({
    mixins: [Router.State],
    render:function(){
        var projectId = this.getParams().projectId;
        //var project= AppStore.getProject(projectId);
        return (
            <div>
                <div>
                    <ProjectDetailsHeader projectId={projectId}></ProjectDetailsHeader>
                </div>
                <Tabs>
                    <Tab label="Overview" >
                        <div>
                            <h2 >Tab One Template Example</h2>
                            <p>
                                This is an example of a tab template!
                            </p>
                            <p>
                                You can put any sort of HTML or react component in here.
                            </p>
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

module.exports = ProjectDetails;