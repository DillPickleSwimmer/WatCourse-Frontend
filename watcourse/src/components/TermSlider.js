import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import '../styles/TermSlider.css';
import TermCard from './TermCard.js';
import { TermType } from '../types/types';

class TermSlider extends Component {
    render() {
        return (
            <div className="TermSlider">
                {this.props.terms.map((term, index) => <TermCard key={index} term={term} />)}
            </div>
        );
    }
}

TermSlider.propTypes = {
    terms: PropTypes.arrayOf(TermType).isRequired
};

export default TermSlider;
