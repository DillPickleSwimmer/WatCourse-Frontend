import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import '../styles/TermCard.css';
import CourseCard from './CourseCard';
import { ReactComponent as AddIcon } from '../images/icon_add.svg';
import { TermType, CourseType } from '../types/types';

class TermCard extends Component {
    render() {
        const { courses, term } = this.props; 

        return (
            <div className="TermCard">
                <div className="header">
                    <div className="title">{`${term.name}`}</div>
                    <AddIcon />
                </div>
                <div className="courses">
                    {courses.map((course, index) => <CourseCard key={index} course={course} />)}
                </div>
            </div>
        );
    }
}

TermCard.propTypes = {
    term: TermType,
    courses: PropTypes.arrayOf(CourseType).isRequired 
};

export default TermCard;
