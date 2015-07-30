var React = require('react');
var viewModes = require('../../../constants/viewModes');


var mui = require('material-ui');
var Avatar = mui.Avatar;
var List = mui.List;
var ListItem = mui.ListItem;
var TextField = mui.TextField;
var ModefulTextField = require('../../Forms/ModefulTextField')



var ProjectDetailsHeader = React.createClass({
    propTypes: function () {
        return {
            project: React.PropTypes.object.isRequired,
            parentComponent : React.PropTypes.object,
            mode: React.PropTypes.string.isRequired,
            handleProjectChange: React.PropTypes.func.isRequired
        };
    },

    render:function(){
        var project= this.props.project;
        var parentComponent =  this.props.parentComponent;
        var mode = this.props.mode;

        var projectProgramSubheader;
        if(parentComponent !== null && parentComponent.componentType === "PROGRAM"){
            projectProgramSubheader = (<h4>This project is part of <b>{parentComponent.name}</b> program</h4>);
        } else {
            projectProgramSubheader = (<h4>Don't have parent program. Go to Program page to change this.</h4>);
        }

        var categories=[];
        project.categoryMemberships.map(function(categoryMembership) {
            //console.log(categoryMembership.category.name);
            var avatar;
            if(categoryMembership.rankInCategory){
                avatar=(<Avatar>#{categoryMembership.rankInCategory}</Avatar>);
            } else {
                avatar=(<Avatar>#N</Avatar>);
            }
            var secondaryText;
            if(categoryMembership.percentageOfSupport){
                secondaryText="Support in "+categoryMembership.percentageOfSupport+"%";
            } else {
                secondaryText="Support in 100%";
            }
            categories.push(
                <ListItem key={categoryMembership.category.categoryId}
                          primaryText={categoryMembership.category.name}
                          leftAvatar={avatar}
                          secondaryText={secondaryText}
                          disabled={true}>
                </ListItem>
            );
        });



        return (
            <div className="row">
                <div className="col-sm-8">
                    {projectProgramSubheader}
                    <h1><b>
                        <ModefulTextField object={project}
                                          mode={mode}
                                          keyOfValue="name"
                                          labelText="Project name"
                                          showLabelInView={false}
                                          hintText="Name of this project"
                                          handleChange={this.props.handleProjectChange}
                            >
                    </ModefulTextField>
                    </b></h1>
                    <h4>(ID: {project.componentId})</h4>
                </div>
                <div className="col-sm-4">
                    <List  subheader="Supported categories:" style={{marginTop:5}}>
                        {categories}
                    </List>
                </div>
            </div>
        )
    }

});

module.exports = ProjectDetailsHeader;