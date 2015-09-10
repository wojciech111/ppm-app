var React = require('react/addons');
var PropTypes  = React.PropTypes ;

var AppConstants = require('../../../constants/AppConstants');
var StatesTypes = AppConstants.StatesTypes;
var ItemTypes = AppConstants.DnDItemTypes;
var ViewModes = AppConstants.ViewModes;

var mui = require('material-ui');
var Paper = mui.Paper;
var TextField = mui.TextField;
var Avatar = mui.Avatar;

var RaisedButton = mui.RaisedButton;

var ReactDnD   = require('react-dnd');

var stateSource = {
    beginDrag: function(props) {
        return { id: props.id };
    },
    canDrag(props) {
        return props.mode===ViewModes.EDIT_MODE;
    }

};

var stateTarget = {
    hover: function(props, monitor) {
        var draggedId = monitor.getItem().id;

        if (draggedId !== props.id) {
            props.swapStates(draggedId, props.id);
        }
    }
};

var ProcessStateDraggable = React.createClass({
    propTypes: function () {
        return {
            connectDragSource: React.PropTypes.func.isRequired,
            connectDropTarget: React.PropTypes.func.isRequired,
            isDragging: React.PropTypes.bool.isRequired,
            id: React.PropTypes.any.isRequired,
            text: React.PropTypes.string.isRequired,
            swapStates: React.PropTypes.func.isRequired,

            state: React.PropTypes.object.isRequired,
            mode: React.PropTypes.string.isRequired,
            handleProcessChange: React.PropTypes.func.isRequired
        };
    },
    render:function(){
        var mode = this.props.mode;
        var state = this.props.state;
        var style = {
            marginBottom: 20,
            cursor:  this.props.mode===ViewModes.EDIT_MODE ? 'move':'auto',
            backgroundColor:"rgba("+state.colorRed+","+state.colorGreen+","+state.colorBlue+",0.2)",
            opacity: this.props.isDragging ? 0 : 1
        };
        return this.props.connectDragSource(this.props.connectDropTarget(
            <div  className="col-sm-12"  key={state.stateId}
                  style={style}>
                <div className="row" style={{ marginBottom:10, marginTop:10}}>
                    <div className="col-sm-12 "  style={{  backgroundColor:"rgba(255,255,255,0.9)"}}>
                        <div className="row">
                            <div className="col-sm-9">
                                <div className="row">
                                    <h2 className="col-sm-12">{state.sequenceNumber} {state.name}</h2>
                                    <div className="col-sm-12">
                                        <p>{state.description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3" >
                                <div className="row">
                                    <h5 className="col-sm-12" style={{marginTop:10}}>Color ({"R:"+state.colorRed+", G:"+state.colorGreen+", B:"+state.colorBlue})</h5>
                                    <h5 className="col-sm-12" style={{marginTop:10}}>Type: {state.stateType}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ));
    }

});
var DragSourceDecorator = ReactDnD.DragSource(ItemTypes.STATE, stateSource,
    function(connect, monitor) {
        return {
            connectDragSource: connect.dragSource(),
            isDragging: monitor.isDragging()
        };
    });

var DropTargetDecorator = ReactDnD.DropTarget(ItemTypes.STATE, stateTarget,
    function(connect) {
        return {
            connectDropTarget: connect.dropTarget()
        };
    });
module.exports = DropTargetDecorator(DragSourceDecorator(ProcessStateDraggable));