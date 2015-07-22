var React = require('react');

var SaveUndoArea = React.createClass({
    render:function(){
        return (
            <div className="col-md-2 col-md-offset-1"  style={{backgroundColor:"#aaffaa", marginTop:30}}>
                <button>Save</button>
                <button>Load</button>
                <p>X changes</p>
            </div>
        );
    }
});

module.exports = SaveUndoArea;