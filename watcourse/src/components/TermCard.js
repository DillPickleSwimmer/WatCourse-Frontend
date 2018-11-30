import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import '../styles/TermCard.css';
import CourseCard from './CourseCard';
import { ReactComponent as Pencil } from '../images/icon_pencil.svg';

class TermCard extends Component {
    render() {
        return (
            <div className="TermCard">
                <div className="header">
                    <div className="title">{`${this.props.season} ${this.props.year} - ${this.props.term}`}</div>
                    <Pencil />
                </div>
                <div className="courses">
                    {this.props.courses}
                </div>
            </div>
        );
    }
}

TermCard.propTypes = {
    season: PropTypes.oneOf(['Fall', 'Spring', 'Winter']).isRequired,
    year: PropTypes.number.isRequired, 
    term: PropTypes.string.isRequired, 
    courses: PropTypes.arrayOf(PropTypes.instanceOf(CourseCard))
};

export default TermCard;
