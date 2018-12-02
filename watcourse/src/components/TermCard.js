import React, { Component } from 'react';
import '../styles/TermCard.css';
import CourseCard from './CourseCard';
import { ReactComponent as AddIcon } from '../images/icon_add.svg';
import { TermType } from '../types/types';

class TermCard extends Component {
    render() {
        const { season, year, term, courses } = this.props.term;

        return (
            <div className="TermCard">
                <div className="header">
                    <div className="title">{`${season} ${year} - ${term}`}</div>
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
};

export default TermCard;
