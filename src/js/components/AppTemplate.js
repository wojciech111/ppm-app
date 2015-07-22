var React = require('react');
var AppHeader = require('./AppHeader/AppHeader.js');
var AppMenu = require('./AppMenu/AppMenu.js');


var Template = React.createClass({
    render:function(){
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <AppMenu></AppMenu>
                    </div>
                    <div className="col-md-10">
                        <AppHeader ></AppHeader>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Template;