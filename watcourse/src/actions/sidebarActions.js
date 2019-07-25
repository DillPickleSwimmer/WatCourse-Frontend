import {
    TOGGLE_SIDEBAR, TOGGLE_SIDEBAR_SEARCH
} from '../actions/types';

export const openSidebar = () => ({
    type: TOGGLE_SIDEBAR, open: true
});

export const closeSidebar = () => ({
    type: TOGGLE_SIDEBAR, open: false
});

export const toggleSidebar = () => ({
    type: TOGGLE_SIDEBAR
});

export const openSidebarSearch = () => ({
    type: TOGGLE_SIDEBAR_SEARCH, open: true
});

export const closeSidebarSearch = () => ({
    type: TOGGLE_SIDEBAR_SEARCH, open: false
});

export const toggleSidebarSearch = () => ({
    type: TOGGLE_SIDEBAR_SEARCH
});