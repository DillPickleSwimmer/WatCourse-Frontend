import  React from 'react';
import { PropTypes } from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';

import '../styles/Sidebar.css';

import { CourseSearchType } from '../types/types';

import { throttle } from '../utilities/throttle';

import SidebarSection from './SidebarSection';
import CourseCard from './CourseCard';

import { removeFromShortlist } from '../actions/shortlistActions';
import { openSidebar, closeSidebar } from '../actions/sidebarActions';
import { loadMoreResults } from '../actions/searchActions';
import { getShortlist } from '../actions/shortlistActions';

// TODO: Set animation timeout / no animation mode for slow computers

class Sidebar extends React.Component {
    MINWIDTH = 375;
    DEFAULTWIDTH = 380;

    ANIMATIONINTERVAL = 10;
    ANIMATIONAMOUNT = 80;

    constructor(props) {
        super(props);

        this.resize = throttle(this.resize.bind(this), 1, 50); //throttle to stop lag
        this.initDrag = this.initDrag.bind(this);
        this.endDrag = this.endDrag.bind(this);
        this.onDragBarClick = this.onDragBarClick.bind(this);

        this.open = this.open.bind(this);
        this.triggerOpen = this.triggerOpen.bind(this);
        this.close = this.close.bind(this);
        this.triggerClose = this.triggerClose.bind(this);
        
        this.state = {
            width: 0,
            initDif: 0,
            animateInterval: 0,
        }
    }

    componentDidUpdate(prevProps) {
        if ( this.props.open !== prevProps.open ) {
            if ( this.props.open ) {
                this.triggerOpen();
            } else {
                this.triggerClose();
            }
        }
    }

    componentDidMount() {
        this.props.dispatch(getShortlist());
        if ( this.props.open ) {
            this.triggerOpen();
        } else {
            this.triggerClose();
        }
    }

    // SIDEBAR RESIZE EVENTS

    isOpen() {
        return this.state.width >= this.MINWIDTH;
    }

    resize(event) {
        if( event && event.pageX !== 0) {
            this.setState({width: event.pageX - this.state.initDif});
        }
    }

    initDrag(event) {
        if ( event ) {
            console.log(event);
            event.dataTransfer.setDragImage(event.target, -99999, -99999);   // hide drag ghost
            this.setState({initDif: event.pageX - this.state.width});
        }
    }

    endDrag() {
        if ( this.state.width < this.MINWIDTH ) {
            this.props.dispatch(closeSidebar());
        }
        this.setState({initDif: 0});
    }

    onDragBarClick() {
        if ( this.props.open ) 
            this.props.dispatch(closeSidebar());
        else 
            this.props.dispatch(openSidebar());
    }

    // ******

    // OPEN/CLOSE ANIMATION EVENTS

    triggerOpen() {
        clearInterval(this.state.animateInterval);
        this.setState({animateInterval:  setInterval(this.open, this.ANIMATIONINTERVAL)});
    }

    open() {
        if ( this.state.width >= this.DEFAULTWIDTH ) {
            clearInterval(this.state.animateInterval);
            this.setState({animateInterval: 0});
        } else {
            this.setState({width: this.state.width + this.ANIMATIONAMOUNT});
        }
    }

    triggerClose() {
        clearInterval(this.state.animateInterval);
        this.setState({animateInterval:  setInterval(this.close, this.ANIMATIONINTERVAL)});
    }

    close() {
        if ( this.state.width <= 0 ) {
            clearInterval(this.state.animateInterval);
            this.setState({width: 0, animateInterval: 0});
        } else {
            this.setState({width: this.state.width - this.ANIMATIONAMOUNT});
        }
    }

    // ******

    render() {
        const searchResultsDroppable = (
            <Droppable
                droppableId={JSON.stringify({type: "SEARCH", id: 0})}
                type="COURSE"
                isDropDisabled={true}
            >
                {(provided)=> (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="search-results"
                    > 
                        {/* TODO: insert courses into course placeholder and don't insert between course cards 
                            OR support re-ordering */}
                        {(() => {
                            if( this.props.searchResults.length ) {
                                return (<div>
                                    {this.props.searchResults.map((course, index) => 
                                        course ? <CourseCard 
                                            key={index} 
                                            index={index}
                                            course={course} 
                                            removeFromTerm={null}
                                        /> : null
                                    )}
                                    {!this.props.allSearchResultsDisplayed ? 
                                        <div 
                                            className="load-more"
                                            onClick={()=>this.props.dispatch(loadMoreResults())}
                                        >Load More Results</div>
                                    : null}
                                </div>);
                            } else {
                                return (<div>Empty</div>);
                            }
                        })()}
                    </div>
                )}
            </Droppable>
        );

        const shortlistDroppable = (
            <Droppable
                droppableId={JSON.stringify({type: "SHORTLIST", id: 0})}
                type="COURSE"
                isDropDisabled={false}
                ignoreContainerClipping={true}
            >
                {(provided)=> (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="shortlist"
                    > 
                        {/* TODO: insert courses into course placeholder and don't insert between course cards 
                            OR support re-ordering */}
                        {this.props.shortlist.length ? this.props.shortlist.map((course, index) => 
                            course ? <CourseCard 
                                key={index} 
                                index={index}
                                course={course} 
                                removeFromTerm={()=>{this.props.dispatch(removeFromShortlist(course))}}
                            /> : null
                        ) : <div>Empty</div>}
                        <div className="course-card-placeholder">{provided.placeholder}</div>
                    </div>
                )}
            </Droppable>
        );

        return (
            <div className="Sidebar">
                <div className="content" style={{width: `${this.state.width}px`}}>
                    <SidebarSection 
                        title="Search Results" 
                        forceOpen={this.props.searchResults.length > 0}
                    >
                        {searchResultsDroppable}
                    </SidebarSection>
                    <SidebarSection 
                        title="Shortlist"
                        forceOpen={this.props.shortlist.length > 0}
                    >
                        {shortlistDroppable}
                    </SidebarSection>
                    <SidebarSection title="Tools" forceOpen={!this.props.searchResults.length && !this.props.shortlist.length}>
                        <button className="tool">Prerequisite Tree</button>
                        <button className="tool coming-soon">Auto-plan Courses (COMING SOON)</button>
                        <button className="tool coming-soon">Import Transcript (COMING SOON)</button>
                    </SidebarSection>
                    <div className="padding-sidebar-section" />
                </div>
                <div 
                    className="drag-bar no-select" 
                    draggable="true" 
                    onDrag={this.resize}
                    onDragStart={this.initDrag}
                    onDragEnd={this.endDrag}
                    onClick={this.onDragBarClick}
                ><span>{this.state.width > 0 ? `<` : `>`}</span></div>
            </div>
        )
    }
}

Sidebar.propTypes = {
    searchResults: PropTypes.arrayOf(CourseSearchType).isRequired,
    allSearchResultsDisplayed: PropTypes.bool.isRequired,
    shortlist: PropTypes.arrayOf(CourseSearchType).isRequired,
    open: PropTypes.bool.isRequired,
};

export default Sidebar;