var React = require('react');

var AppContext = React.createClass({
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

module.exports = AppContext;