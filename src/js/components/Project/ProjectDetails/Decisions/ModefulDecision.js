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
        var decision= this.props.decision;
        var selectDecisionStateItems=
            [{id:DecisionStates.PROPOSITION,name:"Proposition"},
                {id:DecisionStates.RECOMMENDATION,name:"Recommendation"},
                {id:DecisionStates.DEFINITIVE,name:"Approved decision"},
                {id:DecisionStates.EXECUTED,name:"Executed decision"},];


        var selectDecisionTypeItems=
            [{id:DecisionTypes.APPROVE,name:"Move forward",title:"Move project to next stage"},
                {id:DecisionTypes.DELAY,name:"Delayed",title:"Delay project"},
                {id:DecisionTypes.CANCEL,name:"Canceled",title:"Cancel project"}];

        var contentBlock="No content";
        var borderColor="gray";

        if(this.props.mode === ViewModes.CREATION_MODE){
            //CREATION
            var headerBlock;
            var motivationBlock;
            var asideBlock;


            //HEADER BLOCK
            var decisionStateBlock;
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
            var decisionTypeBlock;
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
            headerBlock=(
                <div className="row">
                    <div className="col-sm-4">
                        <div className="row">
                            <div className="col-sm-12">
                                {decisionStateBlock}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <h2 style={{textAlign:"center"}}>
                            Create decision
                        </h2>
                    </div>
                    <div className="col-sm-4">
                        <div className="row">
                            <div className="col-sm-12">
                                {decisionTypeBlock}
                            </div>
                        </div>
                    </div>
                </div>
            );

            //MOTIVATION BLOCK
            motivationBlock = <TextField
                defaultValue={this.props.motivation}
                onChange={this.props.handleMotivationChange}
                onBlur={this._handleMotivationBlur}
                floatingLabelText="Decision motivation:"
                fullWidth={true}
                multiLine={true}
                />;
            contentBlock=(
                <div className="row">
                    <div className="col-sm-12">
                        {headerBlock}
                        {motivationBlock}
                    </div>
                </div>
            );
        }else if(this.props.mode === ViewModes.VIEW_MODE){
            //VIEW
            var headerBlock;
            var motivationBlock;
            var asideBlock;
            //HEADER BLOCK
            var decisionStateName;
            for(var i=0;i<selectDecisionStateItems.length;i++){
                if(selectDecisionStateItems[i].id===decision.stateOfDecision){
                    decisionStateName=selectDecisionStateItems[i].name.toUpperCase();
                }
            }
            var decisionTitle;
            for(var i=0;i<selectDecisionTypeItems.length;i++){
                if(selectDecisionTypeItems[i].id===decision.typeOfDecision){
                    decisionTitle=selectDecisionTypeItems[i].title;
                }
            }
            headerBlock=(
                <div className="col-sm-12">
                    <div className="row" style={{marginTop:10}}>
                        <h4 className="col-sm-6">{decisionStateName}</h4>
                        <h4 className="col-sm-6">{decisionTitle}</h4>
                    </div>
                </div>
            );

            //MOTIVATION BLOCK
            if(this.props.decision.motivation) {
                motivationBlock = (
                    <div>
                        <h6>Motivation:</h6>

                        <p>{this.props.decision.motivation}</p>
                    </div>
                );
            }
            var createdByText;
            if(decision.employeeWhoProposed) {
                createdByText = decision.employeeWhoProposed.firstName + " " + decision.employeeWhoProposed.secondName;
            }
            asideBlock=(
                <div className="row" style={{marginTop:10}}>
                    <p className="col-sm-12">Decision ID: <b>{decision.decisionId}</b></p>
                    <p className="col-sm-12">Appeared: <b>{decision.dateOfApperance}</b></p>
                    <p className="col-sm-12">Updated: <b>{decision.lastUpdateDate}</b></p>
                    <p className="col-sm-12">
                        {decision.dateOfSettlement?"Executed: ":"Not executed"}
                        <b>{decision.dateOfSettlement}</b>
                    </p>
                    <p className="col-sm-12">Created by: <b>{createdByText}</b></p>
                </div>
            );
            contentBlock=(
                <div className="row">
                    <div className="col-sm-8">
                        {headerBlock}
                        {motivationBlock}
                    </div>
                    <div className="col-sm-4">
                        {asideBlock}
                    </div>
                </div>
            );
            if(decision.typeOfDecision===DecisionTypes.APPROVE){
                borderColor="green";
            }else if(decision.typeOfDecision===DecisionTypes.DELAY){
                borderColor="yellow";
            }else if(decision.typeOfDecision===DecisionTypes.CANCEL){
                borderColor="red";
            }
        }

    return (

            <div className="col-sm-12">
                <div className="row">
                    <h4 className="col-sm-2">{decision?decision.lastUpdateDate:"dd/mm/yyyy"}</h4>
                    <Paper zDepth={2}  className="col-sm-10"
                           style={{marginBottom:15, backgroundColor:"rgba(255,255,255,0.9)",
                            borderWidth:4,borderColor:borderColor, borderStyle:"solid"}}>
                        {contentBlock}
                    </Paper>
                </div>
            </div>

        )
    }

});

module.exports = ModefulDecision;