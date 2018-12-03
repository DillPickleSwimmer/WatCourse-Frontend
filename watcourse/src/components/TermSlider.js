import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import '../styles/TermSlider.css';
import TermCard from './TermCard.js';
import { TermType, CourseType } from '../types/types';

class TermSlider extends Component {
    render() {
        const { courses } = this.props; 
        return (
            <div className="TermSlider">
                {this.props.terms.map((term, index) => <TermCard key={index} term={term} courses={courses.filter( course => term.courses.indexOf(course.id) != -1)} />)}
            </div>
        );
    }
}

TermSlider.propTypes = {
    terms: PropTypes.arrayOf(TermType).isRequired,
    courses: PropTypes.arrayOf(CourseType).isRequired
};

export default TermSlider;
