import {
    REPORT_BUG_REQUEST, SUBMIT_FEEDBACK_REQUEST,
} from '../actions/types';

export const reportBug = (msg, screenshots) => ({
    type: REPORT_BUG_REQUEST, msg, screenshots
});

export const submitFeedback = (satisfaction, helpful, challenges, features) => ({
    type: SUBMIT_FEEDBACK_REQUEST, satisfaction, helpful, challenges, features
})
