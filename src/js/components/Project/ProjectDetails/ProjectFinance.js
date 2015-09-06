var React = require('react');

var AppConstants = require('../../../constants/AppConstants');
var StatesTypes = AppConstants.StatesTypes;

var mui = require('material-ui');
var Paper = mui.Paper;
var DatePicker = mui.DatePicker;
var Avatar = mui.Avatar;
var List = mui.List;
var ListItem = mui.ListItem;

var ProjectStateDecisions = require('./Decisions/ProjectStateDecisions');


var ProjectDecisions = React.createClass({
    propTypes: function () {
        return {
            project: React.PropTypes.object.isRequired,
            mode: React.PropTypes.string.isRequired,
            handleProjectChange: React.PropTypes.func.isRequired
        };
    },
    render:function(){
        var project= this.props.project;
        var mode = this.props.mode;
        var costs = project.costs;
        var costsBlocks=[];
        console.log(project.costs);

        for(var i=0;i<costs.length;i++){
            costsBlocks.push(
                <tr key={costs[i].costId}>
                    <td>
                        {costs[i].costId}
                    </td>
                     <td>
                        {costs[i].name}
                    </td>
                     <td>
                        {costs[i].value+" $"}
                    </td>
                     <td>
                        {costs[i].description}
                    </td>
                     <td>
                        {costs[i].dayOfOccurrence}
                    </td>
                </tr>
            );

        };
        return (
            <div>
                <Paper zDepth={1} className="row" key={1}>
                    <h1 className="col-sm-12">Project costs</h1>
                    <table className="table table-bordered col-sm-12">
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Value
                            </th>
                            <th>
                                Description
                            </th>
                            <th>
                                Day of occurrence
                            </th>
                        </tr>
                        {costsBlocks}
                    </table>
                </Paper>
            </div>
        )
    }

});

module.exports = ProjectDecisions;