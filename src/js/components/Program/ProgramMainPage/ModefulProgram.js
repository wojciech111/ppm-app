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
var ModefulProject = require('../../Project/ProjectMainPage/ModefulProject');

var mui = require('material-ui');
var Paper = mui.Paper;
var Avatar = mui.Avatar;
var List = mui.List;
var ListItem = mui.ListItem;
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var FlatButton = mui.FlatButton;
var SelectField = mui.SelectField;


var ModefulProgram = React.createClass({
    mixins: [State],
    propTypes: function () {
        return {
            program: React.PropTypes.object,
            mode: React.PropTypes.string.isRequired,
            keyOfSort: React.PropTypes.string,
            nameOfSort: React.PropTypes.string,
            showedData: React.PropTypes.array,
            handleProgramChange: React.PropTypes.func.isRequired
        };
    },

    render:function(){
        var program= this.props.program;

        var contentBlock="No content";
        if(this.props.mode === ViewModes.VIEW_MODE){
            //VIEW
            var nameBlock;
            var projectsBlocks=[];


            //NAME BLOCK
            if(program[this.props.keyOfSort]) {
                var sortedByText =this.props.nameOfSort+": "+program[this.props.keyOfSort];
            }
            var avatar;
            if(program.overallPriority) {
                avatar = (<Avatar>#{program.overallPriority}</Avatar>);
            } else {
                avatar = (<Avatar>#N</Avatar>);
            }
            nameBlock=(
                <div className="col-sm-12">
                    <div className="row" style={{paddingTop:10,paddingBottom:10}}>
                        <div className="col-sm-1">{avatar}</div>
                        <h4 className="col-sm-2">{program.code}</h4>
                        <h4 className="col-sm-6"><b>
                                {program.name}
                        </b></h4>
                        <p className="col-sm-3">{sortedByText}</p>
                    </div>
                </div>
            );
            for(var i=0;i<program.children.length;i++){
                if(program.children[i].componentType === "PROJECT") {
                    projectsBlocks.push(
                        <ModefulProject
                            key={program.children[i].componentId}
                            project={program.children[i]}
                            mode={this.props.mode}
                            keyOfSort={this.props.keyOfSort}
                            nameOfSort={this.props.nameOfSort}
                            showedData={this.props.showedData}
                            handleProjectChange={this.props.handleProjectChange}
                            ></ModefulProject>
                    );
                }

            };

        }

        return (

            <div className="col-sm-12">
                <div className="row">
                    <Paper zDepth={2}  className="col-sm-12"
                           style={{marginBottom:15}}>
                        {nameBlock}
                        <div className="row">
                            <div className="col-sm-11 col-sm-offset-1">
                                {projectsBlocks}
                            </div>
                        </div>
                    </Paper>
                </div>
            </div>

        )
    }

});

module.exports = ModefulProgram;