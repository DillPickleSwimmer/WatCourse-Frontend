import React, { Component } from "react";
import { browserHistory } from 'react-router';
import { PropTypes } from 'prop-types';
import { signup } from '../actions/authActions';

class SignUp extends Component {
    componentWillMount() {
        if(this.props.auth) browserHistory.push('/');
    }

    componentWillUpdate(nextProps) {
        if(!this.props.auth && nextProps.auth) browserHistory.push('/');
    }

    handleSignUp = async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        this.props.dispatch(signup( email.value, password.value ));
    };

    render() {
        return (
            <div>
                <h1>Sign up</h1>
                <form onSubmit={this.handleSignUp}>
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
                    <button type="submit">Sign Up</button>
                </form>
                <div>{this.props.error}</div>
            </div>
        );
    }
};

SignUp.propTypes = {
    auth: PropTypes.bool,
    error: PropTypes.string,
};

export default SignUp;