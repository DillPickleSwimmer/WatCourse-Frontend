import  React from 'react';
import { PropTypes } from 'prop-types';
import '../styles/TermSlider.css';
import TermCard from './TermCard';
import AddTerm from './AddTerm';
import { TermType, CourseType } from '../types/types';
import { openSearchModal } from '../actions/modalActions';
import { selectTerm } from '../actions/selectTermActions';
import { DragDropContext } from 'react-beautiful-dnd';
import { moveBetweenTerms } from '../actions/termCourseActions';

class TermSlider extends React.Component {

    onDragEnd = (result) => {
        // dropped nowhere
        if (!result.destination) {
            return;
        }

        // did not move
        if (result.destination.droppableId === result.source.droppableId) {
            return;
        }

        switch(result.type) {
            case "COURSES":       // course moved between terms
                this.props.dispatch(moveBetweenTerms(
                    this.props.courses.find(course => course.id === result.draggableId), 
                    result.source.droppableId, 
                    result.destination.droppableId)
                )
                break;
        }
    };
    

    render() {
        const { courses, terms } = this.props; 
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
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
                                term.courses.map(c => c.id).indexOf(course.id) !== -1)
                                .map(c => {
                                    let arePrereqsMet =  term.courses
                                        .find(termCourse => termCourse.id === c.id).arePrereqsMet === true;
                                    c.arePrereqsMet = arePrereqsMet;
                                    return c;
                                })
                            }
                            dispatch={this.props.dispatch}
                        />)
                    }
                    <AddTerm 
                        lastTerm={terms.length ? terms[terms.length-1] : null}
                        termNames={terms.map(term => term.name)}
                        dispatch={this.props.dispatch}
                    />
                </div>
            </DragDropContext>
        );
    }
}

TermSlider.propTypes = {
    terms: PropTypes.arrayOf(TermType).isRequired,
    courses: PropTypes.arrayOf(CourseType).isRequired
};

export default TermSlider;
