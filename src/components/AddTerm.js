import  React from 'react';
import { PropTypes } from 'prop-types';

import { TermType } from '../types/types';
import { TERMLABELS } from '../constants/names.js';

import { addTerm } from '../actions/termActions';

import '../styles/AddTerm.css';

import { ReactComponent as AddTermButton } from '../images/icon_add.svg';

import TermDropdown from './shared/TermDropdown';

class AddTerm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            termLabel: 0,
        };

        this.handleSelectLabel = this.handleSelectLabel.bind(this);
    }  

    handleSelectLabel(event) {
        this.setState({termLabel: event.target.value});
    }

    render() {
        return (
            <div className="AddTerm">
                <div className="title">Add Term:</div>
                <div className="name-select">
                    <TermDropdown onChange={this.handleSelectLabel} />
                </div>
                <div className="submit" onClick={ () =>
                        this.props.dispatch(addTerm(this.props.lastTerm, TERMLABELS[this.state.termLabel]))
                    }>
                    <AddTermButton className="icon" /> 
                    &nbsp;Add
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
