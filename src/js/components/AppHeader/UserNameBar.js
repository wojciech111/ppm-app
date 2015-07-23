var React = require('react');
var AppRoutes = require('../../constants/AppRoutes');
var AppStore = require('../../stores/AppStore');
var Link = require('react-router-component').Link;


var UserNameBar = React.createClass({
    render:function(){
        var user = AppStore.getUser();
        return (
            <Link href={AppRoutes.USER_DETAILS}  style={{backgroundColor:"#882222", padding:5}}>
                {user.name}
            </Link>
        );
    }
});

module.exports = UserNameBar;