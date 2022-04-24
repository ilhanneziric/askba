import * as actionTypes from '../actionTypes/offsetActionTypes';

export const offsetReducer = (state = 20, action) => {
    switch(action.type){
        case(actionTypes.OFFSET_INITIAL):
            return state = 20;
        case(actionTypes.UPDATE_OFFSET_INCREMENT):
            return state+=1;
        case(actionTypes.UPDATE_OFFSET):
            return state+=20;
        default:
            return state;
    }
};