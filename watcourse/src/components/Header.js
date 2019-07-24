import  React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import '../styles/Header.css';

import { ReactComponent as Profile } from '../images/icon_profile.svg';
import { ReactComponent as MenuIcon } from '../images/icon_menu.svg';

import SearchBar from './shared/SearchBar';

import { logout } from '../actions/authActions';
import { toggleSidebar, openSidebarSearch } from '../actions/sidebarActions'; 
import { updateCourseSearchQuery } from '../actions/searchActions';

import Logo from './shared/Logo';

class Header extends React.Component {
    render() {
        return (
            <div className="Header">
                <div className="hamburger">
                    {this.props.auth ? <MenuIcon className="icon" onClick={()=>this.props.dispatch(toggleSidebar())} /> : null}
                    {this.props.auth ? <div className="search-bar">
                        <SearchBar 
                            updateQuery={(q)=>{
                                this.props.dispatch(updateCourseSearchQuery(q));
                                this.props.dispatch(openSidebarSearch());
                            }}
                            defaultValue={this.props.defaultSearchValue}
                        />
                    </div> : null}
                </div>
                <div className="logo"><a href="/"><Logo open={true} size={25} /></a></div>
                <div className="links">
                    {/* TODO: add an about page link or something */}
                    {this.props.auth ? <div className="links-inner">
                        <div className="link" href="" onClick={()=>this.props.dispatch(logout())}>
                            <div className="link-text">logout</div>
                        </div>
                        <a className="link" href="/account">
                            <Profile className="icon"/>
                        </a>
                    </div> : null}
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    defaultSearchValue: PropTypes.string,
};

export default connect(state=>({auth: state.auth.authenticated}))(Header);
