import * as actionTypes from '../actionTypes/isAuthenticatedActionTypes';

export const isAuthenticatedReducer = (state = true, action) => {
    switch(action.type){
        case(actionTypes.UPDATE_ISAUTHENTICATED):
            return state = action.payload;
        default:
            return state;
    }
};