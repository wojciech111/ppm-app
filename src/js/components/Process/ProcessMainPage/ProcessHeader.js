var React = require('react');

var AppConstants = require('../../../constants/AppConstants');
var StatesTypes = AppConstants.StatesTypes;

var mui = require('material-ui');
var Paper = mui.Paper;
var DatePicker = mui.DatePicker;
var Avatar = mui.Avatar;
var List = mui.List;
var ListItem = mui.ListItem;



var ProcessHeader = React.createClass({
    propTypes: function () {
        return {
            defaultProgramProcess: React.PropTypes.object.isRequired,
            defaultProjectProcess: React.PropTypes.object.isRequired,
            mode: React.PropTypes.string.isRequired,
        };
    },
    render:function(){
        var mode = this.props.mode;
        var defaultProgram = this.props.defaultProgramProcess;
        var defaultProject = this.props.defaultProjectProcess;
        var avatarPg=(<Avatar>Pg</Avatar>);
        var avatarPj=(<Avatar>Pj</Avatar>);

        return (
                <div className="row">
                    <div className="col-sm-6">
                        <List>
                            <ListItem key={1}
                                      primaryText={defaultProgram}
                                      leftAvatar={avatarPg}
                                      secondaryText="Default program process"
                                      disabled={true}>
                            </ListItem>
                        </List>
                    </div>
                    <div className="col-sm-6">
                        <List>
                            <ListItem key={1}
                                      primaryText={defaultProject}
                                      leftAvatar={avatarPj}
                                      secondaryText="Default project process"
                                      disabled={true}>
                            </ListItem>
                        </List>
                    </div>
                </div>
        )
    }

});

module.exports = ProcessHeader;