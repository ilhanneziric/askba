import *  as actionTypes from '../actionTypes/questionActionTypes';

export const questionReducer = (state = null, action) => {
    switch(action.type){
        case (actionTypes.UPDATE_QUESTION):
            return state = action.payload;
        case (actionTypes.GET_QUESTION):
            return state = action.payload;
        default:
            return state;
    }
}
