import axios from 'axios';
import * as actionTypes from '../actionTypes/isAuthenticatedActionTypes';

import { updUserId } from '../actions/userIdActions';
import { SERVERURL } from '../../serverURL';

export const updIsAuthenticated = () => async(dispatch) => {
    try {

        if(localStorage.getItem('token') !== null){
            const response = await axios.get(`${SERVERURL}/api/auth/is-verify`, {
                headers: {token: localStorage.token}
            });
            const parseRes = await response.data;
            dispatch({
                type: actionTypes.UPDATE_ISAUTHENTICATED,
                payload: parseRes.isAuthenticated  
            });
            dispatch(updUserId(parseRes.userId));
        }else{
            dispatch({
                type: actionTypes.UPDATE_ISAUTHENTICATED,
                payload: false  
            });
            dispatch(updUserId(null));
        }
        
    } catch (err) {
        console.log(err);
        dispatch({
            type: actionTypes.UPDATE_ISAUTHENTICATED,
            payload: false  
        });
        dispatch(updUserId(null));
    }
}