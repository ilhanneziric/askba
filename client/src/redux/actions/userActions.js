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

export const updUser = (userData) => async(dispatch, getState) => {

    try {
        const {userId} = getState();
        const response = await axios.put(`http://localhost:5000/api/user/${userId}`, userData, {
            headers: {token: localStorage.token}
        });
        const parseRes = await response.data;
        dispatch({
            type: actionTypes.UPDATE_USER,
            payload: parseRes
        })
        return parseRes;
        
    } catch (err) {
        console.log(err.response.data);
    }
}