import * as actionTypes from '../actionTypes/questionsActionTypes';
import axios from 'axios';
import { updOffsetInitial } from './offsetActions';
import { SERVERURL } from '../../serverURL';

export const addQuestion = (question) => async(dispatch) => {
    try {
        const response = await axios.post(`${SERVERURL}/api/question`, question, {
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

export const getQuestions = () => async(dispatch, getState) => {
    try {
        const {offset} = getState();
        const response = await axios.get(`${SERVERURL}/api/question/${offset}`);
        const parseRes = await response.data;
        dispatch({
            type: actionTypes.GET_QUESTIONS,
            payload: parseRes.slice(0, 20)
        })
        const hasMore = await parseRes.length > 20;
        return hasMore;

    } catch (err) {
        console.log(err);
    }
}

export const getInitialQuestions = () => async(dispatch) => {
    try {
        dispatch(updOffsetInitial());
        const response = await axios.get(`${SERVERURL}/api/question/0`);
        const parseRes = await response.data;
        dispatch({
            type: actionTypes.GET_INITIAL_QUESTIONS,
            payload: parseRes.slice(0, 20)
        })
        const hasMore = await parseRes.length > 20;
        return hasMore;
    } catch (err) {
        console.log(err);
    }
}

export const getQuestionsByUserId = () => async(dispatch, getState) => {
    try {
        const { userId, offset } = getState();
        const response = await axios.get(`${SERVERURL}/api/question/user/${userId}/${offset}`, {
            headers: {token: localStorage.token}
        });
        const parseRes = await response.data;
        dispatch({
            type: actionTypes.GET_QUESTIONS_BY_USERID,
            payload: parseRes.slice(0, 20)
        })
        const hasMore = await parseRes.length > 20;
        return hasMore;
    } catch (err) {
        console.log(err);
    }
}

export const getInitialQuestionsByUserId = () => async(dispatch, getState) => {
    try {
        const { userId } = getState();
        dispatch(updOffsetInitial());
        const response = await axios.get(`${SERVERURL}/api/question/user/${userId}/0`, {
            headers: {token: localStorage.token}
        });
        const parseRes = await response.data;

        dispatch({
            type: actionTypes.GET_INITIAL_QUESTIONS_BY_USERID,
            payload: parseRes.slice(0, 20)
        })
        const hasMore = await parseRes.length > 20;
        return hasMore;
    } catch (err) {
        console.log(err);
    }
}

