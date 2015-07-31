var React = require('react');
var viewModes = require('../../../constants/viewModes');


var mui = require('material-ui');
var TextField = mui.TextField;
var SelectField = mui.SelectField;
var Paper = mui.Paper;
var DatePicker = mui.DatePicker;
var Avatar = mui.Avatar;
var List = mui.List;
var ListItem = mui.ListItem;

var ModefulTextField = require('../../Forms/ModefulTextField');



var AppStore = require('../../../stores/portfolioStore');

var ProjectOverview = React.createClass({
    propTypes: function () {
        return {
            project: React.PropTypes.object.isRequired,
            mode: React.PropTypes.string.isRequired,
            handleProjectChange: React.PropTypes.func.isRequired
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
        var project= this.props.project;
        var mode = this.props.mode;
        var avatarC=(<Avatar>C</Avatar>);
        var avatarL=(<Avatar>L</Avatar>);
        console.log("PO: "+project.description);

        return (
            <div>
                <Paper zDepth={1} className="row">
                    <div className="col-sm-4">
                        <h3>Basics</h3>
                        <ModefulTextField object={project}
                                          mode={mode}
                                          keyOfValue="code"
                                          labelText="Project code"
                                          showLabelInView={true}
                                          hintText="Usually capital letters from project name"
                                          handleChange={this.props.handleProjectChange}
                                          maxLength={10}
                            />

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
                        <ModefulTextField object={project}
                                          mode={mode}
                                          keyOfValue="customer"
                                          labelText="Project customer"
                                          showLabelInView={true}
                                          hintText="Who is customer of this project?"
                                          handleChange={this.props.handleProjectChange}
                                          maxLength={50}
                            />
                        <ModefulTextField object={project}
                                          mode={mode}
                                          keyOfValue="projectManager"
                                          labelText="Project manager"
                                          showLabelInView={true}
                                          hintText="Who manage this project?"
                                          handleChange={this.props.handleProjectChange}
                                          maxLength={50}
                            />
                        <ModefulTextField object={project}
                                          mode={mode}
                                          keyOfValue="sponsor"
                                          labelText="Project sponsor"
                                          showLabelInView={true}
                                          hintText="Who is responsible for success of this project?"
                                          handleChange={this.props.handleProjectChange}
                                          maxLength={50}
                            />

                        <ModefulTextField object={project}
                                          mode={mode}
                                          keyOfValue="purpose"
                                          labelText="Purpose of project"
                                          showLabelInView={true}
                                          hintText="Why this project should be executed?"
                                          handleChange={this.props.handleProjectChange}
                                          maxLength={500}
                                          multiLine={true}
                            />


                    </div>
                    <div className="col-sm-4">
                        <h3>Dates</h3>
                        <DatePicker
                            fullWidth={true}
                            autoOk={false}
                            showYearSelector={true}
                            mode="landscape"
                            floatingLabelText="Start date"
                            hintText="When this project will start?"/>
                        <DatePicker
                            fullWidth={true}
                            autoOk={false}
                            showYearSelector={true}
                            mode="landscape"
                            floatingLabelText="End date"
                            hintText="When you plan this project will end?"/>
                        <DatePicker
                            fullWidth={true}
                            autoOk={false}
                            showYearSelector={true}
                            mode="landscape"
                            floatingLabelText="Deadline"
                            hintText="When the window of opportunity will be closed?"/>
                        {//project.creationDate+" by "+project.createdBy
                        }

                        <List>
                            <ListItem key={1}
                                      primaryText={"Creation date"}
                                      leftAvatar={avatarC}
                                      secondaryText={"25/02/2012 by Jhonson"}
                                      disabled={true}>
                            </ListItem>
                        </List>

                        <List>
                            <ListItem key={1}
                                      primaryText={"Last update"}
                                      leftAvatar={avatarL}
                                    secondaryText={"25/02/2012 by Jhonson"}
                                    disabled={true}>
                            </ListItem>
                        </List>



                    </div>
                    <div className="col-sm-4">
                        <h3>Condition</h3>
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
                <Paper zDepth={1} className="row" style={{marginTop:10}}>
                    <div className="col-sm-6 col-md-offset-3">
                        <ModefulTextField object={project}
                                          mode={mode}
                                          keyOfValue="description"
                                          labelText="Project description"
                                          showLabelInView={true}
                                          hintText="How you imagine this project will be realized?"
                                          handleChange={this.props.handleProjectChange}
                                          maxLength={2147483647}
                                          multiLine={true}
                                          article={true}/>
                    </div>
                </Paper>
            </div>
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