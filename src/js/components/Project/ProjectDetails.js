var React = require('react');
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

            </div>
        )
    }
});

module.exports = ProjectDetails;