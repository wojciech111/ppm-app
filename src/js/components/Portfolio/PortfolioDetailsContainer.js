var React = require('react');
//Router
var State = require('react-router').State;
//routes names
var routes_names = require('../../config/routes_names');

//Stores
var UserStore = require('../../stores/UserStore');
var PortfolioStore = require('../../stores/PortfolioStore');
//Action creators
var ViewActionCreator = require('../../actions/ViewActionCreator');
//Constants
var AppConstants = require('../../constants/AppConstants');
var StoreStatuses = AppConstants.StoreStatuses;
var ViewModes = AppConstants.ViewModes;
//Components
var ModeChanger = require('../Commons/ModeChanger');
var PortfolioDetailsHeader = require('./PortfolioDetails/PortfolioDetailsHeader');
var PortfolioOverview = require('./PortfolioDetails/PortfolioOverview');
var PortfolioCategories = require('./PortfolioDetails/PortfolioCategories');
var PortfolioCriteria = require('./PortfolioDetails/PortfolioCriteria');
//Material-ui components
var mui = require('material-ui');
var Tabs = mui.Tabs;
var Tab = mui.Tab;




var PortfolioDetailsContainer = React.createClass({
    mixins: [State],
    getInitialState: function(){
        return {
            portfolio: PortfolioStore.getPortfolio(),
            //user: UserStore.getUser(),
            mode: ViewModes.VIEW_MODE,
            nrOfChanges: 0,
        }
    },
    /* MANAGE STORE CHANGES*/
    componentDidMount: function(){
        PortfolioStore.addChangeListener(this._onChange);
        //UserStore.addChangeListener(this._onChange);
        //this._loadPortfolio(this.state.portfolioId);
    },
    componentWillUnmount: function(){
        PortfolioStore.removeChangeListener(this._onChange);
        //UserStore.removeChangeListener(this._onChange);
    },
    _onChange: function(){
            this.setState({
                portfolio: PortfolioStore.getPortfolio(),
                //user: UserStore.getUser()
            })

    },
    /* MANAGE STORE CHANGES*/

    /* HANDLE APP STATES CHANGES*/

    _handlePortfolioUpdate: function(changedPortfolio){
        ViewActionCreator.updateComponent(changedPortfolio);
    },
    /* HANDLE APP STATES CHANGES*/
    /* VIEW MODE CHANGES*/
    changeToEditMode: function(){
        this.setState({
            mode: ViewModes.EDIT_MODE
        });
    },
    changeToViewModeWithSave: function(){
        this._handlePortfolioUpdate(this.state.portfolio);
        this.setState({
            mode: ViewModes.VIEW_MODE,
            nrOfChanges: 0
        });
    },
    changeToViewModeWithCancel: function(){
        this.setState({
            mode: ViewModes.VIEW_MODE,
            portfolio: PortfolioStore.getPortfolio(),
            nrOfChanges: 0
        });
    },
    /* VIEW MODE CHANGES*/
    /*HELPERS  Passed by props */
    handlePortfolioChange: function(portfolio){
        this.setState({
            portfolio: portfolio,
            nrOfChanges: this.state.nrOfChanges+1
        })

    },
    /*HELPERS  Passed by props */
    _handleTabActive:function(tab ){
        console.log("TAB CLICKED: "+tab.props.route);

    },

    render:function(){
        var portfolio= this.state.portfolio;
        var user= this.state.user;
        var mode= this.state.mode;
        var nrOfChanges= this.state.nrOfChanges;
        //console.log("ProjectDetailsContainer: "+PortfolioStore.getStatus());
        var organization=portfolio.organization;


        var viewToShow;

        if(!PortfolioStore.havePortfolio()){
            viewToShow=(
                <div>Loading...</div>
            );
        } else if(portfolio === null) {
            viewToShow=(
                <div>No portfolio with ID: {this.getParams().portfolioId} found!</div>
            );
        }else {
            //console.log("PROJECT:");
            //console.log(project);
            viewToShow = (
                <div>
                    <div className="container-fluid">
                        <ModeChanger
                            nrOfChanges={nrOfChanges} currentMode={mode}
                            changeToEdit={this.changeToEditMode}
                            changeToViewModeWithSave={this.changeToViewModeWithSave}
                            changeToViewModeWithCancel={this.changeToViewModeWithCancel}
                            ></ModeChanger>
                        <PortfolioDetailsHeader
                            portfolio={portfolio}
                            mode={mode}
                            handlePortfolioChange={this.handlePortfolioChange}
                            ></PortfolioDetailsHeader>
                    </div>
                    <Tabs>
                        <Tab label="Overview"
                             route={routes_names.OVERVIEW}
                             onActive={this._handleTabActive} >
                            <div className="container-fluid">
                                <PortfolioOverview
                                    portfolio={portfolio}
                                    organization={organization}
                                    mode={mode}
                                    handlePortfolioChange={this.handlePortfolioChange}
                                    ></PortfolioOverview>
                            </div>
                        </Tab>
                        <Tab label="Categories"
                             route={routes_names.CATEGORIES}
                             onActive={this._handleTabActive} >
                            <div className="container-fluid">
                                <PortfolioCategories
                                    portfolio={portfolio}
                                    mode={mode}
                                    handlePortfolioChange={this.handlePortfolioChange}
                                    ></PortfolioCategories>
                            </div>
                        </Tab>
                        <Tab label="Scoring Criteria"
                             route={routes_names.CRITERIA}
                             onActive={this._handleTabActive} >
                            <div className="container-fluid">
                                <PortfolioCriteria
                                    portfolio={portfolio}
                                    mode={mode}
                                    handlePortfolioChange={this.handlePortfolioChange}
                                    ></PortfolioCriteria>
                            </div>
                        </Tab>
                        <Tab label="Budgets"
                             route={routes_names.BUDGETS}
                             onActive={this._handleTabActive} >
                        <div>
                            <h2 >Tab Two Template Example</h2>
                            <p>
                                This is another example of a tab template!
                            </p>
                            <p>
                                Fair warning - the next tab routes to home!
                            </p>
                        </div>
                        </Tab>
                    </Tabs>
                </div>
            );
        }

        return (
            <div>{viewToShow}</div>
        )
    }

});

module.exports = PortfolioDetailsContainer;