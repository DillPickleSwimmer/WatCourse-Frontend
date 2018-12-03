import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import '../styles/TermSlider.css';
import TermCard from './TermCard.js';
import { TermType } from '../types/types';
import { openSearchModal } from '../actions/modalActions';
import { selectTerm } from '../actions/selectTermActions';

class TermSlider extends Component {
    render() {
        return (
            <div className="TermSlider">
                {this.props.terms.map((term, index) => 
                    <TermCard 
                        key={index} 
                        term={term} 
                        addCourses={()=>{   // UPDATE TO USE TERM ID NOT INDEX
                            this.props.dispatch(selectTerm(term.id));
                            this.props.dispatch(openSearchModal(true));
                        }}
                        dispatch={this.props.dispatch}
                    />)
                }
            </div>
        );
    }
}

TermSlider.propTypes = {
    terms: PropTypes.arrayOf(TermType).isRequired
};

export default TermSlider;
