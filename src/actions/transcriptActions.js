import {
    POST_TRANSCRIPT_REQUEST,
} from './types';

export const postTranscript = (transcript) => ({
    type: POST_TRANSCRIPT_REQUEST, transcript
});