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

export const getQuestions = (offset) => async(dispatch) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/question/${offset}`);
        const parseRes = await response.data;
        dispatch({
            type: actionTypes.GET_QUESTIONS,
            payload: parseRes.slice(0, 5)
        })
        const hasMore = await parseRes.length > 5;
        return hasMore;

    } catch (err) {
        console.log(err);
    }
}

export const getInitialQuestions = () => async(dispatch) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/question/0`);
        const parseRes = await response.data;
        dispatch({
            type: actionTypes.GET_INITIAL_QUESTIONS,
            payload: parseRes.slice(0, 5)
        })
    } catch (err) {
        console.log(err);
    }
}

export const getQuestionsByUserId = (offset) => async(dispatch, getState) => {
    try {
        const { userId } = getState();
        const response = await axios.get(`http://localhost:5000/api/question/user/${userId}/${offset}`, {
            headers: {token: localStorage.token}
        });
        const parseRes = await response.data;
        dispatch({
            type: actionTypes.GET_QUESTIONS_BY_USERID,
            payload: parseRes.slice(0, 5)
        })
        const hasMore = await parseRes.length > 5;
        return hasMore;
    } catch (err) {
        console.log(err);
    }
}

export const getInitialQuestionsByUserId = () => async(dispatch, getState) => {
    try {
        const { userId } = getState();
        const response = await axios.get(`http://localhost:5000/api/question/user/${userId}/0`, {
            headers: {token: localStorage.token}
        });
        const parseRes = await response.data;

        dispatch({
            type: actionTypes.GET_INITIAL_QUESTIONS_BY_USERID,
            payload: parseRes.slice(0, 5)
        })
    } catch (err) {
        console.log(err);
    }
}