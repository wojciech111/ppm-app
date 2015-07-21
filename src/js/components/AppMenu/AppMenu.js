var React = require('react');
var Link = require('react-router-component').Link;

var AppMenu = React.createClass({


    render:function(){
        var links = [
            {name: "Projects", href:"/project-rank"},
            {name: "Programs", href:"/program-rank"}
        ];

        var items = links.map(function(link, idx) {
            //console.log(link.name);
            return (
                <Link  className="btn btn-block" href={link.href} key={idx}>{link.name}</Link>
            )
        });
        return (
            <div>
                <h1>Menu</h1>
                {items}

            </div>
        );
    }
});

module.exports = AppMenu;