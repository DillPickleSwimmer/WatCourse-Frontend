import { connect } from 'react-redux';
import SearchModal from '../components/SearchModal';

// subscribe to redux store & merge into component props
const mapStateToProps = (state) => ({
    courses: state.courses,
    selectedTerm: state.selectedTerm,
    shortlist: state.shortlist,
});

// connect component w/ redux store
export default connect(mapStateToProps)(SearchModal);