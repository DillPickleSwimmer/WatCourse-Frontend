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

// TODO: Set animation timeout / no animation mode for slow computers

class Sidebar extends React.Component {
    MINWIDTH = 375;
    DEFAULTWIDTH = 390;

    ANIMATIONINTERVAL = 10;
    ANIMATIONAMOUNT = 80;
    ANIMATIONDURATION = '0.5s';

    constructor(props) {
        super(props);

        this.resize = throttle(this.resize.bind(this), 1, 30); //throttle to stop lag
        this.initDrag = this.initDrag.bind(this);
        this.endDrag = this.endDrag.bind(this);
        this.onDragBarClick = this.onDragBarClick.bind(this);

        this.triggerOpen = this.triggerOpen.bind(this);
        this.triggerClose = this.triggerClose.bind(this);
        
        this.state = {
            width: 0,
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
        document.getElementById('sidebar-animation-width').style.transition = this.ANIMATIONDURATION;
        if ( this.props.open ) {
            this.triggerOpen();
        } else {
            this.triggerClose();
        }
    }

    // SIDEBAR RESIZE EVENTS

    resize(event) { 
        if( event && event.pageX !== 0) {
            this.updateWidth(event.pageX);
        }
    }

    initDrag(event) {
        if ( event ) {
            event.dataTransfer.setDragImage(event.target, -99999, -99999);   // hide drag ghost
            document.getElementById('sidebar-animation-width').style.transition = `0s`;
        }
    }

    endDrag() {
        document.getElementById('sidebar-animation-width').style.transition = this.ANIMATIONDURATION;
        if ( this.state.width < this.MINWIDTH ) {
            this.props.dispatch(closeSidebar());
        }
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
        document.getElementById('sidebar-animation-width').style.transition = this.ANIMATIONDURATION;
        this.updateWidth(this.DEFAULTWIDTH);
    }

    triggerClose() {
        document.getElementById('sidebar-animation-width').style.transition = this.ANIMATIONDURATION;
        this.updateWidth(0);
    }

    updateWidth(width) {
        document.getElementById('sidebar-animation-width').style.width = `${width}px`;
        this.setState({width});
    }

    // ******

    render() {
        const searchResultsDroppable = (
            <Droppable
                droppableId={JSON.stringify({type: 'SEARCH', id: 0})}
                type='COURSE'
                isDropDisabled={true}
            >
                {(provided)=> (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className='search-results'
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
                                            className='load-more'
                                            onClick={()=>this.props.dispatch(loadMoreResults())}
                                        >Load More Results</div>
                                    : null}
                                </div>);
                            } else {
                                return (<div>Search for courses above!</div>);
                            }
                        })()}
                    </div>
                )}
            </Droppable>
        );

        const shortlistDroppable = (
            <Droppable
                droppableId={JSON.stringify({type: 'SHORTLIST', id: 0})}
                type='COURSE'
                isDropDisabled={false}
                ignoreContainerClipping={true}
            >
                {(provided)=> (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className='shortlist'
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
                        ) : <div>Add some courses to your shortlist!</div>}
                        <div className='course-card-placeholder'>{provided.placeholder}</div>
                    </div>
                )}
            </Droppable>
        );

        return (
            <div className='Sidebar'>
                <div className='content' id='sidebar-animation-width'>
                    <SidebarSection 
                        title='Search Results' 
                        forceOpen={this.props.searchResults.length > 0}
                    >
                        {searchResultsDroppable}
                    </SidebarSection>
                    <SidebarSection 
                        title='Shortlist'
                        forceOpen={this.props.shortlist.length > 0}
                    >
                        {shortlistDroppable}
                    </SidebarSection>
                    <SidebarSection title='Tools' forceOpen={!this.props.searchResults.length && !this.props.shortlist.length}>
                        <button className='tool'>Prerequisite Tree</button>
                        <button className='tool coming-soon'>Auto-plan Courses (COMING SOON)</button>
                        <button className='tool coming-soon'>Import Transcript (COMING SOON)</button>
                    </SidebarSection>
                    <div className='padding-sidebar-section' />
                </div>
                <div 
                    className='drag-bar no-select' 
                    draggable='true' 
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