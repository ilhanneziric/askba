import *  as actionTypes from '../actionTypes/userActionTypes';
import axios from 'axios';

export const getUser = (userid) => async(dispatch, getState) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/user/${userid}`);
        const parseRes = await response.data;
        
        dispatch({
            type: actionTypes.GET_USER,
            payload: parseRes  
        });
        return parseRes;
    } catch (err) {
        console.log(err.response.data);
    }
};