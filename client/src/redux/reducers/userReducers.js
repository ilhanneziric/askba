import *  as actionTypes from '../actionTypes/userActionTypes';

export const userReducer = (state = null, action) => {
    switch(action.type){
        case (actionTypes.GET_USER):
            return state = action.payload;
        default:
            return state;
    }
}
