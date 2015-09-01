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
        var states=[];
        var tmpState=null;
        for(var i=0; i<process.states.length;i++){
            if(process.states[i].stateType=== StatesTypes.BEGIN){
                tmpState=process.states[i];
                break;
            }
        }
        var isCurrentState=false;
        var i=1;
        do{
            //console.log(tmpState.name);
            if(tmpState.stateId === project.state.stateId){
                isCurrentState=true;
            }
            states.push(
                <Paper zDepth={1} className="row" key={tmpState.stateId}>
                    <ProjectStateDecisions project={project}
                                                state={tmpState}
                                                isCurrentState={isCurrentState}
                                                mode={mode}
                                                handleProjectChange={this.props.handleProjectChange}
                                           number={i}
                        >
                    </ProjectStateDecisions>
                </Paper>
            );
            isCurrentState=false;
            tmpState=tmpState.nextState;
            i++;
        }while(tmpState.nextState!==null);
        return (
            <div>
                <Paper zDepth={1} className="row" key={1}>
                    <h1 className="col-sm-4">{process.name}</h1>
                    <p className="col-sm-8" style={{marginTop:25}}>{process.description}</p>
                </Paper>

                {states}

            </div>
        )
    }

});

module.exports = ProjectDecisions;