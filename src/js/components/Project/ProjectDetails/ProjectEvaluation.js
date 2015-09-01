var React = require('react');



var mui = require('material-ui');
var Paper = mui.Paper;
var DatePicker = mui.DatePicker;
var Avatar = mui.Avatar;
var List = mui.List;
var ListItem = mui.ListItem;

var ProjectCategoryScoringCard = require('./Evaluation/ProjectCategoryScoringCard');


var ProjectEvaluation = React.createClass({
    propTypes: function () {
        return {
            project: React.PropTypes.object.isRequired,
            mode: React.PropTypes.string.isRequired,
            handleProjectChange: React.PropTypes.func.isRequired
        };
    },
    render:function(){
        var project= this.props.project;
        var mode = this.props.mode;
        //console.log("EVAL: ");
        //console.log(project.categoryMemberships);
        var categories=[];
        for(var c=0; c<project.categoryMemberships.length;c++){
            categories.push(
                    <Paper zDepth={1} className="row" key={project.categoryMemberships[c].category.categoryId}>
                        <ProjectCategoryScoringCard project={project}
                                                    categoryMembership={project.categoryMemberships[c]}
                                                    mode={mode}
                                                    handleProjectChange={this.props.handleProjectChange}
                                                    >
                        </ProjectCategoryScoringCard>
                    </Paper>
            );
        }
        return (
            <div>


                        {categories}

            </div>
        )
    }

});

module.exports = ProjectEvaluation;