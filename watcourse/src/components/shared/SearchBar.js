import  React from 'react';
import { PropTypes } from 'prop-types';

import '../../styles/shared/SearchBar.css';

import { CourseSearchType } from '../../types/types';

import { ReactComponent as SearchIcon } from '../../images/icon_search.svg';

class SearchBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            searchStr: '',
        }

        this.handleTyping = this.handleTyping.bind(this);
    }

    componentDidUpdate(_, prevState) {
        if ( this.state.searchStr !== prevState.searchStr ) {
            this.props.updateQuery(this.state.searchStr);
        }
    }

    componentDidMount() {
        if ( this.props.defaultValue !== this.state.searchStr ) {
            this.setState({ searchStr: this.props.defaultValue });
        }
    }

    handleTyping = (event) => {
        this.setState({ searchStr: event.target.value });
    }

    render() {
        return (
            <div className="SearchBar">
                <SearchIcon className="small-icon" />
                <input 
                    type="text"
                    placeholder="Search" 
                    value={this.state.searchStr}
                    onChange={this.handleTyping}
                />
            </div>
        );
    }
}

SearchBar.propTypes = {
    updateQuery: PropTypes.func.isRequired,
    defaultValue: PropTypes.string, 
};

export default SearchBar;
