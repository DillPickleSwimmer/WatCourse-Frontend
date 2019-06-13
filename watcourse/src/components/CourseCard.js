import  React from 'react';
import { PropTypes } from 'prop-types';
import '../styles/CourseCard.css';
import { CourseType } from '../types/types';
import { ReactComponent as RemoveIcon } from '../images/icon_minus.svg';
import { Draggable } from 'react-beautiful-dnd';

class CourseCard extends React.Component {
    render() {
        const {id, subject, num, title, defaultCourse, arePrereqsMet} = this.props.course;

        return (
            <Draggable draggableId={id} index={this.props.index}>
                {(provided)=>(
                <div 
                    className={`CourseCard ${defaultCourse ? 'default' : 'elective'} 
                    ${arePrereqsMet ? '' : 'prereq-error'}`}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >  
                    <div className="summary">{`${subject}${num}`}<br />{title}</div>
                    <div className="icon"><RemoveIcon onClick={this.props.removeFromTerm}/></div>
                </div>)}
            </Draggable>
        );
    }
}

CourseCard.propTypes = {
    course: CourseType,
    removeFromTerm: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
};

export default CourseCard;
