var React = require('react');

var AppConstants = require('../../../../constants/AppConstants');
var ViewModes = AppConstants.ViewModes;

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
            handleProjectChange: React.PropTypes.func.isRequired
        };
    },
    getInitialState: function(){
        return {
            isCreatingRecommendation: false,

        }
    },
    _handleCreateRecommendation: function(){
        this.setState({
            isCreatingRecommendation: true,
        });
    },
    _handleCreateRecommendationSubmit: function(){
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
        var isCurrentState = this.props.isCurrentState;
        var isCreatingRecommendation = this.state.isCreatingRecommendation;

        var newRecommendationBlock=null;
        if(isCreatingRecommendation){
            newRecommendationBlock=(
                <Paper zDepth={3} className="row" >
                    <ModefulDecision project={project}
                                       state={state}
                                       mode={ViewModes.CREATION_MODE}
                                       handleProjectChange={this.props.handleProjectChange}
                        >
                    </ModefulDecision>
                </Paper>
            );
        }
        var stateStatus=null;
        if(isCurrentState) {
            if(isCreatingRecommendation) {
                stateStatus = <p>Recommendation is under construction!</p>
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



        return (
            <div  className="col-sm-12" >
                <Paper zDepth={1} className="row" style={{ marginBottom:20, marginTop:10}}>
                    <div className="col-sm-12">
                        <div className="row">
                            <h2 className="col-sm-4">{state.name}</h2>
                            <p className="col-sm-4" style={{marginTop:15}}>{state.description}</p>
                            <div className="col-sm-4" style={{marginTop:10}}>{stateStatus}</div>
                        </div>
                        {newRecommendationBlock}
                    </div>
                </Paper>
            </div>
        )
    }

});

module.exports = ProjectCategoryScoringCard;