var React = require('react');

var AppConstants = require('../../../constants/AppConstants');
var StatesTypes = AppConstants.StatesTypes;
var DecisionStates = AppConstants.DecisionStates;
var ViewModes = AppConstants.ViewModes;

var ModefulDecision = require('./ModefulDecision');

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



var FilterableDecisionList = React.createClass({
    propTypes: function () {
        return {
            decisions: React.PropTypes.object.isRequired,
            mode: React.PropTypes.string.isRequired,
            handleDecisionChange: React.PropTypes.func.isRequired
        };
    },
    getInitialState () {
        return {
            filters: [DecisionStates.PROPOSITION,DecisionStates.RECOMMENDATION,DecisionStates.APPROVED],
            expanded: false,
            keyOfSort:'lastUpdateDate'
        };
    },
    _handleSortChange:function(e) {
        console.log("clicked sort by: "+e.target.value);

        this.setState({
            keyOfSort: e.target.value
        });
    },
    _handleFilterChange:function (value, values) {
        console.log('New value:', value, 'Values:', values);
        this.setState({ filters: value });
    },
    _handleExpandedClick:function () {
        console.log("this.state.expanded: "+this.state.expanded);

        this.setState({ expanded: !this.state.expanded });
    },
    render:function(){
        var mode = this.props.mode;
        var decisions = this.props.decisions;
        var decisionsBlocks=[];
        var filterOptions = [
            { label: 'Propositions', value: DecisionStates.PROPOSITION },
            { label: 'Recommendations', value: DecisionStates.RECOMMENDATION },
            { label: 'Approved', value: DecisionStates.APPROVED },
            { label: 'Executed', value: DecisionStates.EXECUTED },
            { label: 'Discarded', value: DecisionStates.DISCARDED },
            { label: 'Archived', value: DecisionStates.ARCHIVED }
        ];

        var sortOptions = [
            { payload: 'lastUpdateDate', text: 'Last update' },
            { payload: 'createDate', text: 'Proposition date' },
            { payload: 'recommendationDate', text: 'Recommendation date' },
            { payload: 'approveDate', text: 'Approve date' },
            { payload: 'executionDate', text: 'Execution date' },
            { payload: 'discardDate', text: 'Discard date' }
        ];

        //FILTER
        var filters=this.state.filters;
        decisions=decisions.filter(function (d) {
            if(filters.indexOf(d.stateOfDecision) > -1){
                return true;
            }
            return false;
        });

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
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }
        if(this.state.keyOfSort !== 'lastUpdateDate'){
            sortByKey(decisions,'lastUpdateDate');
        }
        sortByKey(decisions,this.state.keyOfSort);


        var expandBtn;
        if(this.props.mode === ViewModes.VIEW_MODE){
            var expandBtnLabel;
            if(this.state.expanded){
                expandBtnLabel="Collapse";
            }else{
                expandBtnLabel="Expand";
            }
            expandBtn = (
                <FlatButton style={{float:"right"}} label={expandBtnLabel} secondary={true}
                        onClick={this._handleExpandedClick} />
            );
        }

        var toolbar=(
            <div className="row" >
                <div className="col-sm-12" style={{marginTop:10,marginBottom:15, paddingTop:10,
                backgroundColor:"rgb(226,226,226)"}}>
                    <div className="row" >
                        <div className="col-sm-1" style={{marginTop:10, textAlign:"right"}}  >
                            <h5>Filter:</h5>
                        </div>
                        <div className="col-sm-6" style={{marginTop:5}} >
                            <Select multi={true}
                                    value={this.state.filters}
                                    placeholder="Filter states"
                                    options={filterOptions}
                                    onChange={this._handleFilterChange} />
                        </div>
                        <div className="col-sm-1" style={{marginTop:10, textAlign:"right"}}  >
                            <h5>Sort by:</h5>
                        </div>
                        <div className="col-sm-2" >
                            <DropDownMenu menuItems={sortOptions}
                                          onChange={this._handleSortChange}/>
                        </div>

                        <div className="col-sm-2" style={{marginTop:5}} >
                            {expandBtn}
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
        nameOfSort=nameOfSort[0].text;

        for(var i=0;i<decisions.length;i++){
            decisionsBlocks.push(
                <ModefulDecision
                    key={decisions[i].decisionId}
                    decision={decisions[i]}
                    mode={mode}
                    expanded={this.state.expanded}
                    keyOfSort={this.state.keyOfSort}
                    nameOfSort={nameOfSort}
                    handleDecisionChange={this.props.handleDecisionChange}
                    ></ModefulDecision>
            );

        };
        return (
            <div>
                <div className="row">
                    <h1 className="col-sm-12">Decisions</h1>
                    <div className="col-sm-12">{toolbar}</div>
                    <div className="col-sm-12">
                            {decisionsBlocks}
                    </div>
                </div>
            </div>
        )
    }

});

module.exports = FilterableDecisionList;