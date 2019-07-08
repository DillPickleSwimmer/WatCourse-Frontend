import React from 'react';
import { passwordReset, togglePasswordReset } from '../actions/authActions';
import '../styles/Login.css';
import {WatButton, WatButtonType} from './WatButton';
  
class PasswordReset extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '' };
        this.handlePasswordReset = this.handlePasswordReset.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

    }
    
    handleChange({ target }) {
        this.setState({ [target.name]: target.value });
    }

    handlePasswordReset() {
        const { email } = this.state;
        this.props.dispatch(passwordReset(email));
    }

    handleLogin(){
        this.props.dispatch(togglePasswordReset(false));
    }

    render() {
        return (
            <div className='centered'>
                <h1>Password Reset</h1>
                {this.props.error && <p className='error-text login-text'>{this.props.error}</p>}
                <p className='login-text' >
                    {this.props.msg !== null ? this.props.msg: 
                        'To reset your password, please enter the email address you use for your WatCourse account.'}
                </p>
                <input className='login-input' 
                    name='email'
                    onChange={this.handleChange}
                    type='email'
                    placeholder='Email'/>
                <WatButton onClick={this.handlePasswordReset} variant={WatButtonType.PRIMARY} text='Reset Password'/>
                <WatButton 
                    variant={WatButtonType.SECONDARY} 
                    text='Trying to Login?'
                    onClick={this.handleLogin}/>
            </div>
                
        );
    }
}

export default PasswordReset;