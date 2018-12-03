import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import '../styles/SearchResultCard.css';
import { CourseSearchType } from '../types/types';

class SearchResultCard extends Component {
    render() {
        return (
            <div className="SearchResultCard" onClick={this.props.onClick}>
                <div className="summary">
                    <div className="title">
                        <div>{this.props.course.subject + this.props.course.num}</div>
                        <div>{this.props.course.title}</div>
                    </div>
                    <div className="links">
                        <div onClick={this.props.addToShortlist}>Add to Shortlist</div>
                        {this.props.selectedTerm !== null && <div onClick={this.props.addToTerm}>Add to Term </div>}
                    </div>
                </div>
                {this.props.expanded && <div className="content">
                    <div><i>Description:</i> {this.props.course.description}</div>
                    <div><i>Prereqs:</i> {this.props.course.prereqs}</div>
                </div>}
            </div>
        );
    }
}

SearchResultCard.propTypes = {
    course: CourseSearchType,
    expanded: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    selectedTerm: PropTypes.number, 
    addToShortlist: PropTypes.func.isRequired,
    addToTerm: PropTypes.func,
};

export default SearchResultCard;
