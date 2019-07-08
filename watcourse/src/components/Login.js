import React from 'react';
import { browserHistory } from 'react-router';
import { PropTypes } from 'prop-types';
import { login, togglePasswordReset } from '../actions/authActions';
import '../styles/Login.css';
import {WatButton, WatButtonType} from './WatButton';
  
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '',};
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleResetPassword = this.handleResetPassword.bind(this);
    }

    componentWillMount() {
        if(this.props.auth) browserHistory.push('/');
    }

    componentWillUpdate(nextProps) {
        if(!this.props.auth && nextProps.auth) browserHistory.push('/');
    }
    
    handleChange({ target }) {
        this.setState({ [target.name]: target.value });
    }

    handleLogin(event) {
        event.preventDefault();
        const { email, password } = this.state;
        this.props.dispatch(login(event.target.name, email, password));
    }

    handleResetPassword() { 
        this.props.dispatch(togglePasswordReset(true));
    }

    render() {
        return (
            <div className='login'>
                { this.props.showPasswordReset ?
                    <PasswordResetContainer/> : 
                    <div className='centered'>
                        <h1>Login</h1>
                        <p className='error-text login-text'>{this.props.error}</p>
                        <input className='login-input' 
                            name='email'
                            onChange={this.handleChange}
                            type='email'
                            placeholder='Email'/>
                        <input className='login-input' 
                            name='password'
                            onChange={this.handleChange}
                            type='password'
                            placeholder='Password'/>
                        <WatButton className='login-input'
                            name={'EMAIL'} 
                            className='login-input'
                            onClick={this.handleLogin} 
                            variant={WatButtonType.PRIMARY} 
                            text='Login with Email'/>
                        <WatButton className='login-input'
                            name={'FACEBOOK'}
                            onClick={this.handleLogin}
                            variant={WatButtonType.FACEBOOK}
                            text='Login with Facebook'/>
                        <WatButton className='login-input'
                            name={'GOOGLE'} 
                            onClick={this.handleLogin} 
                            variant={WatButtonType.GOOGLE} 
                            text='Login with Google'/>
                        <WatButton className='login-input' 
                            variant={WatButtonType.SECONDARY} 
                            text='Need an account?'
                            onClick={() => window.location.href='/signup'}/>
                        <WatButton className='login-input'
                            variant={WatButtonType.SECONDARY} 
                            text='Forgot your password?'
                            onClick={this.handleResetPassword}/>
                    </div>
                }
            </div>
        );
    }
}

Login.propTypes = {
    auth: PropTypes.bool,
    error: PropTypes.string,
};

export default Login;