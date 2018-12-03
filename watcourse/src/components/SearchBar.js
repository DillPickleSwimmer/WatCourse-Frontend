import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import '../styles/SearchBar.css';
import { CourseSearchType } from '../types/types';

class SearchBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            results: [],
            searchStr: '',
        }

        this.handleTyping = this.handleTyping.bind(this);
    }

    componentWillUpdate(nextProps, nextState) {
        if(nextState.results !== this.state.results) {
            this.props.updateResults(nextState.results.slice(0,20));
        }
    }

    filterString(str) {
        return str.toUpperCase().replace(/\s/g,'').replace(/\W/g, '');
    }

    handleTyping = (event) => {
        var searchStr = this.filterString(event.target.value);
        var results = searchStr.length > 0 ? (
            (searchStr.length > this.state.searchStr.length && this.state.results.length > 0) ? 
                this.state.results : this.props.courses
            ) : [];
        results = results.filter((course) => 
            
            this.filterString(course.subject + course.num).substring(0,searchStr.length) === searchStr ||
            this.filterString(course.title).substring(0,searchStr.length) === searchStr
        );

        this.setState({ searchStr, results });
    }

    render() {
        return (
            <div className="SearchBar">
                <input
                    type="text"
                    placeholder="CS101"
                    value={this.state.searchStr}
                    onChange={this.handleTyping}
                />
            </div>
        );
    }
}

SearchBar.propTypes = {
    courses: PropTypes.arrayOf(CourseSearchType).isRequired,
    updateResults: PropTypes.func.isRequired,
};

export default SearchBar;
