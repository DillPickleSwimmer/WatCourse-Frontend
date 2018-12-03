import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import '../styles/ShortlistCard.css';
import { CourseSearchType } from '../types/types';

class ShortlistCard extends Component {
    render() {
        return (
            <div className="ShortlistCard" onClick={this.props.onClick}>
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

ShortlistCard.propTypes = {
    course: CourseSearchType.isRequired,
    expanded: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};

export default ShortlistCard;
