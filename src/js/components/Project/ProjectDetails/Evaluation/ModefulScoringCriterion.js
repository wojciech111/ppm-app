var React = require('react');

var AppConstants = require('../../../../constants/AppConstants');
var ViewModes = AppConstants.ViewModes;


var ViewActionCreator = require('../../../../actions/ViewActionCreator');

var mui = require('material-ui');
var Paper = mui.Paper;
var Avatar = mui.Avatar;
var List = mui.List;
var ListItem = mui.ListItem;
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;


var ModefulScoringCriterion = React.createClass({
    propTypes: function () {
        return {
            project: React.PropTypes.object.isRequired,
            categoryEvaluation: React.PropTypes.object.isRequired,
            score: React.PropTypes.object,
            mode: React.PropTypes.string.isRequired,
            handleProjectChange: React.PropTypes.func.isRequired
        };
    },
    getInitialState: function(){
        return {
            score: (this.props.score?this.props.score.score:null),
            answer: (this.props.score?this.props.score.answer:null),
            motivation: (this.props.score?this.props.score.motivation:null),
        }
    },
    _handleCreateScore: function (){
        ViewActionCreator.createScore(this.props.project.componentId,
            this.props.categoryEvaluation.scoringCriterion.scoringCriterionId);
    },
    _handleScoreChange: function(e) {
        this.setState({
            score: e.target.value
        });
    },
     _handleAnswerChange: function(e) {
        this.setState({
            answer: e.target.value
        });
    },
      _handleMotivationChange: function(e) {
        this.setState({
            motivation: e.target.value
        });
    },
    _handleScoreBlur: function(e) {
        console.log("!!save value: "+e.target.value+" to scoringCriterionId: "+this.props.score.scoresPK.scoringCriterionId);
        if(this.state.score && this.state.score !== this.props.score.score) {
            //var object = objectAssign({}, this.props.project);
            //object[this.props.keyOfValue] = e.target.value;
            var project = this.props.project;
            for(var i=0;i<project.scores.length;i++){
                if(project.scores[i].scoresPK.scoringCriterionId === this.props.score.scoresPK.scoringCriterionId){
                    project.scores[i].score=this.state.score;
                }
            }
            this.props.handleProjectChange(project);
        }
    },
     _handleAnswerBlur: function(e) {
        console.log("!!save value: "+e.target.value+" to scoringCriterionId: "+this.props.score.scoresPK.scoringCriterionId);
        if(this.state.answer && this.state.answer !== this.props.score.answer) {
            //var object = objectAssign({}, this.props.project);
            //object[this.props.keyOfValue] = e.target.value;
            var project = this.props.project;
            for(var i=0;i<project.scores.length;i++){
                if(project.scores[i].scoresPK.scoringCriterionId === this.props.score.scoresPK.scoringCriterionId){
                    project.scores[i].answer=this.state.answer;
                }
            }
            this.props.handleProjectChange(project);
        }
    },
     _handleMotivationBlur: function(e) {
        console.log("!!save value: "+e.target.value+" to scoringCriterionId: "+this.props.score.scoresPK.scoringCriterionId);
        if(this.state.motivation && this.state.motivation !== this.props.score.motivation) {
            //var object = objectAssign({}, this.props.project);
            //object[this.props.keyOfValue] = e.target.value;
            var project = this.props.project;
            for(var i=0;i<project.scores.length;i++){
                if(project.scores[i].scoresPK.scoringCriterionId === this.props.score.scoresPK.scoringCriterionId){
                    project.scores[i].motivation=this.state.motivation;
                }
            }
            this.props.handleProjectChange(project);
        }
    },
    render:function(){
        var project= this.props.project;
        var categoryEvaluation = this.props.categoryEvaluation;
        var score = this.props.score;
        var scoreBlock;
        if(this.props.mode === ViewModes.EDIT_MODE ){
            if(score === null ){
                scoreBlock=<RaisedButton label="Create score" primary={true} onClick={this._handleCreateScore}/>;
            } else {
                scoreBlock = <TextField
                    defaultValue={score.score}
                    onChange={this._handleScoreChange}
                    onBlur={this._handleScoreBlur}
                    floatingLabelText="Score"
                    hintText="Score in this criterion"
                    fullWidth={true}
                    />;
            }
        } else if(this.props.mode === ViewModes.VIEW_MODE ){
            scoreBlock=<h1>{score?score.score:"N/N"}</h1>;
        }


        var questionBlock;
        if(this.props.mode === ViewModes.EDIT_MODE ){
            if(score === null ){
                questionBlock=<RaisedButton label="Create score" primary={true} onClick={this._handleCreateScore}/>;
            } else {
                questionBlock = <TextField
                    defaultValue={score.answer}
                    onChange={this._handleAnswerChange}
                    onBlur={this._handleAnswerBlur}
                    floatingLabelText={categoryEvaluation.scoringCriterion.question}
                    fullWidth={true}
                    multiLine={true}
                    />;
            }
        } else if(this.props.mode === ViewModes.VIEW_MODE ){
            if(score === null ){
                questionBlock="";
            } else {
                questionBlock = <TextField
                    value={score.answer}
                    floatingLabelText={categoryEvaluation.scoringCriterion.question}
                    fullWidth={true}
                    multiLine={true}
                    disabled={true}
                    />;
            }
        }


        var motivationBlock;
        if(this.props.mode === ViewModes.EDIT_MODE ){
            if(score === null ){
                motivationBlock=<RaisedButton label="Create score" primary={true} onClick={this._handleCreateScore}/>;
            } else {
                motivationBlock = <TextField
                    defaultValue={score.motivation}
                    onChange={this._handleMotivationChange}
                    onBlur={this._handleMotivationBlur}
                    floatingLabelText="Score motivation:"
                    fullWidth={true}
                    multiLine={true}
                    />;
            }
        } else if(this.props.mode === ViewModes.VIEW_MODE ){
            if(score === null ){
                motivationBlock="";
            } else {
                motivationBlock = <TextField
                    value={score.motivation}
                    floatingLabelText="Score motivation:"
                    fullWidth={true}
                    multiLine={true}
                    disabled={true}
                    />;
            }
        }

        var description=(
            <TextField
                value={categoryEvaluation.scoringCriterion.description}
                floatingLabelText="Criterion description:"
                fullWidth={true}
                multiLine={true}
                disabled={true}
                />
        );
        return (

            <Paper zDepth={3} className="col-sm-12 col-md-6" style={{marginBottom:25}}>
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
                                {scoreBlock}
                            </div>
                        </div>
                    </Paper>
                </div>
                <div className="row">
                    <div  className="col-sm-7">
                        {description}
                        {questionBlock}
                    </div>
                    <div  className="col-sm-5">
                        {motivationBlock}
                    </div>
                </div>

            </Paper>
        )
    }

});

module.exports = ModefulScoringCriterion;