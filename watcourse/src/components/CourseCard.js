import  React from 'react';
import { PropTypes } from 'prop-types';
import '../styles/CourseCard.css';
import { CourseType } from '../types/types';
import { ReactComponent as RemoveIcon } from '../images/icon_minus.svg';
import { Draggable } from 'react-beautiful-dnd';

class CourseCard extends React.Component {
    render() {
        const {id, subject, num, title, defaultCourse, arePrereqsMet, disabled} = this.props.course;

        return (
            <Draggable 
                draggableId={JSON.stringify({type: "COURSE", id: id})}
                index={this.props.index} 
                isDragDisabled={disabled || false}
            >
                {(provided)=>(
                <div 
                    className={`CourseCard ${defaultCourse ? 'default' : 'elective'} ${disabled ? "disabled" : null} 
                    ${arePrereqsMet ? '' : 'prereq-error'}`}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >  
                    <div className="summary">{`${subject}${num}`}<br />{title}</div>
                    {this.props.removeFromTerm ?
                        <div className="small-icon"><RemoveIcon onClick={this.props.removeFromTerm}/></div>
                    : null}
                </div>)}
            </Draggable>
        );
    }
}

CourseCard.propTypes = {
    course: CourseType,
    removeFromTerm: PropTypes.func,
    index: PropTypes.number.isRequired,
    disabled: PropTypes.bool,
};

CourseCard.defaultProps = {
    disabled: false,
}

export default CourseCard;
