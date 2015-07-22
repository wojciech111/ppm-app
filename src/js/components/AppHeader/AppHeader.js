var React = require('react');
var UserNameBar = require('./UserNameBar');
var PortfolioChooser = require('./PortfolioChooser');
var SaveUndoArea = require('./SaveUndoArea');

var AppHeader = React.createClass({
    render:function(){
        return (
            <div style={{backgroundColor:"#222222"}}>
                <div className="row">
                    <UserNameBar></UserNameBar>
                </div>
                <div className="row">
                    <PortfolioChooser></PortfolioChooser>
                    <SaveUndoArea></SaveUndoArea>
                </div>
            </div>
        );
    }
});

module.exports = AppHeader;