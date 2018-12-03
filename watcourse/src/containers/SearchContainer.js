import { connect } from 'react-redux';
import SearchModal from '../components/SearchModal';

// subscribe to redux store & merge into component props
const mapStateToProps = (state) => ({
    courses: state.courses,
    shortlist: [
        {
            code: "CS343",
            name: "Concurrent Programming",
            description: "A really painful course about uC++ concurrency with long hard assignments. Enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy!",
            prereqs: "A tormented soul is not required but recommended.",  
        },
        {
            code: "CS343",
            name: "Concurrent Programming Is A Great Course",
            description: "A really painful course about uC++ concurrency with long hard assignments. Enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy!",
            prereqs: "A tormented soul is not required but recommended.",  
        },
        {
            code: "CS343",
            name: "Concurrent Programming",
            description: "A really painful course about uC++ concurrency with long hard assignments. Enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy!",
            prereqs: "A tormented soul is not required but recommended.",  
        },
        {
            code: "CS343",
            name: "Concurrent Programming",
            description: "A really painful course about uC++ concurrency with long hard assignments. Enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy!",
            prereqs: "A tormented soul is not required but recommended.",  
        },
        {
            code: "CS343",
            name: "Concurrent Programming",
            description: "A really painful course about uC++ concurrency with long hard assignments. Enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy!",
            prereqs: "A tormented soul is not required but recommended.",  
        },
        {
            code: "CS343",
            name: "Concurrent Programming Is a Course",
            description: "A really painful course about uC++ concurrency with long hard assignments. Enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy!",
            prereqs: "A tormented soul is not required but recommended.",  
        },
        {
            code: "CS343",
            name: "Concurrent Programming",
            description: "A really painful course about uC++ concurrency with long hard assignments. Enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy enjoy!",
            prereqs: "A tormented soul is not required but recommended.",  
        },
    ],
});

// connect component w/ redux store
export default connect(mapStateToProps)(SearchModal);