import * as actionTypes from '../actionTypes/hottersActionTypes';

export const hottersReducer = (state = {users: [], questions: []}, action) => {
    switch(action.type){
        case(actionTypes.GET_HOT_QUESTIONS):
            return {
                ...state,
                questions: action.payload
            }
        case(actionTypes.GET_HOT_USERS):
            return {
                ...state,
                users: action.payload
            }
        default:
            return state;
    }
}