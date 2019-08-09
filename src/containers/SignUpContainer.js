import { connect } from 'react-redux';
import SignUp from '../components/SignUp';

// subscribe to redux store & merge into component props
const mapStateToProps = (state) => ({
    auth: state.auth.authenticated, 
    page: state.auth.page, 
    error: state.auth.error,
    programs: state.programs
});

// connect component w/ redux store
export default connect(mapStateToProps)(SignUp);