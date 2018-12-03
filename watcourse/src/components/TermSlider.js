import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import '../styles/TermSlider.css';
import TermCard from './TermCard.js';
import { TermType, CourseType } from '../types/types';
import { openSearchModal } from '../actions/modalActions';
import { selectTerm } from '../actions/selectTermActions';

class TermSlider extends Component {
    render() {
        const { courses } = this.props; 
        return (
            <div className="TermSlider">
                {this.props.terms.map((term, index) => 
                    <TermCard 
                        key={index} 
                        term={term} 
                        addCourses={()=>{   // UPDATE TO USE TERM ID NOT INDEX
                            this.props.dispatch(selectTerm(term.id));
                            this.props.dispatch(openSearchModal(true));
                        }}
                        courses={courses.filter( course => term.courses.indexOf(course.id) != -1)}
                        dispatch={this.props.dispatch}
                    />)
                }
            </div>
        );
    }
}

TermSlider.propTypes = {
    terms: PropTypes.arrayOf(TermType).isRequired,
    courses: PropTypes.arrayOf(CourseType).isRequired
};

export default TermSlider;
