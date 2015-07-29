var React = require('react');

var AppContextContainer = React.createClass({
    render:function(){
        return (
            <div>
                <div>
                    UserName
                </div>
                <div>
                    Organization
                </div>
                <div>
                    Portfolio
                </div>
            </div>
        );
    }
});

module.exports = AppContextContainer;