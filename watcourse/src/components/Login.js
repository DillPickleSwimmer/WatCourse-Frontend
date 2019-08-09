import React from 'react';
import { browserHistory } from 'react-router';
import { PropTypes } from 'prop-types';
import { login, togglePasswordReset, clearAuthMessages } from '../actions/authActions';
import { getCourses } from '../actions/courseActions';
import  {LOGGED_IN, SIGNUP_DETAILS} from '../reducers/authReducer';
import '../styles/Login.css';
import {WatButton, WatButtonType} from './WatButton';
import PasswordResetContainer from '../containers/PasswordResetContainer';
  
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '',};
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleResetPassword = this.handleResetPassword.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
    }

    componentWillMount() {
        if(this.props.auth && this.props.page === LOGGED_IN) 
            this.openLandingPage();
         
        if(this.props.auth && this.props.page === SIGNUP_DETAILS) 
            browserHistory.push('/signup');
    }

    componentWillUpdate(nextProps) {
        if(!this.props.auth && nextProps.auth && nextProps.page === LOGGED_IN) 
            this.openLandingPage();
        if(!this.props.auth && nextProps.auth && nextProps.page === SIGNUP_DETAILS) 
            browserHistory.push('/signup');
    }

    openLandingPage(){
        browserHistory.push('/');
        this.props.dispatch(getCourses());
    }

    handleSignup() {
        this.props.dispatch(clearAuthMessages());
        browserHistory.push('/signup');
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
                            onKeyDown={(event) => {
                                if ('Enter' === event.key) {
                                    this.props.dispatch(login('EMAIL', this.state.email, this.state.password));
                                }
                            }}
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
                            onClick={this.handleSignup}/>
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