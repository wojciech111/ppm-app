var React = require('react');
var viewModes = require('../../constants/viewModes');

var objectAssign = require('react/lib/Object.assign');


var mui = require('material-ui');
var SelectField = mui.SelectField;
var Avatar = mui.Avatar;
var List = mui.List;
var ListItem = mui.ListItem;


var ModefulSelectField = React.createClass({
    propTypes: function () {
        return {
            object: React.PropTypes.object.isRequired,
            mode: React.PropTypes.string.isRequired,
            keyOfValue: React.PropTypes.string.isRequired,
            labelText: React.PropTypes.string,
            showLabelInView: React.PropTypes.bool,
            handleChange: React.PropTypes.func.isRequired,

            menuItems: React.PropTypes.array.isRequired
        };
    },
    getDefaultProps: function() {
        return{
            showLabelInView:true
        }
    },
    getInitialState: function(){
        return {
            selectValue: this.props.object[this.props.keyOfValue]
        }
    },

    _handleSelectChange: function(e) {
        //console.log("save value: "+e.target.value+" to key: "+this.props.keyOfValue);
        if(e.target.value && e.target.value !== this.props.object[this.props.keyOfValue]) {
            var object = objectAssign({}, this.props.object);
            object[this.props.keyOfValue] = e.target.value;
            this.props.handleChange(object);
        };
        this.setState({
            selectValue: e.target.value
        });
    },
    render:function(){
        var mode = this.props.mode;
        //console.log(this.state.selectValue);



        var result;
        if(mode === viewModes.VIEW_MODE) {
            if (this.props.showLabelInView) {
                var avatar=(<Avatar>{this.props.keyOfValue.toUpperCase().slice(0,1)}</Avatar>);
                var value;
                var valueId=this.props.object[this.props.keyOfValue];
                if(valueId){
                    for (var i = 0; i < this.props.menuItems.length; i++) {
                        if(this.props.menuItems[i].id === valueId){
                            value=this.props.menuItems[i].name;
                        }
                    }
                }
                result = (
                    <List>
                        <ListItem key={1}
                                  primaryText={this.props.labelText}
                                  leftAvatar={avatar}
                                  secondaryText={value}
                                  disabled={true}>
                        </ListItem>
                    </List>
                );
            } else {
                result = <p>{this.props.object[this.props.keyOfValue]}</p>;
            }

        }else if(mode === viewModes.EDIT_MODE){
            result = <SelectField
                fullWidth={true}
                value={this.state.selectValue}
                onChange={this._handleSelectChange}
                floatingLabelText={this.props.labelText}
                valueMember="id"
                displayMember="name"
                menuItems={this.props.menuItems}
                />;
        };


        return (
            <div>
                {result}
            </div>
        )
    }

});

module.exports = ModefulSelectField;