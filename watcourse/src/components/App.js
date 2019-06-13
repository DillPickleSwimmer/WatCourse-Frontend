import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { PropTypes } from 'prop-types';
import '../styles/App.css';
import Header from './Header';
import SearchContainer from '../containers/SearchContainer';
import { authenticate } from '../actions/authActions';

export const noAuthPages = ['/login', '/signup', '/sample'];

class App extends React.Component {
    componentWillMount() {
        this.props.dispatch(authenticate());
        if(!this.props.auth && !noAuthPages.find((page)=>page === window.location.pathname)) browserHistory.push('/login');
    }


    componentWillUpdate(nextProps) {
        if(this.props.auth && !nextProps.auth && !noAuthPages.find((page)=>page === window.location.pathname)) browserHistory.push('/login'); 
    }

    render() {
        return (
            <div className="App">
                {this.props.searchModalOpen && <SearchContainer />}
                <Header />
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    auth: PropTypes.bool.isRequired,
    searchModalOpen: PropTypes.bool,
    children: PropTypes.object.isRequired
};

export default connect((state)=>({
    auth: state.auth.authenticated,
    searchModalOpen: state.searchModal,
}))(App);
