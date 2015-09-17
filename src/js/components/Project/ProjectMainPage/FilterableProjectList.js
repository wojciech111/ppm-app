var React = require('react');



var AppConstants = require('../../../constants/AppConstants');
var StatesTypes = AppConstants.StatesTypes;
var DecisionStates = AppConstants.DecisionStates;
var ViewModes = AppConstants.ViewModes;

var ModefulProject = require('./ModefulProject');

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


var FilterableProjectList = React.createClass({
    propTypes: function () {
        return {
            projects: React.PropTypes.object.isRequired,
            mode: React.PropTypes.string.isRequired,
            handleProjectChange: React.PropTypes.func.isRequired
        };
    },
    getInitialState () {
        return {
            showedData: ["STATES"],
            keyOfSort:'updateDate',
            groupBy: "None",
            filterStates: ["All"],
            filterCategories: ["All"],
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
    /*_handleExpandedClick:function () {
        console.log("this.state.expanded: "+this.state.expanded);

       console.log('New value:', value, 'Values:', values);
        this.setState({ expanded: !this.state.expanded });
    },*/
    render:function(){
        var mode = this.props.mode;
        var projects = this.props.projects;

        var dataToShowOptions = [
            { label: 'State', value: "STATES" },
            { label: 'Dates', value: "DATES" },
            { label: 'Health', value: "HEALTH" },
            { label: 'Categories', value: "CATEGORIES" },
            { label: 'People', value: "PEOPLE" }
        ];
        var sortOptions = [
            { payload: 'startDate', text: 'Start date' },
            { payload: 'endDate', text: 'Finish date' },
            { payload: 'deadlineDate', text: 'Last update' },
            { payload: 'updateDate', text: 'Last update' },
            { payload: 'creationDate', text: 'Creation date' },
            { payload: 'overallPriority', text: 'Priority' },
            { payload: 'approveDate', text: 'Approve date' },
            { payload: 'executionDate', text: 'Execution date' },
            { payload: 'discardDate', text: 'Discard date' }
        ];

        //FILTER
        /*var filters=this.state.filters;
        projects=projects.filter(function (d) {
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
                return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            });
        }
        if(this.state.keyOfSort !== 'updateDate'){
            sortByKey(projects,'updateDate');
        }
        sortByKey(projects,this.state.keyOfSort);


        //RENDER TOOLBAR
        var dataBlock;
        var sortByBlock;
        var groupByBlock;
        var FilterStatesBlock;
        var FilterCategoriesBlock;


        dataBlock=(
            <div className="row" >
                <div className="col-sm-12">
                    <h6>Show info about:</h6>
                </div>
                <div className="col-sm-12">
                    <Select multi={true}
                            value={this.state.showedData}
                            placeholder="Choose data"
                            options={dataToShowOptions}
                            onChange={this._handleShowedDataChange} />
                </div>
            </div>
        );

        var toolbar=(
            <div className="row" >
                <div className="col-sm-12" style={{marginTop:10,marginBottom:15, paddingTop:10,
                backgroundColor:"rgb(226,226,226)"}}>
                    <div className="row" >
                        <div className="col-sm-3" style={{marginTop:10, marginBottom:10}}  >
                            {dataBlock}
                        </div>
                        <div className="col-sm-1" style={{marginTop:10, textAlign:"right"}}  >
                            <h5>Sort by:</h5>
                        </div>
                        <div className="col-sm-2" >
                            <DropDownMenu menuItems={sortOptions}
                                          onChange={this._handleSortChange}/>
                        </div>

                        <div className="col-sm-2" style={{marginTop:5}} >

                        </div>
                    </div>
                </div>
            </div>
        );
        var keyOfSort=this.state.keyOfSort;
        var nameOfSort =sortOptions.filter(function (o) {
            if(o.payload === keyOfSort){
                return true;
            }
            return false;
        });
        nameOfSort=nameOfSort[0];


        var projectsBlocks=[];

        for(var i=0;i<projects.length;i++){
            projectsBlocks.push(
                <ModefulProject
                    key={projects[i].componentId}
                    project={projects[i]}
                    mode={mode}
                    keyOfSort={this.state.keyOfSort}
                    nameOfSort={nameOfSort}
                    showedData={this.state.showedData}
                    handleProjectChange={this.props.handleProjectChange}
                    ></ModefulProject>
            );

        };
        return (
            <div>
                <div className="row">
                    <h1 className="col-sm-12">Projects</h1>
                    <div className="col-sm-12">{toolbar}</div>
                    <div className="col-sm-12">
                        {projectsBlocks}
                    </div>
                </div>
            </div>
        )
    }

});

module.exports = FilterableProjectList;