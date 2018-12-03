import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import '../styles/CourseCard.css';
import { CourseType } from '../types/types';
import { ReactComponent as RemoveIcon } from '../images/icon_minus.svg';

class CourseCard extends Component {
    render() {
        const {code, name, defaultCourse} = this.props.course;

        return (
            <div 
                className={`CourseCard ${defaultCourse ? "default" : "elective"}`}
            >
                <div className="summary">{code}<br />{name}</div>
                <div className="icon"><RemoveIcon onClick={this.props.removeFromTerm}/></div>
            </div>
        );
    }
}

CourseCard.propTypes = {
    course: CourseType,
    removeFromTerm: PropTypes.func.isRequired,
};

export default CourseCard;
