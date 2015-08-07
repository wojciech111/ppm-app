var React = require('react');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var FlatButton = mui.FlatButton;

var AppConstants = require('../../constants/AppConstants');
var ViewModes = AppConstants.ViewModes;






var ModeChanger = React.createClass({
    propTypes: function () {
        return {
            currentMode: React.PropTypes.string.isRequired,
            nrOfChanges: React.PropTypes.string,
            changeToEdit: React.PropTypes.func,
            changeToViewModeWithSave : React.PropTypes.func,
            changeToViewModeWithCancel : React.PropTypes.func
        };
    },
    render:function(){
        var currentMode = this.props.currentMode;
        var nrOfChanges = this.props.nrOfChanges;
        var btn;

        if(currentMode === ViewModes.VIEW_MODE){
            btn = <RaisedButton label="Edit this page" secondary={true} onClick={this.props.changeToEdit}/>;
        } else if(currentMode === ViewModes.EDIT_MODE){
            if(nrOfChanges === 0){
                btn = (
                    <div>
                        <RaisedButton label={"No changes"} primary={true} onClick={this.props.changeToViewModeWithSave} disabled={true}/>
                        <FlatButton label={"Cancel"} secondary={true} onClick={this.props.changeToViewModeWithCancel}/>
                    </div>
                );
            } else if(nrOfChanges === 1){
                btn = (
                    <div>
                        <RaisedButton label={"Save "+nrOfChanges+" change"} primary={true} onClick={this.props.changeToViewModeWithSave} />
                        <FlatButton label={"Cancel"} secondary={true} onClick={this.props.changeToViewModeWithCancel}/>
                    </div>
                );
            } else {
                btn = (
                    <div>
                        <RaisedButton label={"Save "+nrOfChanges+" changes"} primary={true} onClick={this.props.changeToViewModeWithSave} />
                        <FlatButton label={"Cancel"} secondary={true} onClick={this.props.changeToViewModeWithCancel}/>
                    </div>
                );            }

        }
        return (
            <div className="row" >
                <div className="col-sm-4 col-sm-offset-8">
                    {btn}
                </div>
            </div>
        )
    }

});

module.exports = ModeChanger;