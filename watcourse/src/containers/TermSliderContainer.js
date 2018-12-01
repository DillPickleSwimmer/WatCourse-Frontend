import { connect } from 'react-redux';
import TermSlider from '../components/TermSlider';

// subscribe to redux store & merge into component props
const mapStateToProps = (state) => ({
    terms: state.terms,
});

// connect component w/ redux store
export default connect(mapStateToProps)(TermSlider);