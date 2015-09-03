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
var RaisedButton = mui.RaisedButton;


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
                        <RaisedButton
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
                    <RaisedButton
                        label="Create recommendation"
                        secondary={true}
                        onTouchTap={this._handleCreateRecommendation}/>
                );
            }
        }else{
            stateStatus = <p>Not yet reached</p>
        }

        var decisions=[];
        for(var i=0;i<project.decisions.length;i++){
            var decision=project.decisions[i];
            if(decision.fromState.stateId===state.stateId) {
                decisions.push(decision);

            }
        }
        function sortByKey(array, key) {
            return array.sort(function(a, b) {
                var x = a[key]; var y = b[key];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }
        sortByKey(decisions,"lastUpdateDate");

        var decisionBlocks=[];
        for(var i=0;i<decisions.length;i++) {
            var decisionBlock = (
                <ModefulDecision project={project}
                                 state={state}
                                 decision={decisions[i]}
                                 mode={mode}
                                 handleProjectChange={this.props.handleProjectChange}
                                 key={decisions[i].decisionId}
                    >
                </ModefulDecision>
            );
            decisionBlocks.push(decisionBlock);
        }
        if(!decisionBlocks.length>0 ){
            decisionBlocks.push(
                    <h4 className="col-sm-10" style={{textAlign:"center"}} >
                        No decisions in this state
                    </h4>
            );
        }

        return (
            <div  className="col-sm-12"  style={{ marginBottom:20,
                backgroundColor:"rgba("+state.colorRed+","+state.colorGreen+","+state.colorBlue+",0.2)"}}>
                <div className="row" style={{ marginBottom:20, marginTop:10}}>
                    <div className="col-sm-2"  style={{backgroundColor:"rgba(255,255,255,0.0)"}}>
                        <div className="row">
                            <h4 className="col-sm-12">30/08/2015</h4>
                        </div>
                    </div>
                     <div className="col-sm-10 "  style={{  backgroundColor:"rgba(255,255,255,0.7)"}}>
                        <div className="row">
                            <h2 className="col-sm-4">{this.props.number} {state.name}</h2>
                            <p className="col-sm-4" style={{marginTop:15}}>{state.description}</p>
                            <div className="col-sm-4" style={{marginTop:10}}>{stateStatus}</div>
                        </div>
                    </div>
                </div>
                <div className="row" >
                    {newRecommendationBlock}
                    {decisionBlocks}
                </div>
            </div>
        )
    }

});

module.exports = ProjectCategoryScoringCard;