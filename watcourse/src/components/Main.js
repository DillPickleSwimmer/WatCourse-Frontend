import React from 'react';
import { connect } from 'react-redux';

import '../styles/Main.css';

import TermSliderContainer from '../containers/TermSliderContainer';

import { getCourses } from '../actions/courseActions';
import { getTerms } from '../actions/termActions';


class Main extends React.Component {
    componentWillMount() {
        this.props.dispatch(getCourses());
        this.props.dispatch(getTerms());
    }

    render() {
        return (
        <div className="Main">
            <div className="content">
                <TermSliderContainer/>
            </div>
        </div>
        );
    }
}

Main.propTypes = {
};

export default connect((state)=>({
}))(Main);
