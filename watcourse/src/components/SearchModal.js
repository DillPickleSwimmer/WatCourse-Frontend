import  React from 'react';
import { PropTypes } from 'prop-types';
import '../styles/SearchModal.css';
import { CourseSearchType, TermType } from '../types/types';
import { ReactComponent as CloseIcon } from '../images/icon_close.svg';
import { toggleSearchModal } from '../actions/modalActions';
import { deselectTerm } from '../actions/selectTermActions';
import { addToShortlist, removeFromShortlist, getShortlist } from '../actions/shortlistActions';
import { addToTerm } from '../actions/termCourseActions';
import SearchResultCard from './SearchResultCard';
import ShortlistCard from './ShortlistCard';
import SearchBar from './SearchBar';

class SearchModal extends React.Component {
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

    componentDidMount() {
        this.props.dispatch(getShortlist())
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
                        <div className="icon" onClick={()=> {
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
                                addToTerm={() => {this.props.dispatch(addToTerm(this.props.selectedTerm.id, result))}}
                                addToTermText={this.props.selectedTerm && this.props.selectedTerm.courses.findIndex(c => c.id === result.id) < 0 ? "Add to Term" : null}
                                addToShortlistText={this.props.shortlist.findIndex(c => c.id === result.id) >= 0 ? null : "Add to Shortlist"}
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
                                    removeFromShortlist={()=>{this.props.dispatch(removeFromShortlist(course))}}
                                    addToTerm={() => {this.props.dispatch(addToTerm(this.props.selectedTerm.id, course))}}
                                    addToTermText={this.props.selectedTerm && this.props.selectedTerm.courses.findIndex(c => c.id === course.id) <  0 ? "Add to Term" : null}
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
    selectedTerm: TermType,
};

export default SearchModal;
