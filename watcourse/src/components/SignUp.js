import React from 'react';
import { browserHistory } from 'react-router';
import { PropTypes } from 'prop-types';
import { getPrograms } from '../actions/programsActions';
import { getCourses } from '../actions/courseActions';
import '../styles/Signup.css';
import  {LOGGED_IN, SIGNUP_DETAILS} from '../reducers/authReducer';
import SignUpDetails from './SignUpDetails';
import SignUpProvider from './SignUpProvider';

class SignUp extends React.Component {
    componentWillMount() {
        if (this.props.page === LOGGED_IN) this.openLandingPage();
    }

    componentDidMount() {
        this.props.dispatch(getPrograms());
    }

    componentWillUpdate(nextProps) {
        if (nextProps.auth  && nextProps.page === LOGGED_IN) this.openLandingPage();
    }

    openLandingPage(){
        browserHistory.push('/');
        this.props.dispatch(getCourses());
    }

    render() {
        let { error, 
            page } = this.props;
        return (
            <div className='signup'>
                { page === SIGNUP_DETAILS ?
                    <SignUpDetails error={error} dispatch={this.props.dispatch} programs={this.props.programs}/> : 
                    <SignUpProvider error={error} dispatch={this.props.dispatch} />}    
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