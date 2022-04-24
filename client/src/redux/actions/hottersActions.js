import * as actionTypes from '../actionTypes/hottersActionTypes';
import axios from "axios";

export const getHotters = () => async(dispatch) => {
    const responseQ = await axios.get("http://localhost:5000/api/question/hotquestions");
    const dataQuestions = await responseQ.data;
    dispatch({
        type: actionTypes.GET_HOT_QUESTIONS,
        payload: dataQuestions
    })
    const responseU = await axios.get("http://localhost:5000/api/user/hotusers");
    const dataUsers = await responseU.data;
    dispatch({
        type: actionTypes.GET_HOT_USERS,
        payload: dataUsers
    })
}