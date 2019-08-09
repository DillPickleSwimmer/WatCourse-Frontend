import  React from 'react';
import { PropTypes } from 'prop-types';

import { TERMLABELS } from '../../constants/names.js';

class TermDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            termLabel: this.props.defaultValue ? TERMLABELS[this.props.defaultValue] : TERMLABELS[0],
        };

        this.handleSelectLabel = this.handleSelectLabel.bind(this);
    }  

    handleSelectLabel(event) {
        this.props.onChange(event);
        this.setState({termLabel: event.target.value});
    }

    render() {
        var filteredTermLabels = TERMLABELS;
        return (
            <select value={this.state.termLabel} onChange={this.handleSelectLabel}>
                {filteredTermLabels.map((label, index) => (
                    <option value={index} key={index}>{label}</option>
                ))}
            </select>
        );
    }
}

TermDropdown.propTypes = {
    onChange: PropTypes.func,
    defaultValue: PropTypes.number,
}

TermDropdown.defaultProps = {
    defaultValue: 0,
}

export default TermDropdown;