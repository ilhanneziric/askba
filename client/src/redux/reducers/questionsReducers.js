import * as actionTypes from '../actionTypes/questionsActionTypes';

export const questionsReducer = (state = [], action) => {
    switch(action.type){
        case(actionTypes.ADD_QUESTION):
            return state = [action.payload, ...state];
        case(actionTypes.REMOVE_QUESTION):
            return state = state.filter((x) => x.id !== action.payload);
        case(actionTypes.GET_QUESTIONS):
            return state = [...state, ...action.payload];
        case(actionTypes.GET_QUESTIONS_BY_USERID):
            return state = [...state, ...action.payload];
        case(actionTypes.GET_INITIAL_QUESTIONS):
            return state = action.payload;
        case(actionTypes.GET_INITIAL_QUESTIONS_BY_USERID):
            return state = action.payload;
        default:
            return state;
    }
} 