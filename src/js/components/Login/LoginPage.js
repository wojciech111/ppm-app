var React = require('react');
//Router
//routes names
//Stores
var UserStore = require('../../stores/UserStore');
//var PortfolioStore = require('../../stores/PortfolioStore');
//Action creators
var ViewActionCreator = require('../../actions/ViewActionCreator');
//Constants
//Components
//Material-ui components
var mui = require('material-ui');
var FlatButton = mui.FlatButton;

/*
 TODO  zamiana na material-ui, jezeli button wciseniety to loading indiactor do momementu dostania errorow
 */

var LoginPage = React.createClass({
    getInitialState: function() {
        return { errors: [] };
    },

    componentDidMount: function() {
        UserStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        UserStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState({ errors: UserStore.getErrors() });
    },

    _onSubmit: function(e) {
        e.preventDefault();
        this.setState({ errors: [] });
        var email = this.refs.email.getDOMNode().value;
        var password = this.refs.password.getDOMNode().value;
        ViewActionCreator.login(email, password);
    },

    render: function() {
        var errors = (this.state.errors.length > 0) ? <div>{this.state.errors}</div> : <div></div>;
        return (
            <div>
                {errors}
                <div className="row">
                    <div className="card card--login small-10 medium-6 large-4 columns small-centered">
                        <form onSubmit={this._onSubmit}>
                            <div className="card--login__field">
                                <label name="email">Email</label>
                                <input type="text" name="email" ref="email" />
                            </div>
                            <div className="card--login__field">
                                <label name="password">Password</label>
                                <input type="password" name="password" ref="password" />
                            </div>
                            <button type="submit" className="card--login__submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = LoginPage;