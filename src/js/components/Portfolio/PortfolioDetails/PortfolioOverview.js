var React = require('react');



var mui = require('material-ui');
var Paper = mui.Paper;
var DatePicker = mui.DatePicker;
var Avatar = mui.Avatar;
var List = mui.List;
var ListItem = mui.ListItem;

var ModefulTextField = require('../../Commons/Forms/ModefulTextField');
var ModefulSelectField = require('../../Commons/Forms/ModefulSelectField');
var ModefulDatePicker = require('../../Commons/Forms/ModefulDatePicker');

var PortfolioOverview = React.createClass({
    propTypes: function () {
        return {
            portfolio: React.PropTypes.object.isRequired,
            organization: React.PropTypes.object.isRequired,
            mode: React.PropTypes.string.isRequired,
            handlePortfolioChange: React.PropTypes.func.isRequired
        };
    },
    render:function(){
        var portfolio= this.props.portfolio;
        var organization= this.props.organization;
        var mode = this.props.mode;
        var avatarO=(<Avatar>O</Avatar>);
        var avatarC=(<Avatar>C</Avatar>);
        var avatarL=(<Avatar>L</Avatar>);
        //console.log("PO: "+portfolio.description);

        return (
            <div>
                <Paper zDepth={1} className="row">
                    <div className="col-sm-6">
                        <h3>Basics</h3>
                        <ModefulTextField object={portfolio}
                                          mode={mode}
                                          keyOfValue="code"
                                          labelText="Portfolio code"
                                          showLabelInView={true}
                                          hintText="Usually capital letters from portfolio name"
                                          handleChange={this.props.handlePortfolioChange}
                                          maxLength={10}
                            />
                        <ModefulSelectField object={portfolio}
                                          mode={mode}
                                          keyOfValue="customerType"
                                          labelText="Portfolio type"
                                          showLabelInView={true}
                                          handleChange={this.props.handlePortfolioChange}
                                          menuItems=
                                              {[{id:"EX",name:"External portfolio"},
                                              {id:"IN",name:"Internal portfolio"}]}
                            />

                        <ModefulTextField object={portfolio}
                                          mode={mode}
                                          keyOfValue="customer"
                                          labelText="Portfolio customer"
                                          showLabelInView={true}
                                          hintText="Who is customer of this portfolio?"
                                          handleChange={this.props.handlePortfolioChange}
                                          maxLength={50}
                            />
                        <ModefulTextField object={portfolio}
                                          mode={mode}
                                          keyOfValue="manager"
                                          labelText="Portfolio manager"
                                          showLabelInView={true}
                                          hintText="Who manage this portfolio?"
                                          handleChange={this.props.handlePortfolioChange}
                                          maxLength={50}
                            />
                        <ModefulTextField object={portfolio}
                                          mode={mode}
                                          keyOfValue="sponsor"
                                          labelText="Portfolio sponsor"
                                          showLabelInView={true}
                                          hintText="Who is responsible for success of this portfolio?"
                                          handleChange={this.props.handlePortfolioChange}
                                          maxLength={50}
                            />


                    </div>

                    <div className="col-sm-6">
                        <h3>Organization</h3>
                        <List>
                            <ListItem key={1}
                                      primaryText={"Organization short name"}
                                      leftAvatar={avatarO}
                                      secondaryText={organization.shortName}
                                      disabled={true}>
                            </ListItem>
                        </List>
                        <List>
                            <ListItem key={1}
                                      primaryText={"Organization name"}
                                      leftAvatar={avatarO}
                                      secondaryText={organization.name}
                                      disabled={true}>
                            </ListItem>
                        </List>
                        <h3>Dates</h3>

                        <List>
                            <ListItem key={1}
                                      primaryText={"Creation date"}
                                      leftAvatar={avatarC}
                                      secondaryText={portfolio.creationDate+" by "+portfolio.createdBy}
                                      disabled={true}>
                            </ListItem>
                        </List>

                        <List>
                            <ListItem key={1}
                                      primaryText={"Last update"}
                                      leftAvatar={avatarL}
                                      secondaryText={portfolio.updateDate+" by "+portfolio.updatedBy}
                                      disabled={true}>
                            </ListItem>
                        </List>
                    </div>

                </Paper>
                <Paper zDepth={1} className="row" style={{marginTop:10}}>
                    <div className="col-sm-5">
                        <ModefulTextField object={portfolio}
                                          mode={mode}
                                          keyOfValue="purpose"
                                          labelText="Purpose of portfolio"
                                          showLabelInView={true}
                                          hintText="Why this portfolio should be executed?"
                                          handleChange={this.props.handlePortfolioChange}
                                          maxLength={1500}
                                          multiLine={true}
                                          article={true}
                            />
                    </div>
                    <div className="col-sm-7">
                        <ModefulTextField object={portfolio}
                                          mode={mode}
                                          keyOfValue="description"
                                          labelText="Portfolio description"
                                          showLabelInView={true}
                                          hintText="How you imagine this portfolio will be realized?"
                                          handleChange={this.props.handlePortfolioChange}
                                          maxLength={2147483647}
                                          multiLine={true}
                                          article={true}/>
                    </div>

                </Paper>
            </div>
        )
    }

});

module.exports = PortfolioOverview;