import  React from 'react';
import { PropTypes } from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';

import '../styles/TermCard.css';

import CourseCard from './CourseCard';
import TermDropdown from './shared/TermDropdown';

import { TermType, CourseType, TermNumNames } from '../types/types';
import { TERMLABELS } from '../constants/names.js';

import { removeFromTerm } from '../actions/termCourseActions';
import { removeTerm, editTerm } from '../actions/termActions';

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
            name: this.props.term.name,
        }
    }

    toggleEditMode() {
        if( this.state.editMode ) {
            var newTermDetails = {
                name: this.state.name || this.props.term.name,
            }

            if (newTermDetails.name !== this.props.term.name) {
                this.props.dispatch(editTerm(this.props.term, TERMLABELS[newTermDetails.name]));
            }
        }

        this.setState({
            editMode: !this.state.editMode,
            name: this.props.term.name,
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
                                    <TermDropdown 
                                        onChange={this.updateEditState.bind(this,"name")}
                                        defaultValue={this.props.term.name}
                                    />
                                    {` - ${TermNumNames[term.termNum]} ${term.termYear}`}
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
                        droppableId={JSON.stringify({type: "TERM", id: this.props.term.id})}
                        type="COURSE"
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
                </div>
            </div>
        );
    }
}

TermCard.propTypes = {
    term: TermType,
    courses: PropTypes.arrayOf(CourseType).isRequired,
    dispatch: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

TermCard.defaultProps = {
    disabled: false,
}

export default TermCard;
