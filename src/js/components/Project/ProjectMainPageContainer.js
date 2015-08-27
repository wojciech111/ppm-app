var React = require('react');
//Router
var Router = require('react-router');
var State = Router.State;
var Link = Router.Link;
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
var ProjectDetailsHeader = require('./ProjectDetails/ProjectDetailsHeader');
var ProjectOverview = require('./ProjectDetails/ProjectOverview');
//Material-ui components
var mui = require('material-ui');

/*
 TODO  Wypisanie listy projektw z linkami do nich
 */


var ProjectMainPageContainer = React.createClass({
    mixins: [State],
    getInitialState: function(){
        return {
            portfolio: PortfolioStore.getProject(this.getParams().portfolioId),
            projects: PortfolioStore.getAllProjects(),
            nrOfChanges: 0,
        }
    },
    /* MANAGE STORE CHANGES*/
    componentDidMount: function(){
        PortfolioStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
        PortfolioStore.removeChangeListener(this._onChange);
    },
    _onChange: function(){
        this.setState({
            portfolio: PortfolioStore.getProject(this.getParams().portfolioId),
            projects: PortfolioStore.getAllProjects()
        })

    },
    /* MANAGE STORE CHANGES*/
    render:function(){
        var portfolio=this.state.portfolio;
        var projects = this.state.projects;
        var projectsComponents = [];
        for (var e = 0; e < projects.length; e++) {
            projectsComponents.push(
                <div key={projects[e].componentId}><Link to={routes_names.PROJECT_DETAILS} params={{projectId: projects[e].componentId, portfolioId: this.getParams().portfolioId}}>{projects[e].name}</Link></div>
            );
        }
        return (
            <div>
                <div>To jest strona listy projektow! Dostepne projekty:</div>
                {projectsComponents}
            </div>
        )
    }
});

module.exports = ProjectMainPageContainer