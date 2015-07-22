var React = require('react');
var AppRoutes = require('../../constants/AppRoutes');
var AppStore = require('../../stores/AppStore');
var Link = require('react-router-component').Link;

var PortfolioChooser = React.createClass({
    render:function(){
        return (
            <div  className="col-md-7 col-md-offset-1 row"  style={{backgroundColor:"#cccccc"}}>
                <div className="col-md-2"  style={{backgroundColor:"#bb22cc"}}>
                    <button>Choose Portfolio</button>
                </div>
                <div className="col-md-10">
                    <h3>
                        <Link href={AppRoutes.ORGANIZATION_DETAILS}>Organization</Link>
                    </h3>
                    <h1>
                        <Link href={AppRoutes.PORTFOLIO_DETAILS}>Portfolio Name</Link>
                    </h1>
                </div>
            </div>
        );
    }
});

module.exports = PortfolioChooser;