import React, { Component } from 'react';
import { getQuoteAction } from '../actions/sampleActions';
import { PropTypes } from 'prop-types';

class SampleEndpoint extends Component {

    // right after our component renders.
    componentDidMount() {
        this.props.dispatch(getQuoteAction('param'));
    }

    render() {
        return (
            <div>
                {this.props.sampleQuote}
            </div>
        );
    }
}

SampleEndpoint.propTypes = {
    sampleQuote: PropTypes.string
};

export default SampleEndpoint;