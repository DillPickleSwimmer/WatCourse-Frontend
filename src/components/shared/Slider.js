import  React from 'react';
import { PropTypes } from 'prop-types';
import '../../styles/shared/Slider.css';

class Slider extends React.Component {
    render() {
        return (
            <div className={`Slider ${this.props.direction} ${this.props.direction === Slider.types.horizontal ? 'hover-notif' : null}`}>
                {this.props.children ? this.props.children.map((child, index) => (
                    <div className="child" key={index}>
                        {child}
                    </div>
                )) : null}
            </div>
        );
    }
}

Slider.types = {
    horizontal: 'horizontal',
    vertical: 'vertical'
};

Slider.propTypes = {
    direction: PropTypes.oneOf(Object.values(Slider.types)),
    children: PropTypes.arrayOf(PropTypes.node),
};

Slider.defaultProps = {
    direction: Slider.types.vertical,
};

export default Slider;
