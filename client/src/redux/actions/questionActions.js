import *  as actionTypes from '../actionTypes/questionActionTypes';
import axios from 'axios';

export const updQuestion = (question) => {
    return {
        type: actionTypes.UPDATE_QUESTION,
        payload: question
    };
};

export const getQuestion = (questionid) => async(dispatch, getState) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/question/${questionid}`);
        const parseRes = await response.data;
        const {userId} = getState();
        parseRes.Answers = [...parseRes.Answers.filter(a => a.userId === userId), ...parseRes.Answers.filter(a => a.userId !== userId)];
        
        dispatch({
            type: actionTypes.GET_QUESTION,
            payload: parseRes  
        });
        return parseRes;
    } catch (err) {
        console.log(err.response.data);
    }
};




