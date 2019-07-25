import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';

// subscribe to redux store & merge into component props
const mapStateToProps = (state) => ({
    searchResults: state.search.results || [],
    allSearchResultsDisplayed: state.search.numResults <= state.search.numDisplayedResults,
    shortlist: state.shortlist || [],
    open: state.sidebar.open || false,
});

// connect component w/ redux store
export default connect(mapStateToProps)(Sidebar);