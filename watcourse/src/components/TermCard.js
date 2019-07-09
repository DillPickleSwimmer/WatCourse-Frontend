import  React from 'react';
import { PropTypes } from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';

import '../styles/TermCard.css';

import CourseCard from './CourseCard';

import { TermType, CourseType, TermNumNames } from '../types/types';

import { removeFromTerm } from '../actions/termCourseActions';
import { removeTerm, editTerm } from '../actions/termActions';

import { ReactComponent as AddIcon } from '../images/icon_add.svg';
import { ReactComponent as RemoveIcon } from '../images/icon_minus.svg';
import { ReactComponent as EditIcon } from '../images/icon_pencil.svg';

class TermCard extends React.Component {
    constructor(props) {
        super(props);

        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.removeTerm = this.removeTerm.bind(this);
        this.updateEditState = this.updateEditState.bind(this);

        this.state = {
            editMode: false,
            year: null,
            term: null,
            name: null,
        }
    }

    toggleEditMode() {
        if( this.state.editMode ) {
            var newTermDetails = {
                name: this.state.name || this.props.term.name,
                termNum: parseInt(this.state.term || this.props.term.termNum), 
                termYear: parseInt(this.state.year || this.props.term.termYear) ,
            }

            if (
                (newTermDetails.termYear !== this.props.term.termYear) ||
                (newTermDetails.termNum !== this.props.term.termNum) ||
                (newTermDetails.name !== this.props.term.name)
            ) {
                this.props.dispatch(editTerm(this.props.term, newTermDetails.name, newTermDetails.termNum, newTermDetails.termYear));
            }
        }

        this.setState({
            editMode: !this.state.editMode,
            year: null,
            term: null,
            name: null,
        });
    }

    removeTerm() {
        this.props.dispatch(removeTerm(this.props.term));
    }

    updateEditState(val, event) {
        var obj = {};
        obj[val] = event.target.value;
        this.setState(obj);
    }

    render() {
        const { courses, term } = this.props; 

        return (
            <div className={`TermCard ${this.props.disabled ? "disabled" : null}`}>
                {this.props.disabled ? <div className="disabled-overlay" /> : null}
                <div className="contents">
                    <div className="header">
                        
                        <div className="title">
                            {this.state.editMode ?
                                <div className="edit">
                                    <input value={this.state.name || term.name} onChange={this.updateEditState.bind(this,"name")}/>
                                    {' - '}
                                    <select value={this.state.term || term.termNum} onChange={this.updateEditState.bind(this,"term")}>
                                        {TermNumNames.map((name,index) => {
                                            if ( name ) {
                                                return (<option key={index} value={index}>{name}</option>);
                                            }
                                            return null;
                                        })}
                                    </select>
                                    {" "}
                                    <input type="number" value={this.state.year || term.termYear} onChange={this.updateEditState.bind(this,"year")}/>
                                </div>
                            :
                                `${term.name} - ${TermNumNames[term.termNum]} ${term.termYear}`
                            }
                            &nbsp;<EditIcon className="small-icon" onClick={this.toggleEditMode} />
                        </div>
                        {/* TODO: add confirmation before removing term */}
                        <RemoveIcon className="small-icon" onClick={this.removeTerm}/>
                    </div>
                    <Droppable
                        droppableId={this.props.term.id}
                        type="COURSES"
                        isDropDisabled={this.props.disabled || false}
                    >
                        {(provided)=> (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="courses"
                            > 
                                {/* TODO: insert courses into course placeholder and don't insert between course cards 
                                    OR support re-ordering */}
                                {courses.map((course, index) => 
                                    <CourseCard 
                                        key={index} 
                                        index={index}
                                        course={course} 
                                        removeFromTerm={()=>{
                                            this.props.dispatch(removeFromTerm(this.props.term.id, course));
                                        }}
                                        disabled={this.props.disabled}
                                    />
                                )}
                                <div>{provided.placeholder}</div>
                            </div>
                        )}
                    </Droppable>
                    <div className="course-placeholder" onClick={this.props.addCourses}>
                        <AddIcon className="icon"/>
                    </div>
                </div>
            </div>
        );
    }
}

TermCard.propTypes = {
    term: TermType,
    courses: PropTypes.arrayOf(CourseType).isRequired,
    addCourses: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    dragging: PropTypes.bool,
    disabled: PropTypes.bool,
};

TermCard.defaultProps = {
    disabled: false,
}

export default TermCard;
