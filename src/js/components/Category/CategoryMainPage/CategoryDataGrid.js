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
var ReactDataGrid = require('react-data-grid');

var _rows = [];
for (var i = 1; i < 1000; i++) {
    _rows.push({
        id: i,
        title: 'Title ' + i,
        count: i * 1000
    });
}

//A rowGetter function is required by the grid to retrieve a row for a given index
var rowGetter = function(i){
    return _rows[i];
};


var columns = [
    {
        key: 'id',
        name: 'ID'
    },
    {
        key: 'title',
        name: 'Title'
    },
    {
        key: 'count',
        name: 'Count'
    }
]


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

        return (
            <div>
                <div className="row">
                    <h2 className="col-sm-12">{category.name}</h2>
                    <div className="col-sm-11">
                        <ReactDataGrid
                            columns={columns}
                            rowGetter={rowGetter}
                            rowsCount={_rows.length}
                            minHeight={200} />
                    </div>
                </div>
            </div>
        )
    }

});

module.exports = CategoryDataGrid;