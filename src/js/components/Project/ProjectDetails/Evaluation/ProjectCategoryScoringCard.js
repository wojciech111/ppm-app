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
        var avatar=(<Avatar>{"X"}</Avatar>);

        for(var c=0; c<categoryMembership.category.categoryEvaluations.length;c++){
            var categoryEvaluation = categoryMembership.category.categoryEvaluations[c];
            scoringCriteria.push(
                <ModefulScoringCriterion project={project}
                                         categoryEvaluation={categoryEvaluation}
                                         mode={this.props.mode}
                                         handleProjectChange={this.props.handleProjectChange}
                                         key={categoryEvaluation.scoringCriterion.scoringCriterionId}>
                </ModefulScoringCriterion>
            );
        }
        var percentageOfSupport = (
            <List className="col-sm-4">
                <ListItem key={1}
                          primaryText={"Percentage of support"}
                          leftAvatar={avatar}
                          secondaryText={categoryMembership.percentageOfSupport+"%"}
                          disabled={true}>
                </ListItem>
            </List>
        );
        var overallScore =(
            <List className="col-sm-4">
                <ListItem key={1}
                          primaryText={"Overall score"}
                          leftAvatar={avatar}
                          secondaryText={categoryMembership.overallScore}
                          disabled={true}>
                </ListItem>
            </List>
        );
        var rankInCategory =(
            <List className="col-sm-4">
                <ListItem key={1}
                          primaryText={"Rank in category"}
                          leftAvatar={avatar}
                          secondaryText={"#"+categoryMembership.rankInCategory}
                          disabled={true}>
                </ListItem>
            </List>
        );
        return (
            <div>
                <h1>{categoryMembership.category.name}</h1>
                {percentageOfSupport}
                {overallScore}
                {rankInCategory}
                <div>
                    {scoringCriteria}
                </div>
            </div>
        )
    }

});

module.exports = ProjectCategoryScoringCard;