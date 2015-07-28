var React = require('react');
var AppStore = require('../../../stores/PortfolioStore');
var mui = require('material-ui');
var TextField = mui.TextField;
var SelectField = mui.SelectField;
var Paper = mui.Paper;
var DatePicker = mui.DatePicker;


var ProjectOverview = React.createClass({
    propTypes: function () {
        return {
            projectId: React.PropTypes.number.isRequired
        };
    },
    getInitialState: function() {
        return {
            typeValue: undefined,
            healthValue: undefined,
            scopeValue: undefined,
            scheduleValue: undefined,
            budgetValue: undefined
        };
    },
    render:function(){
        var projectId = this.props.projectId;
        var project= AppStore.getProject(projectId);
        return (
            <Paper zDepth={1} className="row">
                <div className="col-sm-4">
                    <h1>Basics</h1>
                    <TextField
                        defaultValue={project.code}
                        floatingLabelText="Project code"
                        hintText="Usually capital letters from project name"
                        fullWidth={true}/>
                    <SelectField
                        fullWidth={true}
                        value={this.state.typeValue}
                        onChange={this._handleTypeValueChange}
                        floatingLabelText="Project type"
                        valueMember="id"
                        displayMember="name"
                        menuItems=
                            {[{id:"ex",name:"External project"},
                            {id:"in",name:"Internal project"}]}
                        />
                    <TextField
                        defaultValue={project.customer}
                        floatingLabelText="Project customer"
                        hintText="Who is customer of this project?"
                        fullWidth={true}/>
                    <TextField
                        defaultValue={project.projectManager}
                        floatingLabelText="Project manager"
                        hintText="Who manage this project?"
                        fullWidth={true}/>
                    <TextField
                        defaultValue={project.sponsor}
                        floatingLabelText="Project sponsor"
                        hintText="Who is responsible for success of this project?"
                        fullWidth={true}/>
                    <TextField
                        defaultValue={project.description}
                        floatingLabelText="Project description"
                        hintText="How you imagine this project will be realized?"
                        fullWidth={true}
                        multiLine={true}/>
                    <TextField
                        defaultValue={project.purpose}
                        floatingLabelText="Purpose of project"
                        hintText="Why this project should be executed?"
                        fullWidth={true}
                        multiLine={true}/>

                </div>
                <div className="col-sm-4">
                    <h1>Dates</h1>
                    <DatePicker
                        fullWidth={true}
                        autoOk={true}
                        showYearSelector={true}
                        mode="landscape"
                        floatingLabelText="Start date"
                        hintText="When this project will start?"/>
                    <DatePicker
                        fullWidth={true}
                        autoOk={true}
                        showYearSelector={true}
                        mode="landscape"
                        floatingLabelText="End date"
                        hintText="When you plan this project will end?"/>
                    <DatePicker
                        fullWidth={true}
                        autoOk={true}
                        showYearSelector={true}
                        mode="landscape"
                        floatingLabelText="Deadline"
                        hintText="When the window of opportunity will be closed?"/>
                    {//project.creationDate+" by "+project.createdBy
                    }
                    <TextField
                        defaultValue="25/02/2012 by Jhonson"
                        floatingLabelText="Creation date"
                        disabled={true}
                        fullWidth={true}/>
                    <TextField
                        defaultValue="25/02/2012 by Jhonson"
                        floatingLabelText="Last update"
                        disabled={true}
                        fullWidth={true}/>

                </div>
                <div className="col-sm-4">
                    <h1>Condition</h1>
                    <SelectField
                        fullWidth={true}
                        value={this.state.healthValue}
                        onChange={this._handleHealthValueChange}
                        floatingLabelText="Overall health"
                        valueMember="id"
                        displayMember="name"
                        menuItems=
                            {[{id:"G",name:"Good"},
                            {id:"B",name:"Below average"},
                            {id:"P",name:"Poor"}]}
                        />
                    <SelectField
                        fullWidth={true}
                        value={this.state.scopeValue}
                        onChange={this._handleScopeValueChange}
                        floatingLabelText="Scope"
                        valueMember="id"
                        displayMember="name"
                        menuItems=
                            {[{id:"ON",name:"On target scope"},
                            {id:"OV",name:"Over target scope"},
                            {id:"OF",name:"Off target scope"}]}
                        />
                    <SelectField
                        fullWidth={true}
                        value={this.state.scheduleValue}
                        onChange={this._handleScheduleValueChange}
                        floatingLabelText="Schedule"
                        valueMember="id"
                        displayMember="name"
                        menuItems=
                            {[{id:"ON",name:"On plan"},
                            {id:"FA",name:"Faster then planned"},
                            {id:"OF",name:"Off plan"}]}
                        />
                    <SelectField
                        fullWidth={true}
                        value={this.state.budgetValue}
                        onChange={this._handleBudgetValueChange}
                        floatingLabelText="Budget"
                        valueMember="id"
                        displayMember="name"
                        menuItems=
                            {[{id:"ON",name:"On budget"},
                            {id:"BE",name:"Below planned budget"},
                            {id:"OF",name:"Off budget"}]}
                        />
                </div>
            </Paper>
        )
    },
    _handleTypeValueChange: function(e) {
        this.setState({
            typeValue: e.target.value
        });
    },
    _handleHealthValueChange: function(e) {
        this.setState({
            healthValue: e.target.value
        });
    },
    _handleScopeValueChange: function(e) {
        this.setState({
            scopeValue: e.target.value
        });
    },
    _handleScheduleValueChange: function(e) {
        this.setState({
            scheduleValue: e.target.value
        });
    },
    _handleBudgetValueChange: function(e) {
        this.setState({
            budgetValue: e.target.value
        });
    },

});

module.exports = ProjectOverview;