import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import '../styles/SearchResultCard.css';
import { CourseSearchType } from '../types/types';

class SearchResultCard extends Component {
    render() {
        return (
            <div className="SearchResultCard" onClick={this.props.onClick}>
                <div className="summary">
                    <div>{this.props.course.code}</div>
                    <div>{this.props.course.name}</div>
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
    onClick: PropTypes.function,
};

export default SearchResultCard;
