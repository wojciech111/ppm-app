var React = require('react');

var AppConstants = require('../../../../constants/AppConstants');
var ViewModes = AppConstants.ViewModes;
var DecisionStates = AppConstants.DecisionStates;
var DecisionTypes = AppConstants.DecisionTypes;


var ViewActionCreator = require('../../../../actions/ViewActionCreator');

var mui = require('material-ui');
var Paper = mui.Paper;
var Avatar = mui.Avatar;
var List = mui.List;
var ListItem = mui.ListItem;
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var SelectField = mui.SelectField;


var ModefulDecision = React.createClass({
    propTypes: function () {
        return {
            project: React.PropTypes.object.isRequired,
            state: React.PropTypes.object.isRequired,
            decision: React.PropTypes.object,
            mode: React.PropTypes.string.isRequired,
            decisionState: React.PropTypes.string,
            decisionType: React.PropTypes.string,
            motivation: React.PropTypes.string,
            handleProjectChange: React.PropTypes.func.isRequired,
            handleDecisionStateChange: React.PropTypes.func,
            handleDecisionTypeChange: React.PropTypes.func,
            handleMotivationChange: React.PropTypes.func
        };
    },
    _handleMotivationBlur: function(e) {
        /*if(this.state.motivation && this.state.motivation !== this.props.score.motivation) {
            var project = this.props.project;
            for(var i=0;i<project.scores.length;i++){
                if(project.scores[i].scoresPK.scoringCriterionId === this.props.score.scoresPK.scoringCriterionId){
                    project.scores[i].motivation=this.state.motivation;
                }
            }
            this.props.handleProjectChange(project);
        }*/
    },
    render:function(){
        var project= this.props.project;
        var mode= this.props.mode;
        var decision= this.props.decision;
        var selectDecisionStateItems=
            [{id:DecisionStates.PROPOSITION,name:"Proposition"},
                {id:DecisionStates.RECOMMENDATION,name:"Recommendation"},
                {id:DecisionStates.DEFINITIVE,name:"Approved decision"},
                {id:DecisionStates.EXECUTED,name:"Executed decision"},];
        var decisionStateBlock;

        var header="";
        if(mode === ViewModes.CREATION_MODE) {
            decisionStateBlock=(
                <SelectField
                    fullWidth={true}
                    value={this.props.decisionState}
                    onChange={this.props.handleDecisionStateChange}
                    floatingLabelText="Status of decision:"
                    valueMember="id"
                    displayMember="name"
                    menuItems={selectDecisionStateItems}
                    />
            );
        }else if(mode === ViewModes.VIEW_MODE) {
            for(var i=0;i<selectDecisionStateItems.length;i++){
                if(selectDecisionStateItems[i].id===decision.stateOfDecision){
                    header=selectDecisionStateItems[i].name;
                }
            }
        }
        var header=header+" about changing state to ";

        var selectDecisionTypeItems=
            [{id:DecisionTypes.APPROVE,name:this.props.state.nextState.name},
                {id:DecisionTypes.DELAY,name:"Delayed"},
                {id:DecisionTypes.CANCEL,name:"Canceled"}];
        var decisionTypeBlock;
        if(mode === ViewModes.CREATION_MODE) {
            decisionTypeBlock=(
                <SelectField
                    fullWidth={true}
                    value={this.props.decisionType}
                    onChange={this.props.handleDecisionTypeChange}
                    floatingLabelText="Change state to:"
                    valueMember="id"
                    displayMember="name"
                    menuItems={selectDecisionTypeItems}
                    />
            );
            header=(
                <div className="row">
                    <div className="col-sm-3">
                        <div className="row">
                            <div className="col-sm-12">
                                {decisionStateBlock}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <h1 style={{textAlign:"center"}}>
                            {header}
                        </h1>
                    </div>
                    <div className="col-sm-3">
                        <div className="row">
                            <div className="col-sm-12">
                                {decisionTypeBlock}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }else if(mode === ViewModes.VIEW_MODE) {
            for(var i=0;i<selectDecisionTypeItems.length;i++){
                if(selectDecisionTypeItems[i].id===decision.typeOfDecision){
                    header=header+selectDecisionTypeItems[i].name;
                }
            }
            header=(<div className="col-sm-12"><h5>{header}</h5></div>);
        }

        var motivationBlock;
        if(this.props.mode === ViewModes.CREATION_MODE ){

            motivationBlock = <TextField
                defaultValue={this.props.motivation}
                onChange={this.props.handleMotivationChange}
                onBlur={this._handleMotivationBlur}
                floatingLabelText="Decision motivation:"
                fullWidth={true}
                multiLine={true}
                />;

        } else if(this.props.mode === ViewModes.VIEW_MODE && this.props.decision.motivation){
            motivationBlock = <TextField
                value={this.props.decision.motivation}
                floatingLabelText="Decision motivation:"
                fullWidth={true}
                multiLine={true}
                disabled={true}
                />;

        }

    return (

            <div className="col-sm-12">
                <div className="row">
                    <h4 className="col-sm-2">22/08/2015</h4>
                    <Paper zDepth={2}  className="col-sm-10"
                           style={{marginBottom:15, backgroundColor:"white",
                            borderWidth:4,borderColor:"green", borderStyle:"solid"}}>
                        {header}
                        <div className="row">
                            <div className="col-sm-8">
                                {motivationBlock}
                            </div>
                            <div className="col-sm-4">
                                Proposed by: Someone Angel
                            </div>
                        </div>
                    </Paper>
                </div>
            </div>

        )
    }

});

module.exports = ModefulDecision;