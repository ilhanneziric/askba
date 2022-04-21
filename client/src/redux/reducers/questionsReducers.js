import * as actionTypes from '../actionTypes/questionsActionTypes';

export const questionsReducer = (state = [], action) => {
    switch(action.type){
        case(actionTypes.ADD_QUESTION):
            const question = action.payload;
            return {
                ...state,
                questions: [question,...state.questions]
            };
        case(actionTypes.REMOVE_QUESTION):
            return{
                ...state,
                questions: state.questions.filter((x)=> x.id !== action.payload),
            };
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