import React from "react";
import { browserHistory } from 'react-router';
import { PropTypes } from 'prop-types';
import { login } from '../actions/authActions';
import '../styles/Login.css';
import Background from '../images/login_background.png';

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

                    <div>
                        <p className="spaced-out">Email: </p>
                        <input className="spaced-out" name="email"
                            type="email"
                            placeholder="Email"/>                    
                    </div>
                    <div>
                        <p className="spaced-out">Password: </p>
                        <input className="spaced-out" name="password"
                            type="password"
                            placeholder="Password"/>
                    </div>                   
                    <div >
                        <button type="submit">Login</button>
                    </div>
                    <br/>
                    <div>
                        <a href="/signup">Need an account?</a>
                    </div>
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