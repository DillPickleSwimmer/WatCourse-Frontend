import { connect } from 'react-redux';
import SampleEndpoint from '../components/sampleComponent';

// subscribe to redux store & merge into component props
const mapStateToProps = (state) => ({
    sampleQuote: state.sampleQuote.sampleQuote.toString()
});

// connect component w/ redux store
export default connect(mapStateToProps)(SampleEndpoint);