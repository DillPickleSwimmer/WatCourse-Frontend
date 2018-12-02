import React, { Component } from "react";
import { browserHistory } from 'react-router';
import { PropTypes } from 'prop-types';
import { login } from '../actions/authActions';
import { Redirect } from 'react-router';

class Login extends Component {
    componentWillMount() {
        if(this.props.auth) browserHistory.push('/');
    }

    componentWillUpdate(nextProps) {
        if(!this.props.auth && nextProps.auth) browserHistory.push('/');
    }

    handleLogin = async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        this.props.dispatch(login( email.value, password.value ));
    };

    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleLogin}>
                    <label>
                        Email
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                        />
                    </label>
                    <label>
                        Password
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                        />
                    </label>
                    <button type="submit">Login</button>
                </form>
                <div>{this.props.error}</div>
            </div>
        );
    }
};

Login.propTypes = {
    auth: PropTypes.bool,
    error: PropTypes.string,
};

export default Login;