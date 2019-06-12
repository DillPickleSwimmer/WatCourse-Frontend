import  React from 'react';
import { PropTypes } from 'prop-types';
import '../styles/TermSlider.css';
import TermCard from './TermCard';
import AddTerm from './AddTerm';
import { TermType, CourseType } from '../types/types';
import { openSearchModal } from '../actions/modalActions';
import { selectTerm } from '../actions/selectTermActions';
import { addTerm } from '../actions/termActions';

class TermSlider extends React.Component {
    render() {
        const { courses, terms } = this.props; 
        return (
            <div className="TermSlider">
                {this.props.terms.map((term, index) => {
                    return term && (<div>
                        <TermCard 
                            key={index} 
                            term={term} 
                            addCourses={()=>{   // UPDATE TO USE TERM ID NOT INDEX
                                this.props.dispatch(selectTerm(term.id));
                                this.props.dispatch(openSearchModal(true));
                            }}
                            courses={courses.filter( course => term.courses.indexOf(course.id) !== -1)}
                            dispatch={this.props.dispatch}
                        />
                    </div>)
                })}
                <AddTerm 
                    lastTerm={terms.length ? terms[terms.length-1] : null}
                    dispatch={this.props.dispatch}
                />
            </div>
        );
    }
}

TermSlider.propTypes = {
    terms: PropTypes.arrayOf(TermType).isRequired,
    courses: PropTypes.arrayOf(CourseType).isRequired
};

export default TermSlider;
