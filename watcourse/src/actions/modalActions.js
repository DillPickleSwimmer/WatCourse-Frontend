import {
    SEARCH_MODAL_TOGGLE
} from '../actions/types';

export const openSearchModal = () => ({
    type: SEARCH_MODAL_TOGGLE, open: null,
})

export const closeSearchModal = (email, password) => ({
    type: SEARCH_MODAL_TOGGLE, open: true,
})

export const toggleSearchModal = (email, password) => ({
    type: SEARCH_MODAL_TOGGLE, open: false, 
})