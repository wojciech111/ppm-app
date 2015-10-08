var React = require('react');



var AppConstants = require('../../../constants/AppConstants');
var StatesTypes = AppConstants.StatesTypes;
var DecisionStates = AppConstants.DecisionStates;
var ViewModes = AppConstants.ViewModes;

var ModefulProgram = require('./ModefulProgram');

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


var FilterableProgramList = React.createClass({
    propTypes: function () {
        return {
            programs: React.PropTypes.object.isRequired,
            mode: React.PropTypes.string.isRequired,
            handleProgramChange: React.PropTypes.func.isRequired
        };
    },
    getInitialState () {
        return {
            showedData: ["STATES"],
            keyOfSort:'overallPriority',
            groupBy: null,
            filterStates: [],
            filterCategories: [],
            expanded: false,
        };
    },
    /*_handleSortChange:function(e) {
        console.log("clicked sort by: "+e.target.value);

        this.setState({
            keyOfSort: e.target.value
        });
    },*/
    _handleShowedDataChange:function (value, values) {
        console.log('New value:', value, 'Values:', values);
        this.setState({ showedData: value });
    },
    _handleSortByChange:function (value, values) {
        console.log('New value:', value, 'Values:', values);
        this.setState({ keyOfSort: value });
    },
    _handleGroupByChange:function (value, values) {
        console.log('New value:', value, 'Values:', values);
        this.setState({ groupBy: value });
    },
    _handleFilterStatesChange:function (value, values) {
        console.log('New value:', value, 'Values:', values);
        this.setState({ filterStates: value });
    },
    _handleFilterCategoriesChange:function (value, values) {
        console.log('New value:', value, 'Values:', values);
        this.setState({ filterCategories: value });
    },

    /*_handleExpandedClick:function () {
        console.log("this.state.expanded: "+this.state.expanded);

       console.log('New value:', value, 'Values:', values);
        this.setState({ expanded: !this.state.expanded });
    },*/
    render:function(){
        var mode = this.props.mode;
        var programs = this.props.programs;

        var dataToShowOptions = [
            { label: 'State', value: "STATES" },
            { label: 'Dates', value: "DATES" },
            { label: 'Health', value: "HEALTH" },
            { label: 'Categories', value: "CATEGORIES" },
            { label: 'People', value: "PEOPLE" }
        ];
        var sortOptions = [
            { value: 'overallPriority', label: 'Priority' },
            { value: 'startDate', label: 'Start date' },
            { value: 'endDate', label: 'Finish date' },
            { value: 'deadlineDate', label: 'Deadline date' },
            { value: 'updateDate', label: 'Last update' },
            { value: 'creationDate', label: 'Creation date' }
        ];
        var groupByOptions = [
            { label: 'States', value: "STATES" },
            { label: 'Categories', value: "CATEGORIES" }
        ];
        var filterStatesOptions = [
            { label: 'State', value: "STATES" },
            { label: 'Dates', value: "DATES" },
            { label: 'Health', value: "HEALTH" },
            { label: 'Categories', value: "CATEGORIES" },
            { label: 'People', value: "PEOPLE" }
        ];
        var filterCategoriesOptions = [
            { label: 'State', value: "STATES" },
            { label: 'Dates', value: "DATES" },
            { label: 'Health', value: "HEALTH" },
            { label: 'Categories', value: "CATEGORIES" },
            { label: 'People', value: "PEOPLE" }
        ];
        //FILTER
        /*var filters=this.state.filters;
        programs=programs.filter(function (d) {
            if(filters.indexOf(d.stateOfDecision) > -1){
                return true;
            }
            return false;
        });*/

        //SORT
        function sortByKey(array, key) {
            console.log("SORTING key: "+key);
            return array.sort(function(a, b) {
                var x = a[key]; var y = b[key];
                if(!x){
                    return 1;
                }
                if(!y){
                    return -1;
                }
                return ((x > y) ? 1 : ((x < y) ? -1 : 0));
            });
        }
        if(this.state.keyOfSort !== 'overallPriority'){
            sortByKey(programs,'overallPriority');
        }
        sortByKey(programs,this.state.keyOfSort);


        //RENDER TOOLBAR
        var dataBlock;
        var sortByBlock;
        var groupByBlock;
        var filterStatesBlock;
        var filterCategoriesBlock;


        dataBlock=(
            <div className="row" >
                <div className="col-sm-12">
                    <h6>Show info about:</h6>
                </div>
                <div className="col-sm-12">
                    <Select multi={true}
                            value={this.state.showedData}
                            placeholder="Visible data"
                            options={dataToShowOptions}
                            onChange={this._handleShowedDataChange} />
                </div>
            </div>
        );
        sortByBlock=(
            <div className="row" >
                <div className="col-sm-12">
                    <h6>Sort by:</h6>
                </div>
                <div className="col-sm-12">
                    <Select multi={false}
                            value={this.state.keyOfSort}
                            placeholder="Sorting"
                            options={sortOptions}
                            onChange={this._handleSortByChange} />
                </div>
            </div>
        );
        groupByBlock=(
            <div className="row" >
                <div className="col-sm-12">
                    <h6>Group by:</h6>
                </div>
                <div className="col-sm-12">
                    <Select multi={false}
                            value={this.state.groupBy}
                            placeholder="Grouping"
                            options={groupByOptions}
                            onChange={this._handleGroupByChange} />
                </div>
            </div>
        );
        filterStatesBlock=(
            <div className="row" >
                <div className="col-sm-12">
                    <h6>Visible states:</h6>
                </div>
                <div className="col-sm-12">
                    <Select multi={true}
                            value={this.state.filterStates}
                            placeholder="States"
                            options={filterStatesOptions}
                            onChange={this._handleFilterStatesChange} />
                </div>
            </div>
        );
        filterCategoriesBlock=(
            <div className="row" >
                <div className="col-sm-12">
                    <h6>Visible categories:</h6>
                </div>
                <div className="col-sm-12">
                    <Select multi={true}
                            value={this.state.filterCategories}
                            placeholder="Categories"
                            options={filterCategoriesOptions}
                            onChange={this._handleFilterCategoriesChange} />
                </div>
            </div>
        );
        var toolbar=(
            <div className="row" >
                <div className="col-sm-12" style={{marginTop:10,marginBottom:15, paddingTop:10,
                backgroundColor:"rgb(226,226,226)"}}>
                    <div className="row" >
                        <div className="col-sm-3" style={{ marginBottom:10}}  >
                            {dataBlock}
                        </div>
                        <div className="col-sm-2" style={{marginBottom:10}}  >
                            {sortByBlock}
                        </div>
                        <div className="col-sm-2" style={{marginBottom:10}}  >
                            {groupByBlock}
                        </div>
                        <div className="col-sm-2" style={{marginBottom:10}}  >
                            {filterStatesBlock}
                        </div>
                        <div className="col-sm-3" style={{marginBottom:10}}  >
                            {filterCategoriesBlock}
                        </div>
                    </div>
                </div>
            </div>
        );
        var keyOfSort=this.state.keyOfSort;
        var nameOfSort =sortOptions.filter(function (o) {
            if(o.value === keyOfSort){
                return true;
            }
            return false;
        });
        nameOfSort=nameOfSort[0];


        var programsBlocks=[];

        for(var i=0;i<programs.length;i++){
            programsBlocks.push(
                <ModefulProgram
                    key={programs[i].componentId}
                    program={programs[i]}
                    mode={mode}
                    keyOfSort={this.state.keyOfSort}
                    nameOfSort={nameOfSort}
                    showedData={this.state.showedData}
                    handleProgramChange={this.props.handleProgramChange}
                    ></ModefulProgram>
            );

        };
        return (
            <div>
                <div className="row">
                    <h1 className="col-sm-12">Programs</h1>
                    <div className="col-sm-12">{toolbar}</div>
                    <div className="col-sm-12">
                        {programsBlocks}
                    </div>
                </div>
            </div>
        )
    }

});

module.exports = FilterableProgramList;