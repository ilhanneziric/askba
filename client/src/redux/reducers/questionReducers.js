import *  as actionTypes from '../actionTypes/questionActionTypes';

export const questionReducer = (state = null, action) => {
    switch(action.type){
        case (actionTypes.UPDATE_QUESTION):
            return state = action.payload;
        case (actionTypes.GET_QUESTION):
            return state = action.payload;
        case (actionTypes.EDIT_QUESTION):
            return state = action.payload;
        case (actionTypes.DELETE_QUESTION):
            return state = null;
        default:
            return state;
    }
}
