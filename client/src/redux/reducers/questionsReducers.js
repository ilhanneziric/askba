import * as actionTypes from '../actionTypes/questionsActionTypes';

export const questionReducer = (state = [], action) => {
    switch(action.type){
        case(actionTypes.ADD_QUESTION):
            const question = action.payload;
            return {
                ...state,
                questions: [...state.questions, question]
            };
        case(actionTypes.REMOVE_QUESTION):
            return{
                ...state,
                questions: state.questions.filter((x)=> x.id !== action.payload),
            };
        case(actionTypes.GET_QUESTIONS):
        return {
            questions: action.payload
        };
        default:
            return state;

    }
} 