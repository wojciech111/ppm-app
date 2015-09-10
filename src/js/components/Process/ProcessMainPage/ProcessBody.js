var React = require('react');

var AppConstants = require('../../../constants/AppConstants');
var StatesTypes = AppConstants.StatesTypes;

var ProcessDetailsDnD = require('./ProcessDetailsDnD');

var mui = require('material-ui');
var Paper = mui.Paper;
var TextField = mui.TextField;

var RaisedButton = mui.RaisedButton;



var ProcessBody = React.createClass({
    propTypes: function () {
        return {
            processes: React.PropTypes.object.isRequired,
            mode: React.PropTypes.string.isRequired,
            handleProcessChange: React.PropTypes.func.isRequired
        };
    },
    render:function(){
        var mode = this.props.mode;
        var processes = this.props.processes;
        var processesBlocks=[];
        function sortByKey(array, key) {
            return array.sort(function(a, b) {
                var x = a[key]; var y = b[key];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }
        sortByKey(processes,"processId");

        for(var i=0;i<processes.length;i++){
            processesBlocks.push(
                <ProcessDetailsDnD
                    key={processes[i].processId}
                    process={processes[i]}
                    list={processes[i].states}
                    mode={mode}
                    handleProcessChange={this.handleProcessChange}
                    ></ProcessDetailsDnD>
            );

        };
        return (
            <div>
                <Paper zDepth={1} className="row" key={1}>
                    <h1 className="col-sm-12">Available processes</h1>
                    <div className="col-sm-12">{processesBlocks}</div>
                </Paper>
            </div>
        )
    }

});

module.exports = ProcessBody;