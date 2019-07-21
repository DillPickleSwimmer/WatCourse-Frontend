import  React from 'react';
import { PropTypes } from 'prop-types';

import '../styles/SidebarSection.css';

class SidebarSection extends React.Component {
    MAXFLEXGROW = 30;

    constructor(props) {
        super(props);

        this.toggleOpen = this.toggleOpen.bind(this);

        this.open = this.open.bind(this);
        this.triggerOpen = this.triggerOpen.bind(this);
        this.close = this.close.bind(this);
        this.triggerClose = this.triggerClose.bind(this);

        this.state = {
            animateInterval: 0,
            flexgrow: 0,
        }
    }

    componentDidUpdate(prevProps) {
        if( this.props.forceOpen !== prevProps.forceOpen && this.props.forceOpen ) {
            this.triggerOpen();
        }
    }

    componentDidMount() {
        if( this.props.forceOpen ) {
            this.triggerOpen();
        }
    }

    toggleOpen() {
        if ( !this.state.flexgrow ) {
            this.triggerOpen();
        } else {    
            this.triggerClose();
        }
    }

    // OPEN/CLOSE ANIMATION EVENTS

    triggerOpen() {
        clearInterval(this.state.animateInterval);
        this.setState({animateInterval:  setInterval(this.open, 5)});
    }

    open() {
        if ( this.state.flexgrow >= this.MAXFLEXGROW ) {
            clearInterval(this.state.animateInterval);
            this.setState({flexgrow: this.MAXFLEXGROW, animateInterval: 0});
        } else {
            this.setState({flexgrow: this.state.flexgrow + 1});
        }
    }

    triggerClose() {
        clearInterval(this.state.animateInterval);
        this.setState({animateInterval:  setInterval(this.close, 5)});
    }

    close() {
        if ( this.state.flexgrow <= 0 ) {
            clearInterval(this.state.animateInterval);
            this.setState({flexgrow: 0, animateInterval: 0});
        } else {
            this.setState({flexgrow: this.state.flexgrow - 1});
        }
    }

    // ******

    render() {
        return (
            <div className="SidebarSection" style={{flexGrow: this.state.flexgrow}}>
                <div className="header no-select" onClick={this.toggleOpen}>
                    <div className="inner-header">
                        {this.state.open ? "<" : ">"}
                        &nbsp;
                        {this.props.title}
                    </div>
                </div>
                <div className="content">
                    <div className="inner-content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

SidebarSection.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string.isRequired,
    forceOpen: PropTypes.bool,
};

export default SidebarSection;