import React, { Component } from 'react';
import '../styles/CourseCard.css';
import { CourseType } from '../types/types';

class CourseCard extends Component {
    render() {
        const {subject, num, title, defaultCourse} = this.props.course;

        return (
            <div 
                className={`CourseCard ${defaultCourse ? "default" : "elective"}`}
            >
                {`${subject}${num}`}<br />{title}
            </div>
        );
    }
}

CourseCard.propTypes = {
    course: CourseType,
};

export default CourseCard;
