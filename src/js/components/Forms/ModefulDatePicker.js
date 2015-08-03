var React = require('react');
var viewModes = require('../../constants/viewModes');

var objectAssign = require('react/lib/Object.assign');


var mui = require('material-ui');
var DatePicker = mui.DatePicker;
var Avatar = mui.Avatar;
var List = mui.List;
var ListItem = mui.ListItem;


var ModefulDatePicker = React.createClass({
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
            dateValue: ""
        }
    },

    _handleDateChange: function(tmp,date) {
        //console.log(date);
        if(date && date !== this.props.object[this.props.keyOfValue]) {
            var object = objectAssign({}, this.props.object);
            object[this.props.keyOfValue] = this._dateFormat(date);
            this.props.handleChange(object);
        };
        this.setState({
            dateValue: this._dateFormat(date)
        });
    },
    _dateFormat(date) {
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var y = date.getFullYear();
        return `${d}/${m}/${y}`;
    },

    /*_handleTextFieldBlur: function(e) {
        //console.log("save value: "+e.target.value+" to key: "+this.props.keyOfValue);
        if(this.state.textFieldValue && this.state.textFieldValue !== this.props.object[this.props.keyOfValue]) {
            var object = objectAssign({}, this.props.object);
            object[this.props.keyOfValue] = e.target.value;
            this.props.handleChange(object);
        }
    },*/
    render:function(){
        var mode = this.props.mode;
        //console.log("a: "+this.props.object[this.props.keyOfValue]);
        //console.log("b: "+this.state.dateValue);



        var result;
        if(mode === viewModes.VIEW_MODE) {
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

        }else if(mode === viewModes.EDIT_MODE) {
            var defaultDate;
            if (this.props.object[this.props.keyOfValue]) {
                var dateArr = this.props.object[this.props.keyOfValue].split("/");
                defaultDate = new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
            }
            result = <DatePicker
                defaultDate={defaultDate}
                onChange={this._handleDateChange}
                fullWidth={true}
                autoOk={false}
                showYearSelector={true}
                mode="landscape"
                floatingLabelText={this.props.labelText}
                hintText={this.props.hintText}
                formatDate={this._dateFormat}
                />;
        };


        return (
            <div>
                {result}
            </div>
        )
    }

});

module.exports = ModefulDatePicker;