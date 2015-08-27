var React = require('react');



var mui = require('material-ui');
var Paper = mui.Paper;
var Avatar = mui.Avatar;
var List = mui.List;
var ListItem = mui.ListItem;


var ModefulScoringCriterion = React.createClass({
    propTypes: function () {
        return {
            project: React.PropTypes.object.isRequired,
            categoryEvaluation: React.PropTypes.object.isRequired,
            mode: React.PropTypes.string.isRequired,
            handleProjectChange: React.PropTypes.func.isRequired
        };
    },
    render:function(){
        var project= this.props.project;
        var categoryEvaluation = this.props.categoryEvaluation;

        var avatar=(<Avatar>{"X"}</Avatar>);

        return (
            <div>
                <div className="row">
                    <p className="col-sm-6">{categoryEvaluation.scoringCriterion.code} ({categoryEvaluation.scoringCriterion.name})</p>
                    <p className="col-sm-1">{categoryEvaluation.isKey == "Y" ? "KEY" : "n"}</p>
                    <p  className="col-sm-1">weight: {categoryEvaluation.weight ? categoryEvaluation.weight:"0.0"}</p>
                </div>
                <div className="row">
                    <p>Description: {categoryEvaluation.scoringCriterion.description}</p>
                    <p>Question: {categoryEvaluation.scoringCriterion.question}</p>
                    <p>{categoryEvaluation.scoringCriterion.bestIs} is better</p>
                    <p>Score range: {categoryEvaluation.scoringCriterion.minScore} - {categoryEvaluation.scoringCriterion.maxScore}</p>
                </div>

            </div>
        )
    }

});

module.exports = ModefulScoringCriterion;