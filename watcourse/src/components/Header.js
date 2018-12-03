import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { PropTypes } from 'prop-types';
import '../styles/Header.css';
import { ReactComponent as Logo } from '../images/logo.svg';
import { ReactComponent as Profile } from '../images/icon_profile.svg';
import { logout } from '../actions/authActions';
import { openSearchModal } from '../actions/modalActions';

class Header extends Component {
    render() {
        return (
            <div className="Header">
                <a href="/"><Logo className="logo" /></a>
                <div className="links">
                    {this.props.auth && <div className="links-inner">
                        <div className="link" onClick={() => this.props.dispatch(openSearchModal(true))}>
                            <div className="link-text">search</div>
                        </div>
                        <div className="link" href="" onClick={()=>this.props.dispatch(logout())}>
                            <div className="link-text">logout</div>
                        </div>
                        <a className="link" href="/account">
                            <Profile/>
                        </a>
                    </div>}
                </div>
            </div>
        );
    }
}

Header.propTypes = {};

export default connect(state=>({auth: state.auth.authenticated}))(Header);
