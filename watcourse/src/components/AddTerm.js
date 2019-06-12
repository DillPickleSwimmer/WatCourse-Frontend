import  React from 'react';
import { PropTypes } from 'prop-types';
import { TermType } from '../types/types';
import { addTerm } from '../actions/termActions';
import { TERMLABELS } from '../constants/names.js';

class AddTerm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            termLabel: TERMLABELS[0],
        }

        this.handleSelectLabel = this.handleSelectLabel.bind(this);
    }  

    handleSelectLabel(event) {
        this.setState({termLabel: event.target.value});
    }

    render() {
        return (
            <div className="AddTerm">
                <select value={this.state.termLabel} onChange={this.handleSelectLabel}>
                    {TERMLABELS.map(label => (
                        <option value={label}>{label}</option>
                    ))}
                </select>
                <button onClick={ () =>
                    this.props.dispatch(addTerm(this.props.lastTerm, this.state.termLabel))
                } >
                    (+) Term
                </button>   
            </div>
        );
    }
}

AddTerm.propTypes = {
    lastTerm: TermType.isRequired, 
    dispatch: PropTypes.func.isRequired,
};

export default AddTerm;
