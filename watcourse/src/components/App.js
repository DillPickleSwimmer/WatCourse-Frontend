import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { PropTypes } from 'prop-types';

import '../styles/App.css';

import Header from './Header';
import SearchContainer from '../containers/SearchContainer';

import { authenticate } from '../actions/authActions';
import SIGNUP_DETAILS from '../reducers/authReducer';
import { authRef } from '../base';

export const noAuthPages = ['/login', '/signup', '/sample'];

class App extends React.Component {
    componentWillMount() {
        if(!this.props.auth && !noAuthPages.find((page)=>page === window.location.pathname)) browserHistory.push('/login');
        if(this.props.page === SIGNUP_DETAILS) browserHistory.push('/signup');
        
        authRef.onAuthStateChanged(user => {
            this.props.dispatch(authenticate(user));
        });
    }

    componentWillUpdate(nextProps) {
        if(this.props.auth && !nextProps.auth && !noAuthPages.find((page)=>page === window.location.pathname)) browserHistory.push('/login');
        if(this.props.page === SIGNUP_DETAILS) browserHistory.push('/signup');
    }

    render() {
        return (
            <div className="App">
                <div className="inner">
                    <Header className="header"/>
                    <div className="content">{this.props.children}</div>
                    <div className="footer">
                        <div className="innerFooter">
                            <a href="https://github.com/DillPickleSwimmer/WatCourse-Frontend">Frontend Github</a>
                            <a href="https://github.com/SiddharthVaknalli/WatCourse-backend">Backend Github</a>
                        </div>
                    </div>
                </div>
                {this.props.searchModalOpen && <SearchContainer />}
            </div>
        );
    }
}

App.propTypes = {
    auth: PropTypes.bool.isRequired,
    page: PropTypes.string,
    searchModalOpen: PropTypes.bool,
    children: PropTypes.object.isRequired
};

export default connect((state)=>({
    auth: state.auth.authenticated,
    page: state.auth.page,
    searchModalOpen: state.searchModal,
}))(App);
