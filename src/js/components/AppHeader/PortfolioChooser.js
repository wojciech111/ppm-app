var React = require('react');
var AppRoutes = require('../../config/routes_names');
var AppStore = require('../../stores/PortfolioStore');
var Link = require('react-router-component').Link;

var PortfolioChooser = React.createClass({
    render:function(){
        return (
            <div  className="row"  style={{backgroundColor:"#cccccc"}}>

                <div className="col-xs-10" style={{textAlign:"center"}}>
                    <h3 style={{display:"inline"}}>
                        <Link href={AppRoutes.ORGANIZATION_DETAILS}>Organization</Link>
                    </h3>

                    <h1 style={{display:"inline"}}>
                        <span> - </span>
                        <Link href={AppRoutes.PORTFOLIO_DETAILS}>Portfolio Name</Link>
                    </h1>
                </div>
                <div className="col-xs-2"  style={{backgroundColor:"#bb22cc"}}>
                    <button>Choose Portfolio</button>
                </div>
            </div>
        );
    }
});

module.exports = PortfolioChooser;