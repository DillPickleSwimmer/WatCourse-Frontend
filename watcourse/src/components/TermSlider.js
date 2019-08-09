import  React from 'react';
import { PropTypes } from 'prop-types';

import '../styles/TermSlider.css';

import TermCard from './TermCard';
import AddTerm from './AddTerm';
import Slider from './shared/Slider';

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
            locked: true,
            recentlySelectedTermId: null,
        }
    }
    
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
            <div ref={this.courseRefs["course-"+term.id]} key={index} style={{"display": "flex", "height": "100%"}}><TermCard
                term={term} 
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
                disabled={this.state.locked && this.termInPast(term)}
            /></div>);

        return (
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
                    <div className={`hover-notif direction ${this.state.direction === Slider.types.vertical ? "vertical" : "horizontal"}`}>
                        {this.state.direction === Slider.types.vertical ? 
                            <Horizontal className="icon" onClick={this.toggleDirection}/>
                        :
                            <Vertical className="icon" onClick={this.toggleDirection}/>
                        }
                    </div>
                    <div className={`hover-notif lock ${this.state.locked ? "locked" : "unlocked"}`}>
                        <div className="icon" onClick={this.toggleLock}>
                            {this.state.locked ? <ClosedLock /> : <OpenLock />}
                        </div>
                    </div>
                </div>                   
            </div>
        );
    }
}

TermSlider.propTypes = {
    terms: PropTypes.arrayOf(TermType).isRequired,
    courses: PropTypes.arrayOf(CourseType).isRequired
};

export default TermSlider;
