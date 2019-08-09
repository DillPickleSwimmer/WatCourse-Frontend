import  React from 'react';
import { PropTypes } from 'prop-types';
import '../styles/CourseCard.css';
import { CourseType } from '../types/types';
import { ReactComponent as RemoveIcon } from '../images/icon_minus.svg';
import  FlowIcon from '../images/flow-logo-75x35.png';
import { Draggable } from 'react-beautiful-dnd';
import {WatButton, WatButtonType} from './WatButton';
import { browserHistory } from 'react-router';

class CourseCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded : false,
        };
        this.toggleExpand = this.toggleExpand.bind(this);
        this.generateDescriptions = this.generateDescriptions.bind(this);
        this.openFlow = this.openFlow.bind(this);
    }

    toggleExpand(){
        if (this.props.removeFromTerm === undefined) return;
        this.setState({
            expanded: !this.state.expanded,
        });
    }

    openFlow(){
        const {subject, num } = this.props.course;
        const flowUrl = `https://uwflow.com/courses?keywords=${subject + num}`;
        var win = window.open(flowUrl, '_blank');
        win.focus();
    }

    toPercentage(number) {
        return `${Math.round(number * 100)}%`;
    }

    openPrereqVisualisation(subject, num){
        browserHistory.push(`/prereq/tree/${subject}/${num}`);
    }

    generateDescriptions(course) {
        const {subject, num, description , prereqs, antireqs, coreqs, notes} = course;
        let descriptions = [];
        
        descriptions.push(
            <button
                onClick={() => this.openPrereqVisualisation(subject, num)}>View PreReq Tree
            </button>);
        
        if (description !== '')
            descriptions.push(<div key={'desc-1'} className='detail'><i>Description:</i> {description}</div>);
        if (prereqs !== '')
            descriptions.push(<div key={'desc-2'} className='detail'><i>Prereqs:</i> {prereqs}</div>);
        if (antireqs !== '')
            descriptions.push(<div key={'desc-3'} className='detail'><i>Anti-Reqs:</i> {antireqs}</div>);
        if (coreqs !== '')
            descriptions.push(<div key={'desc-4'} className='detail'><i>Co-reqs:</i> {coreqs}</div>);
        if (notes !== '')
            descriptions.push(<div key={'desc-5'} className='detail'><i>Notes:</i> {notes}</div>);
        
        descriptions.push(<hr key={'flow-hr'}/>);
        descriptions.push(<div key={'flow-desc'} className='detail'><strong>UW Flow Ratings</strong></div>);
        if (course.flow && course.flow.ratings) {
            descriptions.push(course.flow.ratings.map( (r, i) => 
                <div key={`flow${i}`} className='detail'><i>{r.name}:</i> {this.toPercentage(r.rating)}</div>));
        }
        descriptions.push(<img  key={'flow-img'} onClick={this.openFlow} className='flow-icon' src={FlowIcon} alt='ViewInFlow'/>);

            
        return descriptions;
    }

    render() {
        const {id, subject, num, title, defaultCourse, arePrereqsMet, disabled } = this.props.course;
        const removeFromTerm = this.props.removeFromTerm;
        const descriptions = this.generateDescriptions(this.props.course);
        return (
            <Draggable 
                draggableId={JSON.stringify({type: 'COURSE', id: id})}
                key={JSON.stringify({type: 'COURSE', id: id})}
                index={this.props.index} 
                isDragDisabled={disabled || false}
            >
                {(provided)=>(
                    <div 
                        className={`CourseCard ${defaultCourse ? 'default' : 'elective'} ${disabled ? 'disabled' : null} 
                    ${arePrereqsMet === false && removeFromTerm ? 'prereq-error' : '' }`}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        onClick={this.toggleExpand}
                    >                          
                        <div className='detail-wrapper'>
                            <div className='summary'>{`${subject}${num}`}<br />{title}</div>
                            {removeFromTerm ?
                                <div className='small-icon'><RemoveIcon onClick={removeFromTerm}/></div>
                                : null}
                        </div>
                        {this.state.expanded && descriptions}
                    </div>
                )}
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
};

export default CourseCard;
