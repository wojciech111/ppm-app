var React = require('react');
var objectAssign = require('react/lib/Object.assign');
//Router
var Router = require('react-router');
var State = Router.State;
var Link = Router.Link;
//routes names
var routes_names = require('../../../config/routes_names');

var AppConstants = require('../../../constants/AppConstants');
var ViewModes = AppConstants.ViewModes;
var DecisionStates = AppConstants.DecisionStates;
var DecisionTypes = AppConstants.DecisionTypes;


var ViewActionCreator = require('../../../actions/ViewActionCreator');

var mui = require('material-ui');
var Paper = mui.Paper;
var Avatar = mui.Avatar;
var List = mui.List;
var ListItem = mui.ListItem;
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var FlatButton = mui.FlatButton;
var SelectField = mui.SelectField;


var ModefulProject = React.createClass({
    mixins: [State],
    propTypes: function () {
        return {
            project: React.PropTypes.object,
            mode: React.PropTypes.string.isRequired,
            keyOfSort: React.PropTypes.string,
            nameOfSort: React.PropTypes.string,
            showedData: React.PropTypes.array,
            handleProjectChange: React.PropTypes.func.isRequired
        };
    },

    render:function(){
        var project= this.props.project;

        var contentBlock="No content";
        if(this.props.mode === ViewModes.VIEW_MODE || this.props.mode === ViewModes.DECISION_MODE){
            //VIEW
            var headerBlock;
            var bodyBlock;
            var sortedByBlock;

            headerBlock=(
                <div className="col-sm-12">
                    <div className="row" style={{marginTop:10}}>
                        <h4 className="col-sm-4">{project.code}</h4>
                        <h4 className="col-sm-8"><b>
                            <Link to={routes_names.PROJECT_DETAILS} params={{projectId: project.componentId,
                            portfolioId: this.getParams().portfolioId}}>
                                {project.name}
                            </Link>
                        </b></h4>
                    </div>
                </div>
            );

            //BODY BLOCK
            bodyBlock=(
                <div className="col-sm-12">
                    <h4>Move project from a to b</h4>
                </div>
            );

            if(project[this.props.keyOfSort]) {
                sortedByBlock = (
                    <h5>{this.props.nameOfSort}: {project[this.props.keyOfSort]}</h5>
                );
            }
            //CONTENT
            contentBlock = (
                <div className="row">
                    <div className="col-sm-12">
                        {headerBlock}
                    </div>
                    <div className="col-sm-8" style={{marginBottom:10}}>
                        {bodyBlock}
                    </div>
                    <div className="col-sm-4">
                        {sortedByBlock}
                    </div>
                </div>
            );

        }

        return (

            <div className="col-sm-12">
                <div className="row">
                    <Paper zDepth={2}  className="col-sm-12"
                           style={{marginBottom:15}}>
                        {contentBlock}
                    </Paper>
                </div>
            </div>

        )
    }

});

module.exports = ModefulProject;