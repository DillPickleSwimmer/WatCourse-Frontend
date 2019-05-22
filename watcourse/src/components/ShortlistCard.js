import  React from 'react';
import { PropTypes } from 'prop-types';
import '../styles/ShortlistCard.css';
import { CourseSearchType } from '../types/types';
import { ReactComponent as RemoveIcon } from '../images/icon_minus.svg';

class ShortlistCard extends React.Component {
    render() {
        return (
            <div className="ShortlistCard" onClick={this.props.onClick}>
                <div className="summary">
                    <div className="summary-title">
                        <div>{this.props.course.subject + this.props.course.num}</div>
                        <div>{this.props.course.title}</div>
                    </div>
                    <div className="links">
                        <RemoveIcon className="icon" onClick={this.props.removeFromShortlist} />
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

ShortlistCard.propTypes = {
    course: CourseSearchType.isRequired,
    expanded: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    removeFromShortlist: PropTypes.func.isRequired, 
    addToTerm: PropTypes.func,
};

export default ShortlistCard;
