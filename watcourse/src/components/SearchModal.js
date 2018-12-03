import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import '../styles/SearchModal.css';
import { CourseSearchType } from '../types/types';
import { ReactComponent as CloseIcon } from '../images/icon_close.svg';
import { toggleSearchModal } from '../actions/modalActions';
import { deselectTerm } from '../actions/selectTermActions';
import { addToShortlist, removeFromShortlist } from '../actions/shortlistActions';
import { addToTerm } from '../actions/termActions';
import SearchResultCard from './SearchResultCard';
import ShortlistCard from './ShortlistCard';
import SearchBar from './SearchBar';

class SearchModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            openResult: null,
            openShortlist: null,
            results: [],
        }

        this.handleResultClick = this.handleResultClick.bind(this);
        this.handleShortlistClick = this.handleShortlistClick.bind(this);
        this.handleResultsUpdate = this.handleResultsUpdate.bind(this);
    }

    handleResultClick = (index) => {
        if (index === this.state.openResult) {
            this.setState({
                openResult: null,
                openShortlist: null,
            });
        } else {
            this.setState({
                openResult: index,
                openShortlist: null,
            });
        }
    }

    handleShortlistClick = (index) => {
        if (index === this.state.openShortlist) {
            this.setState({
                openResult: null,
                openShortlist: null,
            });
        } else {
            this.setState({
                openResult: null,
                openShortlist: index,
            });
        }
    }

    handleResultsUpdate = (results) => {
        this.setState({ results });
    }

    render() {
        return (
            <div className="SearchModal">
                <div className="background" />
                <div className="inner-modal">
                    <div className="modal-header">
                        <div className="title">
                            Search
                        </div>
                        <div className="close-icon" onClick={()=> {
                            this.props.dispatch(deselectTerm());
                            this.props.dispatch(toggleSearchModal(false));
                        }}>
                            <CloseIcon />
                        </div>
                    </div>
                    <div className="search-bar">
                        <SearchBar courses={this.props.courses} updateResults={this.handleResultsUpdate}/>
                    </div>
                    <div className="search-results">
                        {this.state.results.map((result, index) =>
                            <SearchResultCard 
                                key={index} 
                                course={result}
                                onClick={() => this.handleResultClick(index)}
                                expanded={this.state.openResult === index}
                                addToShortlist={() => {this.props.dispatch(addToShortlist(result))}}
                                addToTerm={() => {this.props.dispatch(addToTerm(this.props.selectedTerm, result))}}
                                selectedTerm={this.props.selectedTerm}
                            />
                        )}
                    </div>
                    <div className="shortlist">
                        <div className="title">Shortlist</div>
                        <div className="contents">
                            {this.props.shortlist.map((course, index) =>
                                <ShortlistCard 
                                    key={index} 
                                    course={course} 
                                    onClick={() => this.handleShortlistClick(index)}
                                    expanded={this.state.openShortlist === index}
                                    removeFromShortlist={()=>this.props.dispatch(removeFromShortlist(course))}
                                    addToTerm={() => {this.props.dispatch(addToTerm(this.props.selectedTerm, course))}}
                                    selectedTerm={this.props.selectedTerm}
                                />    
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SearchModal.propTypes = {
    courses: PropTypes.arrayOf(CourseSearchType).isRequired,
    shortlist: PropTypes.arrayOf(CourseSearchType).isRequired,
    selectedTerm: PropTypes.number,
};

export default SearchModal;
