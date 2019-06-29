import React from "react";
import { PropTypes } from 'prop-types';
import { getPrerequsites } from '../actions/prereqActions';
import '../styles/Login.css';



class PrereqTree extends React.Component {
    componentWillMount() {
        const { subject, number} = this.props.routeParams;
        this.props.dispatch(getPrerequsites(subject, number));
    }
    render() {
        const { rules } = this.props;
        if (Object.entries(rules).length === 0 && rules.constructor === Object) {
            return;
        }
        console.log(this.props.rules)
        return (
            <div className="Login">
                    {this.props.routeParams.subject}  {this.props.routeParams.number}
            </div>
        );
    }
};

PrereqTree.propTypes = {
    rules: PropTypes.object,
};

export default PrereqTree;

