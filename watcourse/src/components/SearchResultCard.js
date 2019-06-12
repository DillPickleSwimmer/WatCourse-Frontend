import  React from 'react';
import { PropTypes } from 'prop-types';
import '../styles/SearchResultCard.css';
import { CourseSearchType } from '../types/types';

class SearchResultCard extends React.Component {
    render() {
        return (
            <div className="SearchResultCard">
                <div className="summary">
                    <div className="title" onClick={this.props.onClick}>
                        <div>{this.props.course.subject + this.props.course.num}</div>
                        <div>{this.props.course.title}</div>
                    </div>
                    <div className="links">
                        {this.props.addToShortlistText !== null  && <div onClick={this.props.addToShortlist}>{this.props.addToShortlistText}</div>}
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
    addToShortlistText: PropTypes.string,
};

export default SearchResultCard;
