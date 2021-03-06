import *  as actionTypes from '../actionTypes/questionActionTypes';
import axios from 'axios';
import { SERVERURL } from '../../serverURL';

export const updQuestion = (question) => {
    return {
        type: actionTypes.UPDATE_QUESTION,
        payload: question
    };
};

export const getQuestion = (questionid) => async(dispatch, getState) => {
    try {
        const response = await axios.get(`${SERVERURL}/api/question/getbyid/${questionid}`);
        const parseRes = await response.data;
        const {userId} = getState();
        parseRes.Answers = [...parseRes.Answers.filter(a => a.userId === userId), ...parseRes.Answers.filter(a => a.userId !== userId)];
        dispatch({
            type: actionTypes.GET_QUESTION,
            payload: parseRes  
        });
        return parseRes;
    } catch (err) {
        console.log(err);
    }
};

export const deleteQuestion = (id) => async(dispatch) => {
    try {
        const response = await axios.delete(`${SERVERURL}/api/question/${id}`, {
        headers: {token: localStorage.token}
      });
      const parseRes = await response.data;

        dispatch({
            type: actionTypes.DELETE_QUESTION,  
        });

        return parseRes;

    } catch (err) {
        console.log(err);
        return null;
    }
} 

export const editQuestion = (inputs) => async(dispatch, getState) => {
    try {
        const {question} = getState();
        const response = await axios.put(`${SERVERURL}/api/question/${question.id}`, inputs, {
            headers: {token: localStorage.token}
        });
        const parseRes = await response.data;
        dispatch({
            type: actionTypes.EDIT_QUESTION,
            payload: parseRes  
        });

        return parseRes;

    } catch (err) {
        console.log(err);
        return null;
    }
} 




