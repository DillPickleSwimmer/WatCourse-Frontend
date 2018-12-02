import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { PropTypes } from 'prop-types';
import '../styles/App.css';
import Header from './Header';
import { authenticate } from '../actions/authActions';

export const noAuthPages = ['/login', '/signup'];

class App extends Component {
    componentWillMount() {
        this.props.dispatch(authenticate());
        if(!this.props.auth && !noAuthPages.find((page)=>page == window.location.pathname)) browserHistory.push('/login');
    }

    componentWillUpdate(nextProps) {
        if(this.props.auth && !nextProps.auth && !noAuthPages.find((page)=>page == window.location.pathname)) browserHistory.push('/login');
    }

    render() {
        return (
        <div className="App">
            <Header />
            {this.props.children}
        </div>
        );
    }
}

App.propTypes = {
    auth: PropTypes.bool.isRequired,
    children: PropTypes.object.isRequired
};

export default connect((state)=>({auth: state.auth.authenticated}))(App);
