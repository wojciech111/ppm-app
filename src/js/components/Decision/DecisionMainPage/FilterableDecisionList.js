var React = require('react');

var AppConstants = require('../../../constants/AppConstants');
var StatesTypes = AppConstants.StatesTypes;

var ModefulDecision = require('./ModefulDecision');

var mui = require('material-ui');
var Paper = mui.Paper;
var TextField = mui.TextField;

var RaisedButton = mui.RaisedButton;



var FilterableDecisionList = React.createClass({
    propTypes: function () {
        return {
            decisions: React.PropTypes.object.isRequired,
            mode: React.PropTypes.string.isRequired,
            handleDecisionChange: React.PropTypes.func.isRequired
        };
    },
    render:function(){
        var mode = this.props.mode;
        var decisions = this.props.decisions;

        var decisionsBlocks=[];
        function sortByKey(array, key) {
            return array.sort(function(a, b) {
                var x = a[key]; var y = b[key];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }
        sortByKey(decisions,"decisionId");

        for(var i=0;i<decisions.length;i++){
            decisionsBlocks.push(
                <ModefulDecision
                    key={decisions[i].decisionId}
                    decision={decisions[i]}
                    mode={mode}
                    handleDecisionChange={this.props.handleDecisionChange}
                    ></ModefulDecision>
            );

        };
        return (
            <div>
                <div className="row">
                    <h1 className="col-sm-12">Decisions</h1>
                    <div className="col-sm-12">{decisionsBlocks}</div>
                </div>
            </div>
        )
    }

});

module.exports = FilterableDecisionList;