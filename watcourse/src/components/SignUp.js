import React from 'react';
import { browserHistory } from 'react-router';
import { PropTypes } from 'prop-types';
import { getPrograms } from '../actions/programsActions';
import '../styles/Signup.css';
import Background from '../images/login_background.png';
import  {LOGGED_IN, SIGNUP_DETAILS} from '../reducers/authReducer';
import SignUpDetails from './SignUpDetails';
import SignUpProvider from './SignUpProvider';

var backgroundStyle = {
    backgroundPosition: '0px 0px',
    backgroundSize: 'cover',
    height: '100vh',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${Background})`
};

class SignUp extends React.Component {
    componentWillMount() {
        if (this.props.page === LOGGED_IN) browserHistory.push('/');
    }

    componentDidMount() {
        this.props.dispatch(getPrograms());
    }

    componentWillUpdate(nextProps) {
        if (this.props.auth && nextProps.page === LOGGED_IN) browserHistory.push('/');
    }

    render() {
        return (
            <div className='Signup' style={backgroundStyle}>
                <div className='centered-signup'>
                    <h1>Sign Up</h1>
                    {/* TODO Turn these into wrappers */}
                    {this.props.page === SIGNUP_DETAILS ? <SignUpDetails dispatch={this.props.dispatch} 
                        programs={this.props.programs}/> : <SignUpProvider dispatch={this.props.dispatch} />}    
                    <div>{this.props.error}</div>
                </div>
            </div>
        );
    }
}

SignUp.propTypes = {
    auth: PropTypes.bool,
    page: PropTypes.string,
    error: PropTypes.string,
    programs: PropTypes.array,
};

export default SignUp;