import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import '../styles/SearchModal.css';
import { CourseSearchType } from '../types/types';
import { ReactComponent as CloseIcon } from '../images/icon_close.svg';
import { toggleSearchModal } from '../actions/modalActions';
import SearchResultCard from './SearchResultCard';
import ShortlistCard from './ShortlistCard';

class SearchModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            openResult: null,
            openShortlist: null,
        }

        this.handleResultClick = this.handleResultClick.bind(this);
        this.handleShortlistClick = this.handleShortlistClick.bind(this);
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

    render() {
        var results = this.props.courses;

        return (
            <div className="SearchModal">
                <div className="background" />
                <div className="inner-modal">
                    <div className="modal-header">
                        <div className="title">
                            Search
                        </div>
                        <div className="close-icon" onClick={()=>this.props.dispatch(toggleSearchModal(false))}>
                            <CloseIcon />
                        </div>
                    </div>
                    <div className="search-bar">

                    </div>
                    <div className="search-results">
                        {results.map((result, index) =>
                            <SearchResultCard 
                                key={index} 
                                course={result}
                                onClick={() => this.handleResultClick(index)}
                                expanded={this.state.openResult === index}
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
    shortlist: PropTypes.arrayOf(CourseSearchType).isRequired
};

export default SearchModal;
