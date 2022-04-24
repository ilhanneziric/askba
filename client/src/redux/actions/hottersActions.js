import * as actionTypes from '../actionTypes/hottersActionTypes';
import axios from "axios";
import { SERVERURL } from '../../serverURL';

export const getHotters = () => async(dispatch) => {
    const responseQ = await axios.get(`${SERVERURL}/api/question/hotquestions`);
    const dataQuestions = await responseQ.data;
    dispatch({
        type: actionTypes.GET_HOT_QUESTIONS,
        payload: dataQuestions
    })
    const responseU = await axios.get(`${SERVERURL}/api/user/hotusers`);
    const dataUsers = await responseU.data;
    dispatch({
        type: actionTypes.GET_HOT_USERS,
        payload: dataUsers
    })
}