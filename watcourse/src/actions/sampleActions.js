import { GET_QUOTE_REQUEST } from './types';

export const getQuoteAction = (quote) => ({
    type: GET_QUOTE_REQUEST, quote
})