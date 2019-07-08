import { connect } from 'react-redux';
import PasswordReset from '../components/PasswordReset';

const mapStateToProps = (state) => ({
    msg: state.auth.msg,
    error: state.auth.error && state.auth.error.message,
});

// connect component w/ redux store
export default connect(mapStateToProps)(PasswordReset);