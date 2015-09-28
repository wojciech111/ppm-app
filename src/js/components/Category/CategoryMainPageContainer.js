var React = require('react');
//Router
var State = require('react-router').State;
//routes names
var routes_names = require('../../config/routes_names');

//Stores
//var UserStore = require('../../stores/UserStore');
var PortfolioStore = require('../../stores/PortfolioStore');
//Action creators
var ViewActionCreator = require('../../actions/ViewActionCreator');
//Constants
var AppConstants = require('../../constants/AppConstants');
var StoreStatuses = AppConstants.StoreStatuses;
var ViewModes = AppConstants.ViewModes;
//Components
var ModeChanger = require('../Commons/ModeChanger');
var CategoryDataGrid = require('./CategoryMainPage/CategoryDataGrid');


//Material-ui components
var mui = require('material-ui');
var Tabs = mui.Tabs;




var CategoryMainPageContainer = React.createClass({
    getInitialState: function(){
        return {
            portfolio: PortfolioStore.getPortfolio(),
            projects: PortfolioStore.getAllProjects(),
            mode: ViewModes.VIEW_MODE,
            nrOfChanges: 0,
        }
    },
    /* MANAGE STORE CHANGES*/
    componentDidMount: function(){
        PortfolioStore.addChangeListener(this._onChange);
        //UserStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
        PortfolioStore.removeChangeListener(this._onChange);
        //UserStore.removeChangeListener(this._onChange);
    },
    _onChange: function(){
        this.setState({
            portfolio: PortfolioStore.getPortfolio(),
            projects: PortfolioStore.getAllProjects(),
        })
    },
    /* MANAGE STORE CHANGES*/

    /* HANDLE APP STATES CHANGES*/

    /*_handleProjectUpdate: function(changedProject){
        ViewActionCreator.updateComponent(changedProject);
    },
    /* HANDLE APP STATES CHANGES*/
    /* VIEW MODE CHANGES*/
    changeToEditMode: function(){
        this.setState({
            mode: ViewModes.EDIT_MODE
        });
    },
    changeToViewModeWithSave: function(){
        //TODO handle update project list
        //this._handleProjectUpdate(this.state.project);
        this.setState({
            mode: ViewModes.VIEW_MODE,
            nrOfChanges: 0
        });
    },
    changeToViewModeWithCancel: function(){
        this.setState({
            mode: ViewModes.VIEW_MODE,
            projects: PortfolioStore.getAllProjects(),
            nrOfChanges: 0
        });
    },

    /* VIEW MODE CHANGES*/
    /*HELPERS  Passed by props */

    handleProjectChange: function(changedProjects){
        //this._handleDecisionUpdate(componentId,decision);
        this.setState({
            nrOfChanges: this.state.nrOfChanges+1
        })

    },
    /*HELPERS  Passed by props */

    _getProjectsByCategory:function(category){
        var outputProjects=[];
        var projects=this.state.projects;
        for(var i=0;i<projects.length;i++){
            var project = projects[i];
            var goodMemberships = project.categoryMemberships.filter(function (catMem) {
                return catMem.categoryMembershipPK.categoryId === category.categoryId;
            });
            if(goodMemberships.length > 0){
                outputProjects.push(project);
            }
        }

        return outputProjects;
    },
    render:function(){
        var portfolio=this.state.portfolio;
        var projects= this.state.projects;
        var mode= this.state.mode;
        var nrOfChanges= this.state.nrOfChanges;
        console.log("category main page");


        var viewToShow;

        if(!PortfolioStore.havePortfolio()){
            viewToShow=(
                <div>Loading...</div>
            );
        } else {
            //console.log("PROJECT:");
            //console.log(project);
            var categoryBlocks=[];
            for(var i=0;i<portfolio.areasOfFocus.length;i++){
                var projectsToCategory=this._getProjectsByCategory(portfolio.areasOfFocus[i].category);
                console.log(portfolio.areasOfFocus[i].category.name);
                console.log(projectsToCategory);
                categoryBlocks.push(
                    <CategoryDataGrid
                        category={portfolio.areasOfFocus[i].category}
                        projects={projectsToCategory}
                        mode={mode}
                        key={portfolio.areasOfFocus[i].category.categoryId}
                        ></CategoryDataGrid>
                );
            }
            viewToShow = (
                <div>
                    <div className="container-fluid">
                        <ModeChanger
                            nrOfChanges={nrOfChanges} currentMode={mode}
                            changeToEdit={this.changeToEditMode}
                            changeToViewModeWithSave={this.changeToViewModeWithSave}
                            changeToViewModeWithCancel={this.changeToViewModeWithCancel}
                            ></ModeChanger>
                        {categoryBlocks}
                    </div>
                </div>
            );
        }

        return (
            <div>{viewToShow}</div>
        )
    }

});

module.exports = CategoryMainPageContainer;