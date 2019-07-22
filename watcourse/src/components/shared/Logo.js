import  React from 'react';
import { PropTypes } from 'prop-types';

import '../../styles/shared/Logo.css';

class Logo extends React.Component {
    // main states
    closedCSize = 65;
    openCSize = 45;

    closedCWeight = 400;
    openCWeight = 700;

    closedCMargin = -43;
    openCMargin = 0;

    watText = "at";
    courseText = "ourse";

    duration = 20;

    constructor(props) {
        super(props);

        this.openCSize = props.size;
        this.closedCSize = props.size * 1.625;
        this.closedCMargin = -1 * props.size * 1.075;

        this.slide = this.slide.bind(this);
        this.type = this.type.bind(this);
        this.reset = this.reset.bind(this);

        var props = this.props; 

        this.state = {
            open: props.open,
            timer: 0,

            cSize: props.open ? this.openCSize : this.closedCSize,
            cMargin: props.open ? this.openCMargin : this.closedCMargin,
            cWeight: props.open ? this.openCWeight : this.closedCWeight,

            watText: props.open ? this.watText : "",
            courseText: props.open ? this.courseText : "",
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.open && !this.props.open) {
            this.setState({
                timer: setInterval(this.slide, this.duration),
            })
        } else {
            this.reset();
        }
    }

    slide() {
        if (this.state.cMargin <= this.openCMargin && this.state.cSize <= this.openCSize) {
            clearInterval(this.state.timer)
            this.setState({
                timer: setInterval(this.type, this.duration * 5), 
                cMargin: this.openCMargin, 
                cSize: this.openCSize,
                cWeight: this.openCWeight,
            });
        } else {
            this.setState({
                cMargin: this.state.cMargin - (this.closedCMargin - this.openCMargin) / 20,
                cSize: this.state.cSize - (this.closedCSize - this.openCSize) / 20,
                cWeight: this.state.cWeight - (this.closedCWeight - this.openCWeight) / 20,
            });
        }
    }

    type() {
        if ( this.state.watText.length < this.watText.length ) {
            this.setState({watText: this.watText.substr(0, this.state.watText.length + 1 )});
        } else if ( this.state.courseText.length < this.courseText.length ) {
            this.setState({courseText: this.courseText.substr(0, this.state.courseText.length + 1 )});
        } else {
            clearInterval(this.state.timer)
        }
    }

    reset() {
        clearInterval(this.state.timer);
        this.setState({
            timer: 0,
            cMargin: this.closedCMargin, 
            cSize: this.closedCSize,
            cWeight: this.closedCWeight,
            watText: "",
            courseText: "",
        });
    }

    render() {

        return (
            <div className="Logo" style={{
                paddingLeft: `${0.25*this.props.size}px`,
                paddingRight: `${0.25*this.props.size}px`
            }}>
                <span className="W" style={{
                    fontSize: `${this.props.size}px`,
                }}>w</span>
                <span style={{
                    fontSize: `${this.props.size}px`,
                }}>{this.state.watText}</span>
                <span className="C" style={{
                    fontSize: `${this.state.cSize}px`,
                    fontWeight: this.state.cWeight,
                    marginLeft: `${this.state.cMargin}px`,
                }}>C</span>
                <span style={{
                    fontSize: `${this.props.size}px`,
                }}>{this.state.courseText}</span>
            </div>
        );
    }
}

Logo.propTypes = {
    open: PropTypes.bool,
    size: PropTypes.number, // font size in px
};

Logo.defaultProps = {
    open: true,
    size: 40,
}

export default Logo;