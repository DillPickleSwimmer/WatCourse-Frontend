import  React from 'react';
import { connect } from 'react-redux';
//import { PropTypes } from 'prop-types';
import '../styles/Header.css';
import { ReactComponent as Profile } from '../images/icon_profile.svg';
import { logout } from '../actions/authActions';
import { openSearchModal } from '../actions/modalActions';
import { deselectTerm } from '../actions/selectTermActions';
import Logo from './shared/Logo';

class Header extends React.Component {
    open = false;
    render() {
        return (
            <div className="Header">
                <div className="logo"><a href="/"><Logo open={true} size={25} /></a></div>
                <div className="links">
                    {this.props.auth && <div className="links-inner">
                        <div className="link" onClick={() => {
                            this.props.dispatch(deselectTerm());
                            this.props.dispatch(openSearchModal(true));
                        }}>
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
