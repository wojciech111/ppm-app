var React = require('react');



var AppConstants = require('../../../constants/AppConstants');
var StatesTypes = AppConstants.StatesTypes;
var DecisionStates = AppConstants.DecisionStates;
var ViewModes = AppConstants.ViewModes;


var mui = require('material-ui');
var Paper = mui.Paper;
var TextField = mui.TextField;
var FlatButton = mui.FlatButton;

var Toolbar = mui.Toolbar;
var ToolbarGroup = mui.ToolbarGroup;
var DropDownMenu = mui.DropDownMenu;
var ToolbarTitle = mui.ToolbarTitle;
var FontIcon = mui.FontIcon;
var DropDownIcon = mui.DropDownIcon;
var ToolbarSeparator = mui.ToolbarSeparator;


var Select = require('react-select');
var ReactDataGrid = require('react-data-grid/addons');




var CategoryDataGrid = React.createClass({
    propTypes: function () {
        return {
            category: React.PropTypes.object.isRequired,
            projects: React.PropTypes.object.isRequired,
            mode: React.PropTypes.string.isRequired,
            handleProjectChange: React.PropTypes.func.isRequired
        };
    },
    getInitialState () {
        return {
            categoryEvaluations: this.props.category.categoryEvaluations,
            projects: this.props.projects,
        };
    },

    render:function(){
        var mode = this.props.mode;
        var projects = this.state.projects;
        var category =this.props.category;
        var categoryEvaluations = this.state.categoryEvaluations;

        var rows = [];
        for (var i = 0; i < projects.length; i++) {
            var categoryMembership;
            var goodMemberships = projects[i].categoryMemberships.filter(function (catMem) {
                return catMem.categoryMembershipPK.categoryId === category.categoryId;
            });
            categoryMembership=goodMemberships[0];
            var row={
                name: projects[i].name,
                overallScore: categoryMembership.overallScore,
                overallScore_rank: categoryMembership.rankInCategory,
                overallPriority: projects[i].overallPriority
            };
            for (var j=0;j<projects[i].scores.length;j++) {
                var criterionId=projects[i].scores[j].scoresPK.scoringCriterionId;
                row[criterionId]=projects[i].scores[j].score;

            }

            rows.push(row);
        }

        var rowGetter = function(i){
            return rows[i];
        };


        var columns = [
            {
                key: 'overallPriority',
                name: 'Overall priority'
            },
            {
                key: 'name',
                name: 'Name'
            },
            {
                key: 'overallScore',
                name: 'Saved overall score'
            },
            {
                key: 'actualOverallScore',
                name: 'Actual overall score'
            }
        ];
        function sortByKey(array, key, direction) {
            //console.log("SORTING key: "+key+" direction: "+direction);
            return array.sort(function(a, b) {
                var x = a[key]; var y = b[key];
                if(x === undefined){
                    return 1;
                }
                if(y === undefined){
                    return -1;
                }
                if(direction==="ASC") {
                    return ((x > y) ? 1 : ((x < y) ? -1 : 0));
                } else {
                    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
                }
            });
        }
        //add columns for all scoring criteria
        var sumOfWeights=0;
        for (var i=0;i<categoryEvaluations.length;i++){
            columns.push({
                key: categoryEvaluations[i].categoryEvaluationPK.scoringCriterionId,
                name: categoryEvaluations[i].scoringCriterion.code,
                bestIs: categoryEvaluations[i].scoringCriterion.bestIs,
                weight: categoryEvaluations[i].weight
            });
            sumOfWeights+=categoryEvaluations[i].weight;
            /*columns.push({
                key: categoryEvaluations[i].categoryEvaluationPK.scoringCriterionId+"_rank",
                name: categoryEvaluations[i].scoringCriterion.code+" rank"
            });*/

            //ADD RANK IN SCORING CRITERION
            sortByKey(rows,categoryEvaluations[i].categoryEvaluationPK.scoringCriterionId,(categoryEvaluations[i].scoringCriterion.bestIs === "MAX"?"DESC":"ASC"));
            var currentRank=1;
            for (var j=0;j<rows.length;j++) {
                rows[j][categoryEvaluations[i].categoryEvaluationPK.scoringCriterionId+"_rank"]=currentRank;
                if(rows[j+1]){
                    if(rows[j+1][categoryEvaluations[i].categoryEvaluationPK.scoringCriterionId]
                        != rows[j][categoryEvaluations[i].categoryEvaluationPK.scoringCriterionId]){
                        currentRank=currentRank+1;
                    }
                }
            }
            //console.log(rows);
        }
        columns[3].weight=sumOfWeights;
        //add actual overall score
        for (var j=0;j<rows.length;j++) {
            var actualOverallScore=0;
            for (var i = 0; i < categoryEvaluations.length; i++) {
                actualOverallScore=actualOverallScore+rows[j][categoryEvaluations[i].categoryEvaluationPK.scoringCriterionId+"_rank"]*categoryEvaluations[i].weight/100;
            }
            rows[j].actualOverallScore=Math.round(actualOverallScore * 1000) / 1000;
        }
        //add actual rank
        sortByKey(rows,"actualOverallScore","ASC");
        var currentRank=1;
        for (var j=0;j<rows.length;j++) {
            rows[j].actualOverallScore_rank=currentRank;
            if(rows[j+1]){
                if(rows[j+1].actualOverallScore
                    != rows[j].actualOverallScore){
                    currentRank=currentRank+1;
                }
            }
        }

        //sortByKey(rows,'rankInCategory',"ASC");
        //console.log("ROWSSS");
        //console.log(rows);



        //header of table
        var columnBlocks = columns.map(function(column){
            return (
                <th>{column.weight?column.weight+"%":""} {column.name} {column.bestIs}</th>
            );
        });
        var headerRowBlock=(
            <tr>
                {columnBlocks}
            </tr>
        );
        //content of table
        var rowsBlocks=[];
        for (var j=0;j<rows.length;j++) {
            var cells=[];
            for (var i=0;i<columns.length;i++) {
                if(rows[j][columns[i].key+"_rank"]){
                    cells.push(
                        <td>{rows[j][columns[i].key] !== undefined ?rows[j][columns[i].key]:"NA"} (#{rows[j][columns[i].key+"_rank"]})</td>
                    );
                }else {
                    cells.push(
                        <td>{rows[j][columns[i].key]}</td>
                    );
                }
            }
            rowsBlocks.push(
                <tr>{cells}</tr>
            );
        }


        var categoryTableBlock=(
            <table className="table">
                {headerRowBlock}
                {rowsBlocks}
            </table>
        );

        return (
            <div>
                <Paper zDepth={1} className="row" style={{marginBottom:15}}>
                    <h2 className="col-sm-12">{category.name}</h2>
                    <div className="col-sm-12">
                        {categoryTableBlock}
                    </div>
                </Paper>
            </div>
        )
    }

});

module.exports = CategoryDataGrid;