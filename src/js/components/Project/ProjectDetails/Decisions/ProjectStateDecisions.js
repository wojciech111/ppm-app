var React = require('react');

var AppConstants = require('../../../../constants/AppConstants');
var ViewModes = AppConstants.ViewModes;
var DecisionStates = AppConstants.DecisionStates;
var DecisionTypes = AppConstants.DecisionTypes;

var ViewActionCreator = require('../../../../actions/ViewActionCreator');
var ModefulDecision = require('./ModefulDecision');


var mui = require('material-ui');
var Paper = mui.Paper;
var FlatButton = mui.FlatButton;


var ProjectCategoryScoringCard = React.createClass({
    propTypes: function () {
        return {
            project: React.PropTypes.object.isRequired,
            state: React.PropTypes.object.isRequired,
            isCurrentState: React.PropTypes.object.isRequired,
            mode: React.PropTypes.bool.isRequired,
            number: React.PropTypes.number.isRequired,
            handleProjectChange: React.PropTypes.func.isRequired
        };
    },
    getInitialState: function(){
        return {
            isCreatingRecommendation: false,
            newDecisionState: DecisionStates.PROPOSITION,
            newDecisionType: DecisionTypes.APPROVE,
            newMotivation: "",
        }
    },
    handleDecisionStateChange: function(e) {
        this.setState({
            newDecisionState: e.target.value
        });
    },
    handleDecisionTypeChange: function(e) {
        this.setState({
            newDecisionType: e.target.value
        });
    },
    handleMotivationChange: function(e) {
        this.setState({
            newMotivation: e.target.value
        });
    },
    _handleCreateRecommendation: function(){
        this.setState({
            isCreatingRecommendation: true,
        });
    },
    _handleCreateRecommendationSubmit: function(){
        ViewActionCreator.createDecision(
            this.props.project.componentId,
            this.props.state.stateId,
            this.props.state.nextState.stateId,
            this.state.newDecisionState,
            this.state.newDecisionType,
            this.state.newMotivation
        );
        this.setState({
            isCreatingRecommendation: false,
        });
    },
    _handleCreateRecommendationCancel: function(){
        this.setState({
            isCreatingRecommendation: false,
        });
    },

    render:function(){
        var project= this.props.project;
        var state = this.props.state;
        var mode = this.props.mode;
        var isCurrentState = this.props.isCurrentState;
        var isCreatingRecommendation = this.state.isCreatingRecommendation;

        var newRecommendationBlock=null;
        if(isCreatingRecommendation){
            newRecommendationBlock=(
                <Paper zDepth={3}  className="col-sm-12" >
                    <div className="row">
                        <ModefulDecision project={project}
                                        state={state}
                                        mode={ViewModes.CREATION_MODE}
                                        decisionState={this.state.newDecisionState}
                                        decisionType={this.state.newDecisionType}
                                        motivation={this.state.newMotivation}
                                        handleProjectChange={this.props.handleProjectChange}
                                        handleDecisionStateChange={this.handleDecisionStateChange}
                                        handleDecisionTypeChange={this.handleDecisionTypeChange}
                                        handleMotivationChange={this.handleMotivationChange}
                            >
                        </ModefulDecision>
                    </div>
                </Paper>
            );
        }
        var stateStatus=null;
        if(isCurrentState) {
            if(isCreatingRecommendation) {
                stateStatus = (
                    <div>
                        <FlatButton
                            label="Save"
                            primary={true}
                            onTouchTap={this._handleCreateRecommendationSubmit}/>
                         <FlatButton
                            label="Cancel"
                            secondary={true}
                            onTouchTap={this._handleCreateRecommendationCancel}/>
                    </div>
                );
            }else {
                stateStatus = (
                    <FlatButton
                        label="Create recommendation"
                        secondary={true}
                        onTouchTap={this._handleCreateRecommendation}/>
                );
            }
        }else{
            stateStatus = <p>Not yet reached</p>
        }

        var approveDecisions=[];
        var delayDecisions=[];
        var cancelDecisions=[];
        for(var i=0;i<project.decisions.length;i++){
            var decision=project.decisions[i];
            if(decision.fromState.stateId===state.stateId) {
                var decisionBlock = (
                    <ModefulDecision project={project}
                                     state={state}
                                     decision={decision}
                                     mode={mode}
                                     handleProjectChange={this.props.handleProjectChange}
                        >
                    </ModefulDecision>
                );
                if (decision.typeOfDecision === DecisionTypes.APPROVE) {
                    approveDecisions.push(decisionBlock);
                } else if (decision.typeOfDecision === DecisionTypes.DELAY) {
                    delayDecisions.push(decisionBlock);
                } else if (decision.typeOfDecision === DecisionTypes.CANCEL) {
                    cancelDecisions.push(decisionBlock);
                }
            }
        }

        if(approveDecisions.length>0){
            var approveDecisionsBlock=(
                <Paper zDepth={1} className="row" >
                    <p className="col-sm-12">Propositions of changing state to {state.nextState.name}:</p>
                    {approveDecisions}
                </Paper>
            );
        }
        if(delayDecisions.length>0){
            var delayDecisionsBlock=(
                <Paper zDepth={1} className="row" >
                    <p className="col-sm-12">Propositions to delay:</p>
                    {delayDecisions}
                </Paper>
            );
        }
        if(cancelDecisions.length>0){
            var cancelDecisionsBlock=(
                <Paper zDepth={1} className="row" >
                    <p className="col-sm-12">Propositions to cancel:</p>
                    {cancelDecisions}
                </Paper>
            );
        }
        if(!approveDecisions.length>0 && !delayDecisions.length>0 && !cancelDecisions.length>0){
            approveDecisionsBlock=(
                <div className="row" >
                    <h4 className="col-sm-12" style={{textAlign:"center"}} >
                        No propositions in this state
                    </h4>
                </div>
            );
        }

        return (
            <div  className="col-sm-12" >
                <Paper zDepth={1} className="row" style={{ marginBottom:20, marginTop:10}}>
                    <div className="col-sm-12">
                        <div className="row">
                            <h2 className="col-sm-4">{this.props.number} {state.name}</h2>
                            <p className="col-sm-4" style={{marginTop:15}}>{state.description}</p>
                            <div className="col-sm-4" style={{marginTop:10}}>{stateStatus}</div>
                        </div>
                        {newRecommendationBlock}
                    </div>
                    {approveDecisionsBlock}
                    {delayDecisionsBlock}
                    {cancelDecisionsBlock}
                </Paper>
            </div>
        )
    }

});

module.exports = ProjectCategoryScoringCard;