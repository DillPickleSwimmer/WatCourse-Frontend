import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import '../styles/CourseCard.css';

class CourseCard extends Component {
    render() {
        return (
            <div className="CourseCard">
                {this.props.courseCode}<br />{this.props.courseName}
            </div>
        );
    }
}

CourseCard.propTypes = {
    courseCode: PropTypes.string.isRequired,
    courseName: PropTypes.string.isRequired,
};

export default CourseCard;
