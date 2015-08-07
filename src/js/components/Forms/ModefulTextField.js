var React = require('react');
var AppConstants = require('../../constants/AppConstants');
var ViewModes = AppConstants.ViewModes;

var objectAssign = require('react/lib/Object.assign');


var mui = require('material-ui');
var TextField = mui.TextField;
var Avatar = mui.Avatar;
var List = mui.List;
var ListItem = mui.ListItem;


var ModefulTextField = React.createClass({
    propTypes: function () {
        return {
            object: React.PropTypes.object.isRequired,
            mode: React.PropTypes.string.isRequired,
            keyOfValue: React.PropTypes.string.isRequired,
            labelText: React.PropTypes.string,
            showLabelInView: React.PropTypes.bool,
            hintText: React.PropTypes.string,
            handleChange: React.PropTypes.func.isRequired,
            maxLength: React.PropTypes.number,
            multiLine: React.PropTypes.bool,
            article: React.PropTypes.bool,
            disabled: React.PropTypes.bool

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
        if(this.state.textFieldValue && this.state.textFieldValue !== this.props.object[this.props.keyOfValue]) {
            var object = objectAssign({}, this.props.object);
            object[this.props.keyOfValue] = e.target.value;
            this.props.handleChange(object);
        }
    },
    render:function(){
        var mode = this.props.mode;
        //console.log(this.state.textFieldValue);



        var result;
        if(mode === ViewModes.VIEW_MODE) {
            if (this.props.article) {
                result = (<TextField
                        value={this.props.object[this.props.keyOfValue]}
                        onChange={this._handleTextFieldChange}
                        onBlur={this._handleTextFieldBlur}
                        floatingLabelText={this.props.labelText}
                        hintText={this.props.hintText}
                        fullWidth={true}
                        maxLength={this.props.maxLength}
                        multiLine={this.props.multiLine}
                        disabled={true}
                        />
                )
            } else {
                if (this.props.showLabelInView) {
                    var avatar=(<Avatar>{this.props.keyOfValue.toUpperCase().slice(0,1)}</Avatar>);
                    result = (
                        <List>
                            <ListItem key={1}
                                      primaryText={this.props.labelText}
                                      leftAvatar={avatar}
                                      secondaryText={this.props.object[this.props.keyOfValue]}
                                      disabled={true}>
                            </ListItem>
                        </List>
                    );
                } else {
                    result = <p>{this.props.object[this.props.keyOfValue]}</p>;
                }
            }
        }else if(mode === ViewModes.EDIT_MODE){
            result = <TextField
                defaultValue={this.props.object[this.props.keyOfValue]}
                onChange={this._handleTextFieldChange}
                onBlur={this._handleTextFieldBlur}
                floatingLabelText={this.props.labelText}
                hintText={this.props.hintText}
                fullWidth={true}
                maxLength={this.props.maxLength}
                multiLine={this.props.multiLine}
                disabled={this.props.disabled}
                />;
        };


        return (
            <div>
                {result}
            </div>
        )
    }

});

module.exports = ModefulTextField;