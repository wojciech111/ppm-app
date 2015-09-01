var React = require('react');

var ModefulScoringCriterion = require('./ModefulScoringCriterion');


var mui = require('material-ui');
var Paper = mui.Paper;
var Avatar = mui.Avatar;
var List = mui.List;
var ListItem = mui.ListItem;


var ProjectCategoryScoringCard = React.createClass({
    propTypes: function () {
        return {
            project: React.PropTypes.object.isRequired,
            categoryMembership: React.PropTypes.object.isRequired,
            mode: React.PropTypes.string.isRequired,
            handleProjectChange: React.PropTypes.func.isRequired
        };
    },
    render:function(){
        var project= this.props.project;
        var categoryMembership = this.props.categoryMembership;

        var scoringCriteria=[];

        for(var c=0; c<categoryMembership.category.categoryEvaluations.length;c++){
            var categoryEvaluation = categoryMembership.category.categoryEvaluations[c];
            var score=null;
            for(var i=0;i<project.scores.length;i++){
                if(project.scores[i].scoringCriterion.scoringCriterionId === categoryEvaluation.scoringCriterion.scoringCriterionId){
                    score=project.scores[i];

                    break;
                }
            }
            scoringCriteria.push(
                <ModefulScoringCriterion project={project}
                                         categoryEvaluation={categoryEvaluation}
                                         score={score}
                                         mode={this.props.mode}
                                         handleProjectChange={this.props.handleProjectChange}
                                         key={categoryEvaluation.scoringCriterion.scoringCriterionId}>
                </ModefulScoringCriterion>
            );
        }
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
        var primaryText;
        if(categoryMembership.overallScore){
            primaryText=categoryMembership.overallScore;
        } else {
            primaryText="0.00";
        }
        var rankBadge =(
            <List  subheader="Overall score in category:">
                <ListItem key={1}
                          primaryText={primaryText}
                          leftAvatar={avatar}
                          secondaryText={secondaryText}
                          disabled={true}>
                </ListItem>
            </List>
        );
        var percentageOfSupport;
        if(categoryMembership.percentageOfSupport){
            percentageOfSupport=(
                <h5 className="col-sm-7" style={{textAlign:"right", marginTop:30}}>
                    Portfolio support this category in {categoryMembership.percentageOfSupport+"%"}
                </h5>
            );
        } else {
            percentageOfSupport = "";
        }
        return (
            <div  className="col-sm-12" >
                <div  className="row">
                    <div className="col-sm-10 col-sm-offset-1">
                        <Paper zDepth={1} className="row" style={{ marginBottom:20, marginTop:10}}>
                            <div className="col-sm-7">
                                <div className="row">
                                    <h2 className="col-sm-4">{categoryMembership.category.code}</h2>
                                    {percentageOfSupport}
                                </div>
                                <div className="row">
                                    <h1 className="col-sm-12">{categoryMembership.category.name}</h1>
                                </div>
                            </div>
                            <div className="col-sm-5">
                                {rankBadge}
                            </div>
                        </Paper>
                    </div>
                </div>
                <div  className="row">
                    {scoringCriteria}
                </div>
            </div>
        )
    }

});

module.exports = ProjectCategoryScoringCard;