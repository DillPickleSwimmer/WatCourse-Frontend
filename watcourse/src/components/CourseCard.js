import  React from 'react';
import { PropTypes } from 'prop-types';
import '../styles/CourseCard.css';
import { CourseType } from '../types/types';
import { ReactComponent as RemoveIcon } from '../images/icon_minus.svg';

class CourseCard extends React.Component {
    render() {
        const {subject, num, title, defaultCourse} = this.props.course;

        return (
            <div 
                className={`CourseCard ${defaultCourse ? 'default' : 'elective'}`}
            >  
                <div className="summary">{`${subject}${num}`}<br />{title}</div>
                <div className="icon"><RemoveIcon onClick={this.props.removeFromTerm}/></div>
            </div>
        );
    }
}

CourseCard.propTypes = {
    course: CourseType,
    removeFromTerm: PropTypes.func.isRequired,
};

export default CourseCard;
