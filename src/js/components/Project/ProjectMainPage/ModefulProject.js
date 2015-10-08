var React = require('react');
var objectAssign = require('react/lib/Object.assign');
//Router
var Router = require('react-router');
var State = Router.State;
var Link = Router.Link;
//routes names
var routes_names = require('../../../config/routes_names');

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


var ModefulProject = React.createClass({
    mixins: [State],
    propTypes: function () {
        return {
            project: React.PropTypes.object,
            mode: React.PropTypes.string.isRequired,
            keyOfSort: React.PropTypes.string,
            nameOfSort: React.PropTypes.string,
            showedData: React.PropTypes.array,
            handleProjectChange: React.PropTypes.func.isRequired
        };
    },

    render:function(){
        var project= this.props.project;

        var contentBlock="No content";
        if(this.props.mode === ViewModes.VIEW_MODE){
            //VIEW
            var nameBlock;
            var stateBlock;
            var datesBlock;
            var healthBlock;
            var categoriesBlock;
            var peopleBlock;


            //NAME BLOCK
            if(project[this.props.keyOfSort]) {
                var sortedByText =this.props.nameOfSort+": "+project[this.props.keyOfSort];
            }
            var avatar;
            if(project.overallPriority) {
                avatar = (<Avatar>#{project.overallPriority}</Avatar>);
            } else {
                avatar = (<Avatar>#N</Avatar>);
            }
            nameBlock=(
                <div className="col-sm-12">
                    <div className="row" style={{paddingTop:10,paddingBottom:10}}>
                        <div className="col-sm-1">{avatar}</div>
                        <h4 className="col-sm-2">{project.code}</h4>
                        <h4 className="col-sm-6"><b>
                            <Link to={routes_names.PROJECT_DETAILS} params={{projectId: project.componentId,
                            portfolioId: this.getParams().portfolioId}}>
                                {project.name}
                            </Link>
                        </b></h4>
                        <p className="col-sm-3">{sortedByText}</p>
                    </div>
                </div>
            );

            //STATE BLOCK
            var decisions=project.decisions;
            //filter only actual decisions
            decisions=decisions.filter(function (d) {
                if(d.stateOfDecision === DecisionStates.PROPOSITION ||
                d.stateOfDecision === DecisionStates.RECOMMENDATION ||
                d.stateOfDecision === DecisionStates.APPROVED ){
                    return true;
                }
                return false;
            });
            // get approved decision
            var approvedDecision=decisions.filter(function (d) {
                if(d.stateOfDecision === DecisionStates.APPROVED){
                    return true;
                }
                return false;
            });
            approvedDecision=approvedDecision[0];
            // get decisions to proceed
            var proceedDecisions=decisions.filter(function (d) {
                if(d.typeOfDecision === DecisionTypes.APPROVE){
                    return true;
                }
                return false;
            });
            // get decisions to delay
            var delayDecisions=decisions.filter(function (d) {
                if(d.typeOfDecision === DecisionTypes.DELAY){
                    return true;
                }
                return false;
            });
            // get decisions to cancel
            var cancelDecisions=decisions.filter(function (d) {
                if(d.typeOfDecision === DecisionTypes.CANCEL){
                    return true;
                }
                return false;
            });
            var avatarProceed = (<Avatar style={{backgroundColor:"rgba(0,200,0,1)"}}>{proceedDecisions.length}</Avatar>);
            var avatarDelay = (<Avatar style={{backgroundColor:"rgba(200,200,0,1)"}}>{delayDecisions.length}</Avatar>);
            var avatarCancel = (<Avatar style={{backgroundColor:"rgba(200,0,0,1)"}}>{cancelDecisions.length}</Avatar>);
            if(approvedDecision) {
                var text;
                if(approvedDecision.typeOfDecision === DecisionTypes.APPROVE){
                    text="proceed";
                } else if(approvedDecision.typeOfDecision === DecisionTypes.DELAY){
                    text="delay";
                } else if(approvedDecision.typeOfDecision === DecisionTypes.CANCEL){
                    text="cancel";
                }
                var approvedDecisionBlock=(
                    <h5>Approved to {text}</h5>
                );
            }
            stateBlock=(
                <div className="col-sm-12" style={{paddingTop:10,paddingBottom:10,
                backgroundColor:"rgba("+project.state.colorRed+","+project.state.colorGreen+","+project.state.colorBlue+",0.2)"}}>
                    <div className="row">
                        <h4 className="col-sm-4">{project.state.sequenceNumber} {project.state.name}</h4>
                        <div className="col-sm-1">{avatarProceed}</div>
                        <div className="col-sm-1">{avatarDelay}</div>
                        <div className="col-sm-1">{avatarCancel}</div>
                        <div className="col-sm-2">{approvedDecisionBlock}</div>
                    </div>
                </div>
            );
            //DATES BLOCK
            var startBlock=(
                <div className="row">
                    <h5 className="col-sm-12">Start date:</h5>
                    <h4 className="col-sm-12">{project.startDate?project.startDate:"undefined"}</h4>
                </div>
            );
            var endBlock=(
                <div className="row">
                    <h5 className="col-sm-12">End date:</h5>
                    <h4 className="col-sm-12">{project.endDate?project.endDate:"undefined"}</h4>
                </div>
            );
            var deadlineBlock=(
                <div className="row">
                    <h5 className="col-sm-12">Deadline date:</h5>
                    <h4 className="col-sm-12">{project.deadlineDate?project.deadlineDate:"undefined"}</h4>
                </div>
            );
            var creationBlock=(
                <div className="row">
                    <h5 className="col-sm-12">Creation date:</h5>
                    <h4 className="col-sm-12">{project.creationDate?project.creationDate:"undefined"}</h4>
                </div>
            );
            var updateBlock=(
                <div className="row">
                    <h5 className="col-sm-12">Last update:</h5>
                    <h4 className="col-sm-12">{project.updateDate?project.updateDate:"undefined"}</h4>
                </div>
            );
            datesBlock=(
                <div className="col-sm-12" style={{paddingTop:5,paddingBottom:5, textAlign:"center"}}>
                    <div className="row">
                        <div className="col-sm-2">{startBlock}</div>
                        <div className="col-sm-2">{endBlock}</div>
                        <div className="col-sm-2">{deadlineBlock}</div>
                        <div className="col-sm-2 col-sm-offset-2">{creationBlock}</div>
                        <div className="col-sm-2">{updateBlock}</div>

                    </div>
                </div>
            );
            //HEALTH BLOCK
            function createHealthElement(keyOfValue,labelText,possibleItems){
                var value;
                var valueId=project[keyOfValue];
                if(valueId){
                    for (var i = 0; i < possibleItems.length; i++) {
                        if(possibleItems[i].id === valueId){
                            value=possibleItems[i].name;
                        }
                    }
                }else {
                    value="undefined";
                }
                return (
                    <List>
                        <ListItem key={1}
                                  primaryText={labelText}
                                  secondaryText={value}
                                  disabled={true}>
                        </ListItem>
                    </List>
                );
            }
            var healthElement=
                createHealthElement("health","Overall health",[{id:"G",name:"Good"},{id:"B",name:"Below average"},{id:"P",name:"Poor"}]);
            var scopeElement=
                createHealthElement("scope","Scope",[{id:"ON",name:"On target scope"},{id:"OV",name:"Over target scope"},{id:"OF",name:"Off target scope"}]);
            var scheduleElement=
                createHealthElement("schedule","Schedule",[{id:"ON",name:"On plan"},{id:"FA",name:"Faster then planned"},{id:"OF",name:"Off plan"}]);
            var budgetElement=
                createHealthElement("budget","Budget",[{id:"ON",name:"On budget"},{id:"BE",name:"Below planned budget"},{id:"OF",name:"Off budget"}]);
            var aggCost=0;
            for(var i=0;i<project.costs.length;i++){
                aggCost=aggCost+project.costs[i].value;
            }
            var cost=(
                <List>
                    <ListItem key={1}
                              primaryText={"Aggregated cost"}
                              secondaryText={aggCost?aggCost+" $":"0 $"}
                              disabled={true}>
                    </ListItem>
                </List>
            );
            healthBlock=(
                <div className="col-sm-12" style={{paddingTop:5,paddingBottom:5, textAlign:"center"}}>
                    <div className="row">
                        <div className="col-sm-2">{healthElement}</div>
                        <div className="col-sm-2">{scopeElement}</div>
                        <div className="col-sm-2">{scheduleElement}</div>
                        <div className="col-sm-2">{budgetElement}</div>
                        <div className="col-sm-3 col-sm-offset-1">{cost}</div>

                    </div>
                </div>
            );

            //CATEGORIES BLOCK
            var categories=[];
            var blocksWidth=3;
            if(project.categoryMemberships.length < 4){
                blocksWidth=4;
            }
            project.categoryMemberships.map(function(categoryMembership) {
                //console.log(categoryMembership.category.name);
                var avatar;
                if(categoryMembership.rankInCategory){
                    avatar=(<Avatar>#{categoryMembership.rankInCategory}</Avatar>);
                } else {
                    avatar=(<Avatar>#N</Avatar>);
                }
                var secondaryText;
                if(categoryMembership.percentageOfSupport){
                    secondaryText="Support in "+categoryMembership.percentageOfSupport+"%";
                } else {
                    secondaryText="Support in 100%";
                }
                categories.push(
                    <div className={"col-sm-"+blocksWidth}>
                        <ListItem key={categoryMembership.category.categoryId}
                                  primaryText={categoryMembership.category.name}
                                  leftAvatar={avatar}
                                  secondaryText={secondaryText}
                                  disabled={true}>
                        </ListItem>
                    </div>
                );
            });
            categoriesBlock=(
                <div className="col-sm-12" style={{paddingTop:5,paddingBottom:5, textAlign:"center"}}>
                    <div className="row">
                        {categories}
                    </div>
                </div>
            );
            //CONTENT
            contentBlock = (
                <div className="row">
                    {nameBlock}
                    {this.props.showedData.indexOf("STATES") !== -1?stateBlock:""}
                    {this.props.showedData.indexOf("DATES") !== -1?datesBlock:""}
                    {this.props.showedData.indexOf("HEALTH") !== -1?healthBlock:""}
                    {this.props.showedData.indexOf("CATEGORIES") !== -1?categoriesBlock:""}
                </div>
            );

        }

        return (

            <div className="col-sm-12">
                <div className="row">
                    <Paper zDepth={2}  className="col-sm-12"
                           style={{marginBottom:15}}>
                        {contentBlock}
                    </Paper>
                </div>
            </div>

        )
    }

});

module.exports = ModefulProject;