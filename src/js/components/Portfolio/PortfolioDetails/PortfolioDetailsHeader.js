var React = require('react');



var mui = require('material-ui');
var Avatar = mui.Avatar;
var List = mui.List;
var ListItem = mui.ListItem;
var TextField = mui.TextField;

var ModefulTextField = require('../../Commons/Forms/ModefulTextField');




var PortfolioDetailsHeader = React.createClass({
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







        return (
            <div className="row">
                <div className="col-sm-12">
                    <h1><b>
                        <ModefulTextField object={portfolio}
                                          mode={mode}
                                          keyOfValue="name"
                                          labelText="Portfolio name"
                                          showLabelInView={false}
                                          hintText="Name of this portfolio"
                                          handleChange={this.props.handlePortfolioChange}
                                          maxLength={150}
                            >
                    </ModefulTextField>
                    </b></h1>
                    <h4>(ID: {portfolio.componentId})</h4>
                </div>

            </div>
        )
    }

});

module.exports = PortfolioDetailsHeader;