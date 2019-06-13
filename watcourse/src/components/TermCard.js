import  React from 'react';
import { PropTypes } from 'prop-types';
import '../styles/TermCard.css';
import CourseCard from './CourseCard';
import { ReactComponent as AddIcon } from '../images/icon_add.svg';
import { TermType, CourseType } from '../types/types';
import { removeFromTerm } from '../actions/termCourseActions';
import { Droppable } from 'react-beautiful-dnd';

class TermCardList extends React.Component {
    render() {return (<div></div>);}
}

class TermCard extends React.Component {
    render() {
        const { courses, term } = this.props; 
        return (
            <div className="TermCard">
                <div className="header">
                    <div className="title">{`${term.name}`}</div>
                    <AddIcon className="add-button" onClick={this.props.addCourses}/>
                </div>
                <Droppable
                    droppableId={this.props.term.id}
                    type="COURSES"
                >
                    {(provided)=>(<div className="courses">
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {courses.map((course, index) => 
                                <CourseCard 
                                    key={index} 
                                    index={index}
                                    course={course} 
                                    removeFromTerm={()=>{
                                        this.props.dispatch(removeFromTerm(this.props.term.id, course));
                                    }}
                                />
                            )}
                            {provided.placeholder}
                        </div>
                    </div>)}
                </Droppable>
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
