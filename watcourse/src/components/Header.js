import React, { Component } from 'react';
//import { PropTypes } from 'prop-types';
import '../styles/Header.css';
import { ReactComponent as Logo } from '../images/logo.svg';
import { ReactComponent as Profile } from '../images/icon_profile.svg';

class Header extends Component {
    render() {
        return (
            <div className="Header">
                <Logo className="logo" /> 
                <div className="links"><div className="links-inner">
                    <a className="link" href="/shortlist">
                        <div className="link-text">shortlist</div>
                    </a>
                    <a className="link" href="/logout">
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

export default Header;
