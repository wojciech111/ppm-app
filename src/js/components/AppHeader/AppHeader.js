var React = require('react');
var UserNameBar = require('./UserNameBar');
var PortfolioChooser = require('./PortfolioChooser');
var SaveUndoArea = require('./SaveUndoArea');

var AppHeader = React.createClass({
    render:function(){
        return (
            <div className="row" style={{backgroundColor:"#222222"}}>
                <div className="col-xs-7 col-xs-offset-2">
                    <PortfolioChooser></PortfolioChooser>
                </div>
                <div className="col-xs-3">
                    <UserNameBar></UserNameBar>
                </div>
            </div>
        );
    }
});

module.exports = AppHeader;