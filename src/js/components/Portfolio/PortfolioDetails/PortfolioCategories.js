var React = require('react');



var mui = require('material-ui');
var Paper = mui.Paper;



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
        var areasOfFocusOncategories = portfolio.areasOfFocus;
        var categoriesBlocks=[];
        function sortByKey(array, key) {
            return array.sort(function(a, b) {
                var x = a[key]; var y = b[key];
                return ((x < y) ? 1 : ((x > y) ? -1 : 0));
            });
        }
        sortByKey(areasOfFocusOncategories,"percentageOfFocus");
        for(var i=0;i<areasOfFocusOncategories.length;i++){
            categoriesBlocks.push(
                <tr key={areasOfFocusOncategories[i].category.categoryId}
                    style={{color:"rgba("+
                        (areasOfFocusOncategories[i].category.colorRed?areasOfFocusOncategories[i].category.colorRed:255)
                        +","+
                        (areasOfFocusOncategories[i].category.colorGreen?areasOfFocusOncategories[i].category.colorGreen:255)
                        +","+
                        (areasOfFocusOncategories[i].category.colorBlue?areasOfFocusOncategories[i].category.colorBlue:255)
                        +",1)"
                    }}>

                    <td>
                        {areasOfFocusOncategories[i].category.code}
                    </td>
                    <td>
                        {areasOfFocusOncategories[i].category.name}
                    </td>
                    <td>
                        {/*<ModefulTextField object={portfolio}
                                          mode={mode}
                                          keyOfValue="code"
                                          labelText="Focus on category"
                                          showLabelInView={true}
                                          hintText="Percentage of focus on this category"
                                          handleChange={this.props.handlePortfolioChange}
                                          maxLength={10}
                            />*/}
                        {areasOfFocusOncategories[i].percentageOfFocus+" %"}
                    </td>
                </tr>
            );

        };




        return (
            <div className="row">
                <div className="col-sm-6">
                    <Paper zDepth={1} className="row" key={1}>
                        <h1 className="col-sm-12">Categories</h1>
                        <table className="table table-bordered col-sm-12">
                            <thead>
                                <tr>
                                    <th>
                                        Code
                                    </th>
                                    <th>
                                        Name
                                    </th>
                                    <th>
                                        Percentage of focus
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {categoriesBlocks}
                            </tbody>
                        </table>
                    </Paper>
                </div>
            </div>
        )
    }

});

module.exports = PortfolioCategories;