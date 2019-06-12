import  React from 'react';
import { PropTypes } from 'prop-types';
import '../styles/TermSlider.css';
import TermCard from './TermCard.js';
import { TermType, CourseType } from '../types/types';
import { openSearchModal } from '../actions/modalActions';
import { selectTerm } from '../actions/selectTermActions';

class TermSlider extends React.Component {
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
                        courses={courses.filter( course => 
                            term.courses.map(function(c) { return c.id; }).indexOf(course.id) !== -1).map(c => 
                        {
                            c.arePrereqsMet = term.courses.find(termCourse => termCourse.id === c.id).arePrereqsMet === true;
                            return c;
                        })
                        }
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
