var React = require('react/addons');
var Router = require('react-router');
var AppStore = require('../../stores/AppStore');
var mui = require('material-ui');
var Tabs = mui.Tabs;
var Tab = mui.Tab;


var ProjectDetails = React.createClass({
    mixins: [Router.State],
    render:function(){
        var projectId = this.getParams().projectId;
        //var project= AppStore.getProject(projectId);
        return (
            <div>
                <div>ProjectDetails {projectId}</div>
                <Tabs>
                    <Tab label="Item One" >
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
                    <Tab label="Item Two" >
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