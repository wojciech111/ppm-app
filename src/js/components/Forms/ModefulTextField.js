var React = require('react');
var viewModes = require('../../constants/viewModes');

var objectAssign = require('react/lib/Object.assign');


var mui = require('material-ui');
var TextField = mui.TextField;



var ModefulTextField = React.createClass({
    propTypes: function () {
        return {
            object: React.PropTypes.object.isRequired,
            mode: React.PropTypes.string.isRequired,
            keyOfValue: React.PropTypes.string.isRequired,
            labelText: React.PropTypes.string,
            showLabelInView: React.PropTypes.bool,
            hintText: React.PropTypes.string,
            handleChange: React.PropTypes.func.isRequired
        };
    },
    getDefaultProps: function() {
        return{
            showLabelInView:true
        }
    },
    getInitialState: function(){
        return {
            textFieldValue: ""
        }
    },

    _handleTextFieldChange: function(e) {
        this.setState({
            textFieldValue: e.target.value
        });
    },
    _handleTextFieldBlur: function(e) {
        //console.log("save value: "+e.target.value+" to key: "+this.props.keyOfValue);
        var object =objectAssign({}, this.props.object);
        object[this.props.keyOfValue]=e.target.value;
        this.props.handleChange(object);
    },
    render:function(){
        var mode = this.props.mode;
        //console.log(this.state.textFieldValue);



        var result;
        if(mode === viewModes.VIEW_MODE){
            if(this.props.showLabelInView) {
                result = <span>{this.props.labelText + ": " + this.props.object[this.props.keyOfValue]}</span>;
            } else {
                result = <span>{this.props.object[this.props.keyOfValue]}</span>;
            }
        }else if(mode === viewModes.EDIT_MODE){
            result = <TextField
                defaultValue={this.props.object[this.props.keyOfValue]}
                onChange={this._handleTextFieldChange}
                onBlur={this._handleTextFieldBlur}
                floatingLabelText={this.props.labelText}
                hintText={this.props.hintText}
                fullWidth={true}/>;
        };


        return (
            <div>
                {result}
            </div>
        )
    }

});

module.exports = ModefulTextField;