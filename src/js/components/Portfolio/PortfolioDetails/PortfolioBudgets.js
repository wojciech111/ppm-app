var React = require('react');

var AppConstants = require('../../../constants/AppConstants');
var StatesTypes = AppConstants.StatesTypes;

var mui = require('material-ui');
var Paper = mui.Paper;
var DatePicker = mui.DatePicker;
var Avatar = mui.Avatar;
var List = mui.List;
var ListItem = mui.ListItem;



var PortfolioBudgets = React.createClass({
    propTypes: function () {
        return {
            portfolio: React.PropTypes.object.isRequired,
            mode: React.PropTypes.string.isRequired,
            handleProjectChange: React.PropTypes.func.isRequired
        };
    },
    render:function(){
        var portfolio= this.props.portfolio;
        var mode = this.props.mode;
        var budgets = portfolio.budgets;
        var budgetsBlocks=[];
        console.log(budgets);

        for(var i=0;i<budgets.length;i++){
            budgetsBlocks.push(
                <tr key={budgets[i].budgetId}>
                    <td>
                        {budgets[i].budgetId}
                    </td>
                    <td>
                        {budgets[i].name}
                    </td>
                    <td>
                        {budgets[i].amountOfMoney+" $"}
                    </td>
                    <td>
                        {budgets[i].fromDate}
                    </td>
                    <td>
                        {budgets[i].toDate}
                    </td>
                    <td>
                        {budgets[i].description}
                    </td>
                </tr>
            );

        };
        return (
            <div>
                <Paper zDepth={1} className="row" key={1}>
                    <h1 className="col-sm-12">Project costs</h1>
                    <table className="table table-bordered col-sm-12">
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Value
                            </th>
                            <th>
                                From
                            </th>
                            <th>
                                To
                            </th>
                            <th>
                                Description
                            </th>
                        </tr>
                        {budgetsBlocks}
                    </table>
                </Paper>
            </div>
        )
    }

});

module.exports = PortfolioBudgets;