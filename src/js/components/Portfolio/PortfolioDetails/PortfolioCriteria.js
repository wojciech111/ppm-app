var React = require('react');



var mui = require('material-ui');
var Paper = mui.Paper;
var ListItem = mui.ListItem;
var List = mui.List;
var Avatar = mui.Avatar;
var TextField = mui.TextField;
var assign = require('react/lib/Object.assign');



var PortfolioCategories = React.createClass({
    propTypes: function () {
        return {
            portfolio: React.PropTypes.object.isRequired,
            mode: React.PropTypes.string.isRequired,
            handlePortfolioChange: React.PropTypes.func.isRequired
        };
    },

    render:function(){
        var portfolio= this.props.portfolio;
        var mode = this.props.mode;
        var criteria = assign([],portfolio.scoringCriterions);
        var criteriaBlocks=[];
        function sortByKey(array, key) {
            return array.sort(function(a, b) {
                var x = a[key]; var y = b[key];
                return ((x < y) ? 1 : ((x > y) ? -1 : 0));
            });
        }
        sortByKey(criteria,"scoringCriterionId");
        sortByKey(criteria,"type");
        var avatar=(<Avatar>!#</Avatar>);
        for(var i=0;i<criteria.length;i++){
            if(criteria[i].type){
                avatar=(<Avatar>{criteria[i].type.toUpperCase()}</Avatar>);
            }
            criteriaBlocks.push(
                <div  className="col-sm-12">
                    <Paper zDepth={1} className="row" style={{ marginBottom:20, marginTop:10}}  key={criteria[i].scoringCriterionId}>
                        <div className="col-sm-12">

                            <List>
                                <ListItem key={1}
                                          primaryText={criteria[i].name}
                                          leftAvatar={avatar}
                                          secondaryText={criteria[i].code}
                                          disabled={true}>
                                </ListItem>
                            </List>
                            <div className="row">
                                <div className="col-sm-4">
                                    <List>
                                        <ListItem key={1}
                                                  primaryText={criteria[i].bestIs}
                                                  leftAvatar={avatar}
                                                  secondaryText="Best is"
                                                  disabled={true}>
                                        </ListItem>
                                    </List>
                                </div>
                                <div className="col-sm-4">
                                    <List>
                                        <ListItem key={1}
                                                  primaryText={criteria[i].maxScore?criteria[i].maxScore:"no limit"}
                                                  leftAvatar={avatar}
                                                  secondaryText="Max score"
                                                  disabled={true}>
                                        </ListItem>
                                    </List>
                                </div>
                                <div className="col-sm-4">
                                    <List>
                                        <ListItem key={1}
                                                  primaryText={criteria[i].minScore?criteria[i].minScore:"no limit"}
                                                  leftAvatar={avatar}
                                                  secondaryText="Min score"
                                                  disabled={true}>
                                        </ListItem>
                                    </List>
                                </div>
                            </div>
                            <TextField
                                value={criteria[i].description}
                                floatingLabelText="Description:"
                                fullWidth={true}
                                multiLine={true}
                                disabled={true}
                            />;
                        </div>
                    </Paper>
                </div>
            );

        };




        return (
            <div className="row">
                <div className="col-sm-12">
                    <Paper zDepth={1} className="row" key={1}>
                        <h1 className="col-sm-12">Scoring Criteria</h1>
                        {criteriaBlocks}
                    </Paper>
                </div>
            </div>
        )
    }

});

module.exports = PortfolioCategories;