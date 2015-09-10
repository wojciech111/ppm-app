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
        var process = project.process;
        var states=project.process.states;
        var statesBlocks=[];
        function sortByKey(array, key) {
            return array.sort(function(a, b) {
                var x = a[key]; var y = b[key];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }
        sortByKey(states,"sequenceNumber");

        var isCurrentState=false;

        for(var i=0; i<states.length;i++){
            if(states[i].stateId === project.state.stateId){
                isCurrentState=true;
            }
            statesBlocks.push(
                <Paper zDepth={1} className="row" key={states[i].stateId}>
                    <ProjectStateDecisions project={project}
                                           state={states[i]}
                                           nextState={states[i+1]}
                                           isCurrentState={isCurrentState}
                                           mode={mode}
                                           handleProjectChange={this.props.handleProjectChange}
                                           number={states[i].sequenceNumber}
                        >
                    </ProjectStateDecisions>
                </Paper>
            );
            isCurrentState=false;
        }
        return (
            <div>
                <Paper zDepth={1} className="row" key={1}>
                    <h1 className="col-sm-6">Process: {process.name}</h1>
                    <p className="col-sm-6" style={{marginTop:25}}>{process.description}</p>
                </Paper>
                {statesBlocks}
            </div>
        )
    }

});

module.exports = ProjectDecisions;