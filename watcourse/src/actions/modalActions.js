import {
    SEARCH_MODAL_TOGGLE
} from '../actions/types';

export const openSearchModal = () => ({
    type: SEARCH_MODAL_TOGGLE, open: null
})

export const closeSearchModal = () => ({
    type: SEARCH_MODAL_TOGGLE, open: true
})

export const toggleSearchModal = () => ({
    type: SEARCH_MODAL_TOGGLE, open: false
})