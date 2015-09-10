var React = require('react');

var AppConstants = require('../../../constants/AppConstants');
var StatesTypes = AppConstants.StatesTypes;

var ProcessStateDraggable = require('./ProcessStateDraggable');

var mui = require('material-ui');
var Paper = mui.Paper;
var TextField = mui.TextField;
var Avatar = mui.Avatar;

var FlatButton = mui.FlatButton;

var ReactDnD = require('react-dnd');
var HTML5Backend = require('react-dnd/modules/backends/HTML5');


var ProcessDetailsDnD = React.createClass({
    getInitialState: function() {
        return {
            states: this.props.process.states,
            statesExpanded:false,
        };
    },
    propTypes: function () {
        return {
            process: React.PropTypes.object.isRequired,
            mode: React.PropTypes.string.isRequired,
            handleProcessChange: React.PropTypes.func.isRequired
        };
    },
    compareStates: function(state1, state2){
        return state1.sequenceNumber - state2.sequenceNumber;
    },

    swapStates: function(id1, id2) {
        var states = this.state.states;

        var state1 = states.filter(function(s){return s.stateId === id1})[0];
        var state2 = states.filter(function(s){return s.stateId === id2})[0];
        var state1Order = state1.sequenceNumber;
        state1.sequenceNumber = state2.sequenceNumber;
        state2.sequenceNumber = state1Order;

        states.sort(this.compareStates);

        this.setState({
            states: states
        });
    },
    _expandCollapseStates: function(){
        this.setState({
            statesExpanded: !this.state.statesExpanded
        });
    },
    render:function(){
        var mode = this.props.mode;
        var process = this.props.process;
        var states = this.state.states;

        states.sort(this.compareStates);

        var statesBlocks = states.map(function(state, i) {
            return (
                <ProcessStateDraggable
                    key={state.stateId}
                    id={state.stateId}
                    text={state.name}
                    swapStates={this.swapStates}

                    state={state}
                    mode={mode}
                    handleProcessChange={this.props.handleProcessChange}
                    ></ProcessStateDraggable>
            );
        }, this);
        var statesList;
        if(this.state.statesExpanded){
            statesList=(
                <div className="col-sm-12">
                    <ul>{statesBlocks}</ul>
                </div>
            );
        }
        return (
            <Paper zDepth={1} className="row"
                   style={{marginBottom:15,
                        borderWidth:4,borderColor:"#BDBDBD", borderStyle:"solid"}}>
                <h2 className="col-sm-5">{process.name}</h2>
                <div className="col-sm-5">
                    <TextField
                        value={process.description}
                        floatingLabelText="Description:"
                        fullWidth={true}
                        multiLine={true}
                        disabled={true}
                        />
                </div>
                <FlatButton className="col-sm-2" onClick={this._expandCollapseStates}
                            label={"Show states"} secondary={true} />
                {statesList}

            </Paper>
        )
    }

});
module.exports = ReactDnD.DragDropContext(HTML5Backend)(ProcessDetailsDnD);
