import { connect } from 'react-redux';
import PrereqTree from '../components/PrereqTree';

// subscribe to redux store & merge into component props
const mapStateToProps = (state) => ({
    rules: state.prereqs,
});

// connect component w/ redux store
export default connect(mapStateToProps)(PrereqTree);