import React from "react";
import { browserHistory } from 'react-router';
import { PropTypes } from 'prop-types';
import { login } from '../actions/authActions';
import '../styles/Login.css';
import Background from '../images/login_background.png';
import {Button, ButtonType} from './Button.js'

var backgroundStyle = {
    backgroundPosition:"0px 0px",
    backgroundSize: 'cover',
    height:"100vh",
    
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${Background})`
  };
  
class Login extends React.Component {
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
            <div className="Login" style={backgroundStyle}>
                <form onSubmit={this.handleLogin}>
                    
                <div className="centered">
                    <h1>Login</h1>
                    <input className="login-input" name="email"
                        type="email"
                        placeholder="Email"/>                    
                    <input className="login-input" name="password"
                        type="password"
                        placeholder="Password"/>
                    <Button variant={ButtonType.PRIMARY} type="submit" text='Login'/>
                    <br/>
                    <Button 
                        variant={ButtonType.SECONDARY} 
                        text='Need an account?'
                        onClick={() => window.location.href='/signup'}/>    
                </div>
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