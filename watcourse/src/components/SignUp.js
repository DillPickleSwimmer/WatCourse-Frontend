import  React from 'react';
import { browserHistory } from 'react-router';
import { PropTypes } from 'prop-types';
import { signup } from '../actions/authActions';
import { getPrograms } from '../actions/programsActions';
import {Button, ButtonType} from './Button.js'
import '../styles/Signup.css';
import Background from '../images/login_background.png';

var backgroundStyle = {
    backgroundPosition:'0px 0px',
    backgroundSize: 'cover',
    height:'100vh',
    
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${Background})`
  };

class SignUp extends React.Component {
    componentWillMount() {
        if(this.props.auth) browserHistory.push('/');
    }

    componentDidMount() {
        this.props.dispatch(getPrograms())
    }

    componentWillUpdate(nextProps) {
        if(!this.props.auth && nextProps.auth) browserHistory.push('/');
    }

    handleSignUp = async event => {
        event.preventDefault();
        const { email, password, reenteredPassword, program} = event.target.elements;

        if(password.value !== reenteredPassword.value){
            alert('The passwords you\'ve entered not match');
            return;
        }

        this.props.dispatch(signup( email.value, password.value, program.value ));
    };

    render() {
        const { programs } = this.props;
        return (
            <div className='Signup' style={backgroundStyle}>
                <form onSubmit={this.handleSignUp}>
                <div className='centered-signup'>
                    <h1>Sign up</h1>
                        <input className='signup-input' 
                            name='email'
                            type='email'
                            placeholder='Email'/>
                        <span class="focus-border"></span>
                        <input className='signup-input' 
                            name='password'
                            type='password'
                            placeholder='Password'/>
                        <input className='signup-input' 
                            name='reenteredPassword'
                            type='password'
                            placeholder='Re-enter password'/>
                        <select name='program' required className='signup-input'>
                            <option value=''>
                                Select a program
                            </option>
                            {
                                programs.map(program => (
                                    <option key={program.id} value={program.id}>
                                        {program.name}
                                    </option>
                                ))
                            }
                        </select>
                        <input 
                            className='signup-input'
                            name='startYear'
                            type="number"
                            min="2013"
                            max="2099"
                            step="1"
                            placeholder='Starting year' />
                        <Button type='submit' variant={ButtonType.PRIMARY} text='Sign up'/>
                        <br/>
                        <Button 
                            variant={ButtonType.SECONDARY} 
                            text='Already have an account?' 
                            onClick={() => window.location.href='/login'}/>
                </div>
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