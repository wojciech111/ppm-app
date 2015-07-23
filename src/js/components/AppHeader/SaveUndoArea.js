var React = require('react');

var SaveUndoArea = React.createClass({
    render:function(){
        return (
            <div  style={{backgroundColor:"#aaffaa"}}>
                <button>Save</button>
                <button>Load</button>
                <p>X changes</p>
            </div>
        );
    }
});

module.exports = SaveUndoArea;