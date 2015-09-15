var React = require('react');
var objectAssign = require('react/lib/Object.assign');


var AppConstants = require('../../../constants/AppConstants');
var ViewModes = AppConstants.ViewModes;
var DecisionStates = AppConstants.DecisionStates;
var DecisionTypes = AppConstants.DecisionTypes;


var ViewActionCreator = require('../../../actions/ViewActionCreator');

var mui = require('material-ui');
var Paper = mui.Paper;
var Avatar = mui.Avatar;
var List = mui.List;
var ListItem = mui.ListItem;
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var FlatButton = mui.FlatButton;
var SelectField = mui.SelectField;


var ModefulDecision = React.createClass({
    propTypes: function () {
        return {
            project: React.PropTypes.object,
            decision: React.PropTypes.object,
            mode: React.PropTypes.string.isRequired,
            expanded: React.PropTypes.bool.isRequired,
            keyOfSort: React.PropTypes.string,
            nameOfSort: React.PropTypes.string,
            handleDecisionChange: React.PropTypes.func.isRequired
        };
    },
    getInitialState: function(){
        return {
            motivation:this.props.decision.motivation
        }
    },
    _handleMotivationChange: function(e) {
        this.setState({
            motivation: e.target.value
        });
    },
    _getDecision:function(){
        var decision = objectAssign({}, this.props.decision);
        decision.motivation=this.state.motivation;
        decision.project = null;
        return decision;
    },
    _handleRecommend: function(e) {
        var decision=this._getDecision();
        decision.stateOfDecision=DecisionStates.RECOMMENDATION;
        var componentId=this.props.decision.project.componentId;
        this.props.handleDecisionChange(componentId,decision);
    },
    _handleApprove: function(e) {
        var decision=this._getDecision();
        decision.stateOfDecision=DecisionStates.APPROVED;
        var componentId=this.props.decision.project.componentId;
        this.props.handleDecisionChange(componentId,decision);
    },
    _handleExecute: function(e) {
        var decision=this._getDecision();
        decision.stateOfDecision=DecisionStates.EXECUTED;
        var componentId=this.props.decision.project.componentId;
        this.props.handleDecisionChange(componentId,decision);
    },
    _handleDiscard: function(e) {
        var decision=this._getDecision();
        decision.stateOfDecision=DecisionStates.DISCARDED;
        var componentId=this.props.decision.project.componentId;
        this.props.handleDecisionChange(componentId,decision);
    },
    _handleArchive: function(e) {
        var decision=this._getDecision();
        decision.stateOfDecision=DecisionStates.ARCHIVED;
        var componentId=this.props.decision.project.componentId;
        this.props.handleDecisionChange(componentId,decision);
    },

    _handleSave: function(e) {
        var decision=this._getDecision();
        var componentId=this.props.decision.project.componentId;
        this.props.handleDecisionChange(componentId,decision);
    },



    render:function(){
        var project= this.props.project;
        var decision= this.props.decision;
        var selectDecisionStateItems=
            [{id:DecisionStates.PROPOSITION,name:"Proposition"},
                {id:DecisionStates.RECOMMENDATION,name:"Recommendation"},
                {id:DecisionStates.APPROVED,name:"Approved decision"},
                {id:DecisionStates.EXECUTED,name:"Executed decision"},
                {id:DecisionStates.DISCARDED,name:"Discarded decision"},
                {id:DecisionStates.ARCHIVED,name:"Archived decision"}];


        var selectDecisionTypeItems=
            [{id:DecisionTypes.APPROVE,name:"Move forward",title:"Move project to next stage"},
                {id:DecisionTypes.DELAY,name:"Delayed",title:"Delay project"},
                {id:DecisionTypes.CANCEL,name:"Canceled",title:"Cancel project"}];

        var contentBlock="No content";
        var borderColor="gray";
        var stateBgColor="gray";
        var bgColor="rgba(255,255,255,0.9)";
        var borderWidth=4;
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
        }else if(this.props.mode === ViewModes.VIEW_MODE || this.props.mode === ViewModes.DECISION_MODE){
            //VIEW
            var headerBlock;
            var bodyBlock;
            var motivationBlock;
            var asideBlock;

            if(decision.typeOfDecision===DecisionTypes.APPROVE){
                borderColor="green";
            }else if(decision.typeOfDecision===DecisionTypes.DELAY){
                borderColor="yellow";
                stateBgColor="rgba(255,255,0,0.6)";
            }else if(decision.typeOfDecision===DecisionTypes.CANCEL){
                borderColor="red";
                stateBgColor="rgba(255,0,0,0.6)";
            }

            if(decision.executionDate ||
                decision.discardDate ) {
                borderWidth=10;
            }
            if(decision.stateOfDecision === DecisionStates.ARCHIVED) {
                bgColor="rgba(0,0,0,0.2)";
            }
            //HEADER BLOCK
            var decisionStateName;
            for(var i=0;i<selectDecisionStateItems.length;i++){
                if(selectDecisionStateItems[i].id===decision.stateOfDecision){
                    decisionStateName=selectDecisionStateItems[i].name.toUpperCase();
                }
            }
            var decisionTitle;
            if(decision.project){
                decisionTitle=(<b>{decision.project.name}</b>);
            }else {
                for (var i = 0; i < selectDecisionTypeItems.length; i++) {
                    if (selectDecisionTypeItems[i].id === decision.typeOfDecision) {
                        decisionTitle = selectDecisionTypeItems[i].title;
                    }
                }
            }
            headerBlock=(
                <div className="col-sm-12">
                    <div className="row" style={{marginTop:10}}>
                        <h4 className="col-sm-4">{decisionStateName}</h4>
                        <h4 className="col-sm-8">{decisionTitle}</h4>
                    </div>
                </div>
            );

            //BODY BLOCK
            if(decision.project) {
                var fromStateBlock;
                var toStateBlock;
                var fromState=decision.fromState;
                var toState=decision.toState;
                fromStateBlock=(
                    <span style={{ padding:10,
                            backgroundColor:"rgba("+fromState.colorRed+","+fromState.colorGreen+","+fromState.colorBlue+",0.3)"}}>
                        {fromState.sequenceNumber} {fromState.name}
                    </span>
                );
                if(decision.typeOfDecision===DecisionTypes.APPROVE) {
                    toStateBlock = (
                        <span style={{ padding:10,
                            backgroundColor:"rgba("+toState.colorRed+","+toState.colorGreen+","+toState.colorBlue+",0.3)"}}>
                        {toState.sequenceNumber} {toState.name}
                    </span>
                    );
                }else {
                    for (var i = 0; i < selectDecisionTypeItems.length; i++) {
                        if (selectDecisionTypeItems[i].id === decision.typeOfDecision) {
                            var toText = selectDecisionTypeItems[i].name;
                        }
                    }
                    toStateBlock = (
                        <span style={{ padding:10,
                            backgroundColor:stateBgColor}}>
                        {toText}
                    </span>
                    );
                }
                bodyBlock=(
                    <div className="col-sm-12">
                        <h4>Move project from {fromStateBlock} to {toStateBlock}</h4>
                    </div>
                );
            }
            //MOTIVATION BLOCK
            if(this.props.mode === ViewModes.VIEW_MODE) {
                //VIEW MODE
                if (this.state.motivation) {
                    motivationBlock = (
                        <div>
                            <h6>Motivation:</h6>

                            <p style={{textAlign: "justify"}}>{this.state.motivation}</p>
                        </div>
                    );
                }
            }else if(this.props.mode === ViewModes.DECISION_MODE) {
                //DECISION MODE
                var isDisabled=false;
                if(decision.stateOfDecision === DecisionStates.ARCHIVED) {
                    isDisabled=true;
                }
                motivationBlock = <TextField
                    defaultValue={this.state.motivation}
                    onChange={this._handleMotivationChange}
                    onBlur={this._handleMotivationBlur}
                    floatingLabelText="Decision motivation:"
                    fullWidth={true}
                    multiLine={true}
                    disabled={isDisabled}
                    />;

            }
            //ASIDE BLOCK
            var buttonsBlock;
            if(this.props.mode === ViewModes.DECISION_MODE) {
                var recommendBtn;
                var approveBtn;
                var executeBtn;
                var discardBtn;
                var archiveBtn;
                var saveBtn;


                if(decision.stateOfDecision === DecisionStates.PROPOSITION) {
                    recommendBtn = (<RaisedButton label={"Recommend"}
                                                  style={{width:"100%", marginBottom:5}}
                                                  primary={true} onClick={this._handleRecommend} />);
                }
                if(decision.stateOfDecision === DecisionStates.PROPOSITION ||
                    decision.stateOfDecision === DecisionStates.RECOMMENDATION) {
                    approveBtn = (<RaisedButton label={"Approve"}
                                                style={{width:"100%", marginBottom:5}}
                                                primary={true} onClick={this._handleApprove} />);
                }
                if(decision.stateOfDecision === DecisionStates.PROPOSITION ||
                    decision.stateOfDecision === DecisionStates.RECOMMENDATION ||
                    decision.stateOfDecision === DecisionStates.APPROVED) {
                    executeBtn = (<RaisedButton label={"Execute"}
                                                style={{width:"100%", marginBottom:5}}
                                                primary={true} onClick={this._handleExecute} />);
                }
                if(decision.stateOfDecision === DecisionStates.PROPOSITION ||
                    decision.stateOfDecision === DecisionStates.RECOMMENDATION ||
                    decision.stateOfDecision === DecisionStates.APPROVED) {
                    discardBtn = (<FlatButton label={"Discard"}
                                              style={{width:"100%", marginBottom:5}}
                                              secondary={true} onClick={this._handleDiscard} />);
                }
                if ((decision.stateOfDecision === DecisionStates.EXECUTED ||
                    decision.stateOfDecision === DecisionStates.DISCARDED) &&
                    decision.stateOfDecision !== DecisionStates.ARCHIVED){
                    archiveBtn = (<FlatButton label={"Archive"}
                                              style={{width:"100%", marginBottom:5}}
                                              secondary={true} onClick={this._handleArchive} />);
                }
                if(this.state.motivation !== this.props.decision.motivation) {
                    saveBtn = (<FlatButton label={"Save"}
                                           style={{width:"100%", marginBottom:5}}
                                           primary={true} onClick={this._handleSave}/>);
                }
                buttonsBlock=(
                    <div className="row">
                        <div className="col-sm-6">
                            {recommendBtn}
                            {approveBtn}
                            {executeBtn}
                        </div>
                        <div className="col-sm-6">
                            {discardBtn}
                            {archiveBtn}
                            {saveBtn}
                        </div>
                    </div>
                );
            }
            var createdByText;
            if(decision.employeeWhoProposed) {
                createdByText = "("+decision.employeeWhoProposed.firstName + " " + decision.employeeWhoProposed.secondName+")";
            }
            asideBlock=(
                <div className="row" style={{marginTop:10}}>
                    <div className="col-sm-12">{buttonsBlock}</div>
                    <p className="col-sm-12">Decision ID: <b>{decision.decisionId}</b></p>
                    <p className="col-sm-12">Updated: <b>{decision.lastUpdateDate}</b> {createdByText}</p>
                    <p className="col-sm-12">Proposed: <b>{decision.createDate}</b> {createdByText}</p>
                    <p className="col-sm-12">
                        {decision.recommendationDate?"Recommended: ":"Not Recommended"}
                        <b>{decision.recommendationDate}</b> {createdByText}
                    </p>
                    <p className="col-sm-12">
                        {decision.approveDate?"Approved: ":"Not Approved"}
                        <b>{decision.approveDate}</b> {createdByText}
                    </p>
                    <p className="col-sm-12">
                        {decision.executionDate?"Executed: ":"Not Executed"}
                        <b>{decision.executionDate}</b> {createdByText}
                    </p>
                    <p className="col-sm-12">
                        {decision.discardDate?"Discarded: ":""}
                        <b>{decision.discardDate}</b> {createdByText}
                    </p>
                </div>
            );
            if(decision[this.props.keyOfSort]) {
                var sortedByDateBlock = (
                    <h5>{this.props.nameOfSort}: {decision[this.props.keyOfSort]}</h5>
                );
            }
            //CONTENT
            if(this.props.expanded || this.props.mode === ViewModes.EDIT_MODE ||
                this.props.mode === ViewModes.DECISION_MODE) {
                contentBlock = (
                    <div className="row">
                        <div className="col-sm-8">
                            {headerBlock}
                            {bodyBlock}
                            {motivationBlock}
                        </div>
                        <div className="col-sm-4">
                            {asideBlock}
                        </div>
                    </div>
                );
            } else {
                contentBlock = (
                    <div className="row">
                        <div className="col-sm-12">
                            {headerBlock}
                        </div>
                        <div className="col-sm-8" style={{marginBottom:10}}>
                            {bodyBlock}
                        </div>
                        <div className="col-sm-4">
                            {sortedByDateBlock}
                        </div>
                    </div>
                );
            }
        }

        return (

            <div className="col-sm-12">
                <div className="row">
                    <Paper zDepth={2}  className="col-sm-12"
                           style={{marginBottom:15, backgroundColor:bgColor,
                            borderWidth:borderWidth,borderColor:borderColor, borderStyle:"solid"}}>
                        {contentBlock}
                    </Paper>
                </div>
            </div>

        )
    }

});

module.exports = ModefulDecision;