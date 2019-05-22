import  React from "react";
import { browserHistory } from 'react-router';
import { PropTypes } from 'prop-types';
import { signup } from '../actions/authActions';
import '../styles/Signup.css';
import Background from '../images/login_background.png';

var backgroundStyle = {
    backgroundPosition:"0px 0px",
    backgroundSize: 'cover',
    height:"100vh",
    
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${Background})`
  };

class SignUp extends React.Component {
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
            <div className="Signup" style={backgroundStyle}>
                <form onSubmit={this.handleSignUp}>
                <div className="centered">
                    <h1>Sign up</h1>
                    <div>
                            <p className="spaced-out">Email: </p>
                            <input className="spaced-out" 
                                name="email"
                                type="email"
                                placeholder="Email"/>
                        
                    </div>
                    <div>
                        <p className="spaced-out">Password: </p>
                        <input className="spaced-out" 
                            name="password"
                            type="password"
                            placeholder="Password"/>
                   
                    </div>
                    <div >
                        <button type="submit">Sign up</button>
                    </div>
                    <br/>
                    <div>
                        <a href="/login">Already have an account?</a>
                    </div>
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