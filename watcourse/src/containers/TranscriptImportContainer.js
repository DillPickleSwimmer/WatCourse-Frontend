import { connect } from 'react-redux';
import TranscriptImport from '../components/TranscriptImport';

// subscribe to redux store & merge into component props
const mapStateToProps = (state) => ({
    error: state.error
});

// connect component w/ redux store
export default connect(mapStateToProps)(TranscriptImport);