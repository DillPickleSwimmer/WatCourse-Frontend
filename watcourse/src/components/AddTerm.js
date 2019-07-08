import  React from 'react';
import { PropTypes } from 'prop-types';
import { TermType } from '../types/types';
import { addTerm } from '../actions/termActions';
import { TERMLABELS } from '../constants/names.js';
import '../styles/AddTerm.css';

class AddTerm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            termLabel: TERMLABELS[0],
        };

        this.handleSelectLabel = this.handleSelectLabel.bind(this);
    }  

    handleSelectLabel(event) {
        this.setState({termLabel: event.target.value});
    }

    render() {
        var filteredTermLabels = TERMLABELS.filter(name => !this.props.termNames.find(tname => tname === name));
        return (
            <div className="AddTerm">
                <div className="name-select">
                    <select value={this.state.termLabel} onChange={this.handleSelectLabel}>
                        {filteredTermLabels.map((label, index) => (
                            <option value={label} key={index}>{label}</option>
                        ))}
                    </select>
                </div>
                <div className="submit">
                    <button onClick={ () =>
                        this.props.dispatch(addTerm(this.props.lastTerm, this.state.termLabel))
                    } >
                        (+) Term
                    </button>   
                </div>
            </div>
        );
    }
}

AddTerm.propTypes = {
    lastTerm: TermType, 
    termNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    dispatch: PropTypes.func.isRequired,
};

export default AddTerm;
