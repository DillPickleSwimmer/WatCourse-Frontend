import React from 'react';
import { connect } from 'react-redux';

import { resetStore } from '../../actions/utilityActions';

class Reset extends React.Component {
    componentDidMount() {
        // reset store when the route is visited
        this.props.dispatch(resetStore());
    }

    render() {
        return null;
    }
}

export default connect()(Reset);;