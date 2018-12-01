import React, { Component } from 'react';
//import { PropTypes } from 'prop-types';
import '../styles/Main.css';
import { ReactComponent as ClosedLock } from '../images/icon_lock_closed.svg';
import { ReactComponent as OpenLock } from '../images/icon_lock_open.svg';
import TermSliderContainer from '../containers/TermSliderContainer';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { locked: true }
        this.handleLockClick = this.handleLockClick.bind(this);
    }

    handleLockClick = () => {
        this.setState({ locked: !this.state.locked });
    }

    render() {
        return (
        <div className="Main">
            <TermSliderContainer className="slider" />
            <div className="footer">
                <div className="content">
                    <a href="https://github.com/DillPickleSwimmer/WatCourse-Frontend">Frontend Github</a>
                    <a href="https://github.com/SiddharthVaknalli/WatCourse-backend">Backend Github</a>
                </div>
                <div className="lock" onClick={this.handleLockClick}>
                    {this.state.locked ? <ClosedLock /> : <OpenLock />}
                </div>
            </div>
        </div>
        );
    }
}

Main.propTypes = {
};

export default Main;
