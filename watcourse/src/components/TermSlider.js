import  React from 'react';
import { PropTypes } from 'prop-types';
import '../styles/TermSlider.css';
import TermCard from './TermCard.js';
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
                this.props.dispatch(moveBetweenTerms(result.draggableId, result.source.droppableId, result.destination.droppableId))
                break;
        }
    };
    

    render() {
        const { courses } = this.props; 
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
                            courses={courses.filter( course => term.courses.indexOf(course.id) !== -1)}
                            dispatch={this.props.dispatch}
                        />)
                    }
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
