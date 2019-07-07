import React from 'react';
import { signup } from '../actions/authActions';
import { WatButton, WatButtonType } from './WatButton';
import '../styles/Signup.css';

class SignUpProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', reenteredPassword: '', };
        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSignUp(event) {
        event.preventDefault();
        const { email, password, reenteredPassword } = this.state;
        if (event.target === 'EMAIL' && password.value !== reenteredPassword.value) {
            alert('The passwords you\'ve entered not match');
            return;
        }
        this.props.dispatch(signup(event.target.name, email, password));
    }

    handleChange({ target }) {
        this.setState({ [target.name]: target.value });
    }

    render() {
        return (
            [<input className='signup-input'
                onChange={this.handleChange}
                value={this.state.email}
                name='email'
                type='email'
                placeholder='Email' />,
            <input className='signup-input'
                onChange={this.handleChange}
                value={this.state.password}
                name='password'
                type='password'
                placeholder='Password' />,
            <input className='signup-input'
                onChange={this.handleChange}
                value={this.state.reenteredPassword}
                name='reenteredPassword'
                type='password'
                placeholder='Re-enter password' />,
            <WatButton name={'EMAIL'} onClick={this.handleSignUp} variant={WatButtonType.PRIMARY} text='Sign Up with Email' />,
            <WatButton name={'FACEBOOK'} onClick={this.handleSignUp} variant={WatButtonType.FACEBOOK} text='Sign up with Facebook' />,
            <WatButton name={'GOOGLE'} onClick={this.handleSignUp} variant={WatButtonType.GOOGLE} text='Sign up with Google' />,
            <WatButton
                variant={WatButtonType.SECONDARY}
                text='Already have an account?'
                onClick={() => window.location.href = '/login'} />]
        );
    }
}

export default SignUpProvider;