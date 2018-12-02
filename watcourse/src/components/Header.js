import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { PropTypes } from 'prop-types';
import '../styles/Header.css';
import { ReactComponent as Logo } from '../images/logo.svg';
import { ReactComponent as Profile } from '../images/icon_profile.svg';
import { logout } from '../actions/authActions';

class Header extends Component {
    render() {
        return (
            <div className="Header">
                <Logo className="logo" /> 
                <div className="links"><div className="links-inner">
                    <a className="link" href="/shortlist">
                        <div className="link-text">shortlist</div>
                    </a>
                    <a className="link" href="" onClick={()=>this.props.dispatch(logout())}>
                        <div className="link-text">logout</div>
                    </a>
                    <a className="link" href="/account">
                        <Profile/>
                    </a>
                </div></div>
            </div>
        );
    }
}

Header.propTypes = {};

export default connect(state=>({}))(Header);
