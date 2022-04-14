import * as actionTypes from '../actionTypes/questionsActionTypes';
import axios from 'axios';

export const addQuestion = (question) => async(dispatch) => {
    try {
        const response = await axios.post('http://localhost:5000/api/question', question, {
        headers: {token: localStorage.token}
        });
        const parseRes = await response.data;

        dispatch({
            type: actionTypes.ADD_QUESTION,
            payload: parseRes  
        });

        return parseRes;

    } catch (err) {
        console.log(err);
        return null;
    }
} 

export const getQuestions = () => async(dispatch) => {
    try {
        const {data} = await axios.get("http://localhost:5000/api/question");
        dispatch({
            type: actionTypes.GET_QUESTIONS,
            payload: data
        })
    } catch (err) {
        console.log(err);
    }
}