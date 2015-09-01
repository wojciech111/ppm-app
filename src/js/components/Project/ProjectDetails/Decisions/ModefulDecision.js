var React = require('react');

var AppConstants = require('../../../../constants/AppConstants');
var ViewModes = AppConstants.ViewModes;
var DecisionStates = AppConstants.DecisionStates;


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
            handleProjectChange: React.PropTypes.func.isRequired
        };
    },
    getInitialState: function(){
        return {
            decisionState: DecisionStates.PROPOSITION,
        }
    },
    _handleSelectChange: function(){
        return {
            decisionState: DecisionStates.PROPOSITION,
        }
    },
    render:function(){
        var project= this.props.project;
        var mode= this.props.mode;
        var selectDecisionStateItems=
            [{id:DecisionStates.PROPOSITION,name:"Proposition"},
                {id:DecisionStates.RECOMMENDATION,name:"Recommendation"},
                {id:DecisionStates.DEFINITIVE,name:"Definitive"},
                {id:DecisionStates.EXECUTED,name:"Executed"},];
        var decisionStateBlock;
        if(mode === ViewModes.CREATION_MODE) {
            decisionStateBlock=(
                <SelectField
                    fullWidth={true}
                    value={this.state.decisionState}
                    onChange={this._handleSelectChange}
                    floatingLabelText="Status of decision:"
                    valueMember="id"
                    displayMember="name"
                    menuItems={selectDecisionStateItems}
                    />
            );
        }
        return (

            <Paper zDepth={2} className="col-sm-12 col-md-6" style={{marginBottom:25}}>
                <div className="row">
                    <div className="col-sm-7">
                        ABCD
                    </div>
                    <div className="col-sm-5">
                        <div className="row">
                            <div className="col-sm-12">
                                {decisionStateBlock}
                            </div>
                        </div>
                    </div>

                 </div>
            </Paper>
        )
    }

});

module.exports = ModefulDecision;