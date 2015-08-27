var React = require('react');



var mui = require('material-ui');
var Paper = mui.Paper;
var Avatar = mui.Avatar;
var List = mui.List;
var ListItem = mui.ListItem;
var TextField = mui.TextField;


var ModefulScoringCriterion = React.createClass({
    propTypes: function () {
        return {
            project: React.PropTypes.object.isRequired,
            categoryEvaluation: React.PropTypes.object.isRequired,
            score: React.PropTypes.object.isRequired,
            mode: React.PropTypes.string.isRequired,
            handleProjectChange: React.PropTypes.func.isRequired
        };
    },
    render:function(){
        var project= this.props.project;
        var categoryEvaluation = this.props.categoryEvaluation;
        var score = this.props.score;

        var description=(
            <TextField
                value={categoryEvaluation.scoringCriterion.description}
                floatingLabelText="Criterion description:"
                fullWidth={true}
                multiLine={true}
                disabled={true}
                />
        );
        var question="";
        if(categoryEvaluation.scoringCriterion.question) {
            question = (
                <TextField
                    value={score.answer}
                    floatingLabelText={categoryEvaluation.scoringCriterion.question}
                    fullWidth={true}
                    multiLine={true}
                    disabled={true}
                    />
            );
        }
        var motivation=(
            <TextField
                value={score.motivation}
                floatingLabelText="Score motivation:"
                fullWidth={true}
                multiLine={true}
                disabled={true}
                />
        );
        return (

            <Paper zDepth={1} className="col-sm-12">
                <div className="row">
                    <h3 className="col-sm-4">{categoryEvaluation.scoringCriterion.code}</h3>
                    <h4  className="col-sm-4" style={{marginTop:25}}>Weight in overall score: {categoryEvaluation.weight ? categoryEvaluation.weight:"0.0"}</h4>
                    <h4 className="col-sm-4" style={{marginTop:25}}>{categoryEvaluation.isKey == "Y" ? "Is key criterion" : "Isn't key criterion"}</h4>
                </div>
                <div className="row">
                    <h1  className="col-sm-7">{categoryEvaluation.scoringCriterion.name}</h1>
                    <Paper zDepth={2}  className="col-sm-5" style={{paddingTop:10}}>
                        <div className="row">
                            <div  className="col-sm-5">
                                <p>{categoryEvaluation.scoringCriterion.bestIs} is better</p>
                                <p>{categoryEvaluation.scoringCriterion.minScore?"Min: "+categoryEvaluation.scoringCriterion.minScore:"No minimum"}</p>
                                <p>{categoryEvaluation.scoringCriterion.maxScore?"Max: "+categoryEvaluation.scoringCriterion.maxScore:"No maximum"}</p>
                            </div>
                            <div  className="col-sm-7">
                                <h1>{score.score}</h1>
                            </div>
                        </div>
                    </Paper>
                </div>
                <div className="row">
                    <div  className="col-sm-7">
                        {description}
                        {question}
                    </div>
                    <div  className="col-sm-5">
                        {motivation}
                    </div>
                </div>

            </Paper>
        )
    }

});

module.exports = ModefulScoringCriterion;