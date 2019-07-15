import  React from 'react';
import { PropTypes } from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';

import '../styles/TermSlider.css';

import TermCard from './TermCard';
import AddTerm from './AddTerm';
import Slider from './shared/Slider';

import { openSearchModal } from '../actions/modalActions';
import { selectTerm } from '../actions/selectTermActions';
import { moveBetweenTerms } from '../actions/termCourseActions';

import { TermType, CourseType } from '../types/types';
import { ReactComponent as Horizontal } from '../images/icon_horizontal.svg';
import { ReactComponent as Vertical } from '../images/icon_vertical.svg';
import { ReactComponent as ClosedLock } from '../images/icon_lock_closed.svg';
import { ReactComponent as OpenLock } from '../images/icon_lock_open.svg';

class TermSlider extends React.Component {
    constructor(props) {
        super(props);

        this.toggleDirection = this.toggleDirection.bind(this);
        this.toggleLock = this.toggleLock.bind(this);
        this.termInPast = this.termInPast.bind(this);
        this.scrollTo = this.scrollTo.bind(this);
        this.performScroll = this.performScroll.bind(this);

        this.courseRefs = {};
        this.props.terms.forEach(term => this.courseRefs["course-"+term.id] = React.createRef());
        this.courseRefs["END"] = React.createRef();

        this.state = {
            direction: Slider.types.vertical,
            dragging: false,
            locked: true,
            recentlySelectedTermId: null,
        }
    }

    onDragStart = (result) => {
        this.setState({dragging: true});
    }

    onDragEnd = (result) => {
        this.setState({dragging: false});

        // dropped nowhere
        if (!result.destination) {
            return;
        }

        // did not move
        if (result.destination.droppableId === result.source.droppableId) {
            return;
        }

        switch(result.type) {
            case "COURSES":   
                // move btwn terms 
                let courseId = result.draggableId;
                let course = this.props.courses.find(course => course.id === courseId); 
                let srcTermId = result.source.droppableId;
                let destTermId = result.destination.droppableId;
                this.props.dispatch(moveBetweenTerms(course, srcTermId, destTermId));
                break;
            default: 
                console.log("unsupported drag/drop type: " + result.type);
        }
    };
    
    toggleDirection() {
        var direction = this.state.direction === Slider.types.vertical ? 
            Slider.types.horizontal : Slider.types.vertical;
        this.setState({direction}, this.performScroll);
    }

    toggleLock() {
        this.setState({locked: !this.state.locked}, this.performScroll);
    }

    termInPast(term) {
        const now = new Date();
        const currentTerm = Math.floor(now.getMonth()/4) + 1;
        const currentYear = now.getYear() + 1900;
        if (term.termYear < currentYear ||
            (term.termYear === currentYear && term.termNum < currentTerm)) {
            return true; 
        }
        return false;
    }

    scrollTo(id) {
        if( this.courseRefs[id] && this.courseRefs[id].current ) {
            this.courseRefs[id].current.scrollIntoView({behavior: 'smooth'});
        }
    }

    performScroll() {
        var firstEnabled = this.props.terms.find(term => !this.state.locked || !this.termInPast(term));
        if(firstEnabled) {
            this.scrollTo(`course-${firstEnabled.id}`);
        } else {
            this.scrollTo("END");
        }
    }

    componentDidMount() {
        this.performScroll()
    }

    render() {
        const { courses, terms } = this.props; 

        const termCards = this.props.terms.map((term, index) => 
            <div ref={this.courseRefs["course-"+term.id]} key={index}><TermCard  
                term={term} 
                addCourses={()=>{   
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
                    }) || []
                }
                dispatch={this.props.dispatch}
                dragging={this.state.dragging}
                disabled={this.state.locked && this.termInPast(term)}
            /></div>);

        return (
            <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
                <div className="TermSlider">
                    <Slider direction={this.state.direction}>
                        {[...termCards,
                            /* TODO: move this to the options menu w/ a modal */
                            <div ref={this.courseRefs["END"]} key={terms.length}><AddTerm 
                                lastTerm={terms.length ? terms[terms.length-1] : null}
                                termNames={terms.map(term => term.name)}
                                dispatch={this.props.dispatch}
                            /></div>
                        ]}
                    </Slider>
                    <div className="options">
                        <div className={`direction ${this.state.direction === Slider.types.vertical ? "vertical" : "horizontal"}`}>
                            {this.state.direction === Slider.types.vertical ? 
                                <Horizontal className="icon" onClick={this.toggleDirection}/>
                            :
                                <Vertical className="icon" onClick={this.toggleDirection}/>
                            }
                        </div>
                        <div className={`lock ${this.state.locked ? "locked" : "unlocked"}`}>
                            <div className="icon" onClick={this.toggleLock}>
                                {this.state.locked ? <ClosedLock /> : <OpenLock />}
                            </div>
                        </div>
                    </div>                   
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
