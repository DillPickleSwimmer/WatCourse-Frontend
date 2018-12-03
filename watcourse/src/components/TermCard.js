import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import '../styles/TermCard.css';
import CourseCard from './CourseCard';
import { ReactComponent as AddIcon } from '../images/icon_add.svg';
import { TermType, CourseType } from '../types/types';
import { removeFromTerm } from '../actions/termActions';

class TermCard extends Component {
    render() {
        const { courses, term } = this.props; 

        return (
            <div className="TermCard">
                <div className="header">
                    <div className="title">{`${term.name}`}</div>
                    <AddIcon className="add-button" onClick={this.props.addCourses}/>
                </div>
                <div className="courses">
                    {courses.map((course, index) => 
                        <CourseCard 
                            key={index} 
                            course={course} 
                            removeFromTerm={()=>{   // UPDATE TO USE TERM ID NOT INDEX
                                this.props.dispatch(removeFromTerm(this.props.term.id, course));
                            }}
                        />
                    )}
                </div>
            </div>
        );
    }
}

TermCard.propTypes = {
    term: TermType,
    courses: PropTypes.arrayOf(CourseType).isRequired,
    addCourses: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
};

export default TermCard;
