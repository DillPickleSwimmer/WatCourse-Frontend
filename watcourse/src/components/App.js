import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { PropTypes } from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';

import '../styles/App.css';

import Header from './Header';
import SidebarContainer from '../containers/SidebarContainer';

import { authenticate } from '../actions/authActions';
import SIGNUP_DETAILS from '../reducers/authReducer';
import { moveBetweenTerms, addToTerm, removeFromTermToShortlist } from '../actions/termCourseActions';
import { addToShortlist } from '../actions/shortlistActions';
import { CourseType } from '../types/types';

export const noAuthPages = ['/login', '/signup', '/sample'];

class App extends React.Component {

    /* LIFECYCLE */

    componentWillMount() {
        this.props.dispatch(authenticate());
        if(!this.props.auth && !noAuthPages.find((page)=>page === window.location.pathname)) browserHistory.push('/login');
        if(this.props.page === SIGNUP_DETAILS) browserHistory.push('/signup');
    }


    componentWillUpdate(nextProps) {
        if(this.props.auth && !nextProps.auth && !noAuthPages.find((page)=>page === window.location.pathname)) browserHistory.push('/login');
        if(this.props.page === SIGNUP_DETAILS) browserHistory.push('/signup');
    }

    /* ********* */

    /* DRAG & DROP */

    onDragEnd = (result) => {
        // dropped nowhere
        if (!result.destination) {
            return;
        }

        // did not move
        if (result.destination.droppableId === result.source.droppableId) {
            return;
        }

        switch(result.type) {
            case "COURSE":   
                let course = JSON.parse(result.draggableId);
                let source = JSON.parse(result.source.droppableId);
                let destination = JSON.parse(result.destination.droppableId);
                let fullCourse = this.props.courses.find(c => c.id === course.id); 

                // term to term
                if ( source.type === "TERM" && destination.type === "TERM" ) {
                    this.props.dispatch(moveBetweenTerms(fullCourse, source.id, destination.id));
                }
                // shortlist to term
                else if ( source.type === "SHORTLIST" && destination.type === "TERM" ) {
                    this.props.dispatch(addToTerm(destination.id, fullCourse));
                } 
                // term to shortlist 
                else if ( source.type === "TERM" && destination.type === "SHORTLIST" ) {
                    this.props.dispatch(removeFromTermToShortlist(source.id, fullCourse));
                }   
                // search to term
                else if ( source.type === "SEARCH" && destination.type === "TERM" ) {
                    this.props.dispatch(addToTerm(destination.id, fullCourse));
                } 
                // search to shortlist 
                else if ( source.type === "SEARCH" && destination.type === "SHORTLIST" ) {
                    this.props.dispatch(addToShortlist(fullCourse));
                } 

                break;
            default: 
                console.log("unsupported drag/drop type: " + result.type);
        }
    };

    /* ********* */

    render() {
        return (
            <div className="App">
                <div className="inner">
                    <Header className="header" defaultSearchValue={this.props.query} />
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <div className="content">
                            {this.props.auth ? 
                                <SidebarContainer /> 
                            : null}  
                            <div className="main-screen">{this.props.children}</div>
                        </div>
                    </DragDropContext>
                    <div className="footer">
                        <div className="innerFooter">
                            <a href="https://github.com/DillPickleSwimmer/WatCourse-Frontend">Frontend Github</a>
                            <a href="https://github.com/SiddharthVaknalli/WatCourse-backend">Backend Github</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    auth: PropTypes.bool.isRequired,
    page: PropTypes.string,
    courses: PropTypes.arrayOf(CourseType).isRequired,
    query: PropTypes.string,
    children: PropTypes.object.isRequired
};

export default connect((state)=>({
    auth: state.auth.authenticated,
    page: state.auth.page,
    query: state.search.query,
    courses: state.courses,
}))(App);
