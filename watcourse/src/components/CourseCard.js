import React, { Component } from 'react';
import '../styles/CourseCard.css';
import { CourseType } from '../types/types';

class CourseCard extends Component {
    render() {
        const {courseCode, courseName, defaultCourse} = this.props.course;

        return (
            <div 
                className={`CourseCard ${defaultCourse ? "default" : "elective"}`}
            >
                {courseCode}<br />{courseName}
            </div>
        );
    }
}

CourseCard.propTypes = {
    course: CourseType,
};

export default CourseCard;
