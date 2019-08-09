import React from 'react';
import { getQuoteAction } from '../actions/sampleActions';
import { getFlowCourse } from '../actions/courseActions';

import { PropTypes } from 'prop-types';

class SampleEndpoint extends React.Component {

    // right after our component renders.
    componentDidMount() {
        this.props.dispatch(getFlowCourse('CS341', 4392));
    }

    render() {
        const course = this.props.courses.find(c => c.id === 4392);
        
        let flow;
        if(course) flow = course.flow;
        return (
            <div>
                <div>
                    Flow details: 
                    {flow && flow.ratings && flow.ratings.map(r => `type: ${r.name} value: ${r.rating}`)}
                    {flow && flow.ratings && <a href={flow.link}> View on flow </a>}
                </div>
                
            </div>

        );
    }
}

SampleEndpoint.propTypes = {
    sampleQuote: PropTypes.string
};

export default SampleEndpoint;