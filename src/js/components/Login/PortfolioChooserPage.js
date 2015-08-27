var React = require('react');
//Router
var Navigation = require('react-router').Navigation;
//routes names
var routes_names = require('../../config/routes_names');
//Stores
var UserStore = require('../../stores/UserStore');
//var PortfolioStore = require('../../stores/PortfolioStore');
//Action creators
var ViewActionCreator = require('../../actions/ViewActionCreator');
//Constants
//Components
//Material-ui components
var mui = require('material-ui');
var Card = mui.Card;
var CardHeader = mui.CardHeader;
var CardText = mui.CardText;
var Avatar = mui.Avatar;

/*
 TODO dodanie buttona do work it
 */



var PortfolioChooserPage = React.createClass({
    mixins: [Navigation],
    getInitialState: function() {
        return { user: UserStore.getUser() };
    },
    componentDidMount: function() {
        UserStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        UserStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        this.setState({ user: UserStore.getUser() });
    },
    _handleClick: function(portfolioId){
        ViewActionCreator.changePortfolio(portfolioId);
        console.log("Choosed Portfolio ID="+portfolioId)
        this.transitionTo(routes_names.PORTFOLIO, {portfolioId: portfolioId});

        //this.transitionTo(routes_names.PROJECT_MAIN);
    },
    render:function(){
        var portfoliosPapers = [];
        var user = this.state.user;
        for (var e=0; e < user.employees.length; e++) {
            for (var p=0; p < user.employees[e].organization.portfolios.length; p++) {
                portfoliosPapers.push(
                    <div className="row" key={user.employees[e].organization.portfolios[p].componentId}>
                        <Card initiallyExpanded={false}  className="col-sm-6 col-sm-offset-2">
                            <CardHeader
                                showExpandableButton={true}
                                title={user.employees[e].organization.portfolios[p].name}
                                subtitle={user.employees[e].organization.shortName}
                                avatar={<Avatar style={{color:'blue'}}>{user.employees[e].organization.portfolios[p].name.charAt(0).toUpperCase()}</Avatar>}
                                >
                            </CardHeader>
                            <CardText expandable={true}>
                                <p>Portfolio name: {user.employees[e].organization.portfolios[p].name}</p>
                                <p>Organization name: {user.employees[e].organization.name}</p>
                                <p>Organization short name: {user.employees[e].organization.shortName}</p>
                                <p>Working as: {user.employees[e].firstName} {user.employees[e].secondName}</p>
                                <p>{user.employees[e].organization.portfolios[p].description}</p>
                            </CardText>
                        </Card>
                        <div className="col-sm-2">
                            <a onClick={this._handleClick.bind(this, user.employees[e].organization.portfolios[p].componentId)}>
                                <h2>Work with it!</h2>
                            </a>
                        </div>
                    </div>
                );
            }
        }
        return (
            <div>
                <div className="container-fluid">
                    <div className="row" >
                        <h1 className="col-sm-6 col-sm-offset-2">Choose Portfolio:</h1>
                    </div>
                    {portfoliosPapers}
                </div>
            </div>
        );
    }
});

module.exports = PortfolioChooserPage;