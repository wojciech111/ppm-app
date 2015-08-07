var React = require('react');



var mui = require('material-ui');
var Paper = mui.Paper;
var DatePicker = mui.DatePicker;
var Avatar = mui.Avatar;
var List = mui.List;
var ListItem = mui.ListItem;

var ModefulTextField = require('../../Forms/ModefulTextField');
var ModefulSelectField = require('../../Forms/ModefulSelectField');
var ModefulDatePicker = require('../../Forms/ModefulDatePicker');



var AppStore = require('../../../stores/PortfolioStore');

var ProjectOverview = React.createClass({
    propTypes: function () {
        return {
            project: React.PropTypes.object.isRequired,
            mode: React.PropTypes.string.isRequired,
            handleProjectChange: React.PropTypes.func.isRequired
        };
    },
    render:function(){
        var project= this.props.project;
        var mode = this.props.mode;
        var avatarC=(<Avatar>C</Avatar>);
        var avatarL=(<Avatar>L</Avatar>);
        //console.log("PO: "+project.description);

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
                        <ModefulSelectField object={project}
                                          mode={mode}
                                          keyOfValue="type"
                                          labelText="Project type"
                                          showLabelInView={true}
                                          handleChange={this.props.handleProjectChange}
                                          menuItems=
                                              {[{id:"EX",name:"External project"},
                                              {id:"IN",name:"Internal project"}]}
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


                    </div>
                    <div className="col-sm-4">
                        <h3>Dates</h3>
                        <ModefulDatePicker
                            object={project}
                            mode={mode}
                            keyOfValue="startDate"
                            labelText="Start date"
                            showLabelInView={true}
                            hintText="When this project will start?"
                            handleChange={this.props.handleProjectChange}
                            />
                        <ModefulDatePicker
                            object={project}
                            mode={mode}
                            keyOfValue="endDate"
                            labelText="End date"
                            showLabelInView={true}
                            hintText="When you plan this project will end"
                            handleChange={this.props.handleProjectChange}
                            />
                        <ModefulDatePicker
                            object={project}
                            mode={mode}
                            keyOfValue="deadline"
                            labelText="Deadline"
                            showLabelInView={true}
                            hintText="When the window of opportunity will close?"
                            handleChange={this.props.handleProjectChange}
                            />
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
                        <ModefulSelectField object={project}
                                            mode={mode}
                                            keyOfValue="health"
                                            labelText="Overall health"
                                            showLabelInView={true}
                                            handleChange={this.props.handleProjectChange}
                                            menuItems=
                                                {[{id:"G",name:"Good"},
                                                {id:"B",name:"Below average"},
                                                {id:"P",name:"Poor"}]}
                            />
                        <ModefulSelectField object={project}
                                            mode={mode}
                                            keyOfValue="scope"
                                            labelText="Scope"
                                            showLabelInView={true}
                                            handleChange={this.props.handleProjectChange}
                                            menuItems=
                                                {[{id:"ON",name:"On target scope"},
                                               {id:"OV",name:"Over target scope"},
                                               {id:"OF",name:"Off target scope"}]}
                            />
                        <ModefulSelectField object={project}
                                            mode={mode}
                                            keyOfValue="schedule"
                                            labelText="Schedule"
                                            showLabelInView={true}
                                            handleChange={this.props.handleProjectChange}
                                            menuItems=
                                                {[{id:"ON",name:"On plan"},
                                {id:"FA",name:"Faster then planned"},
                                {id:"OF",name:"Off plan"}]}
                            />
                        <ModefulSelectField object={project}
                                            mode={mode}
                                            keyOfValue="budget"
                                            labelText="Budget"
                                            showLabelInView={true}
                                            handleChange={this.props.handleProjectChange}
                                            menuItems=
                                                {[{id:"ON",name:"On budget"},
                                {id:"BE",name:"Below planned budget"},
                                {id:"OF",name:"Off budget"}]}
                            />
                    </div>

                </Paper>
                <Paper zDepth={1} className="row" style={{marginTop:10}}>
                    <div className="col-sm-3 col-sm-offset-2">
                        <ModefulTextField object={project}
                                          mode={mode}
                                          keyOfValue="purpose"
                                          labelText="Purpose of project"
                                          showLabelInView={true}
                                          hintText="Why this project should be executed?"
                                          handleChange={this.props.handleProjectChange}
                                          maxLength={1500}
                                          multiLine={true}
                                          article={true}
                            />
                    </div>
                    <div className="col-sm-5">
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
    }

});

module.exports = ProjectOverview;