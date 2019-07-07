import React from 'react';
import { browserHistory } from 'react-router';
import { PropTypes } from 'prop-types';
import { login } from '../actions/authActions';
import '../styles/Login.css';
import {WatButton, WatButtonType} from './WatButton';
  
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '',};
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    render() {
        return (
            <div className='login'>                    
                <div className='centered'>
                    <h1>Login</h1>
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
                    <WatButton name={'EMAIL'} onClick={this.handleLogin} variant={WatButtonType.PRIMARY} text='Login with Email'/>
                    <WatButton name={'FACEBOOK'} onClick={this.handleLogin} variant={WatButtonType.FACEBOOK} text='Login with Facebook'/>
                    <WatButton name={'GOOGLE'} onClick={this.handleLogin} variant={WatButtonType.GOOGLE} text='Login with Google'/>
                    <br/>
                    <WatButton 
                        variant={WatButtonType.SECONDARY} 
                        text='Need an account?'
                        onClick={() => window.location.href='/signup'}/>    
                </div>
                <div>{this.props.error}</div>
            </div>
        );
    }
}

Login.propTypes = {
    auth: PropTypes.bool,
    error: PropTypes.string,
};

export default Login;