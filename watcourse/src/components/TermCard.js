import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import '../styles/TermCard.css';
import CourseCard from './CourseCard';
import { ReactComponent as AddIcon } from '../images/icon_add.svg';
import { TermType } from '../types/types';
import { removeFromTerm } from '../actions/termActions';

class TermCard extends Component {
    render() {
        const { season, year, term, courses } = this.props.term;

        return (
            <div className="TermCard">
                <div className="header">
                    <div className="title">{`${season} ${year} - ${term}`}</div>
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
    addCourses: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
};

export default TermCard;
