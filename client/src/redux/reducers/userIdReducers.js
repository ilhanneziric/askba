import * as actionTypes from '../actionTypes/userIdActionTypes';

export const userIdReducer = (state = null, action) => {
    switch(action.type){
        case(actionTypes.UPDATE_USERID):
            return state = action.payload;
        default:
            return state;
    }
};