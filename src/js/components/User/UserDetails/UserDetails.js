var React = require('react');



var mui = require('material-ui');
var Avatar = mui.Avatar;
var List = mui.List;
var ListItem = mui.ListItem;
var TextField = mui.TextField;

var ModefulTextField = require('../../Commons/Forms/ModefulTextField');




var UserDetails = React.createClass({
    propTypes: function () {
        return {
            user: React.PropTypes.object.isRequired,
            mode: React.PropTypes.string.isRequired,
            handleUserChange: React.PropTypes.func.isRequired
        };
    },

    render:function(){
        var user= this.props.user;
        var mode = this.props.mode;







        return (
            <div className="row">
                <div className="col-sm-12">
                    <h1><b>
                        <ModefulTextField object={user}
                                          mode={mode}
                                          keyOfValue="username"
                                          labelText="User name:"
                                          showLabelInView={false}
                                          hintText="Name of user"
                                          handleChange={this.props.handleUserChange}
                                          maxLength={150}
                            >
                        </ModefulTextField>
                    </b></h1>
                    <h4>(ID: {user.userId})</h4>
                    <h1><b>
                        <ModefulTextField object={user}
                                          mode={mode}
                                          keyOfValue="email"
                                          labelText="Email:"
                                          showLabelInView={false}
                                          hintText="Email"
                                          handleChange={this.props.handleUserChange}
                                          maxLength={150}
                            >
                        </ModefulTextField>
                    </b></h1>
                    <h1><b>
                        <ModefulTextField object={user}
                                          mode={mode}
                                          keyOfValue="password"
                                          labelText="Password:"
                                          showLabelInView={false}
                                          hintText="Password"
                                          handleChange={this.props.handleUserChange}
                                          maxLength={150}
                            >
                        </ModefulTextField>
                    </b></h1>

                </div>

            </div>
        )
    }

});

module.exports = UserDetails;