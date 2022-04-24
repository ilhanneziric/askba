import * as actionTypes from '../actionTypes/notificationsActionTypes';
import axios from 'axios';
import { SERVERURL } from '../../serverURL';

export const addNotification = () => async(dispatch, getState) => {
    try {
        const {question, user} = getState();
        const userName = (`${user?.firstName} ${user?.lastName}`.length) > 1 ? `${user?.firstName} ${user?.lastName}` : user?.email;

        const body = {
            text: `${userName} answered your question "${question.title}"`,
            seen: false,
            userId: question.User.id
        };
        const response = await axios.post(`${SERVERURL}/api/notification`, body, {
            headers: {token: localStorage.token}
        });
        const parseRes = await response.data;

        // dispatch({
        //     type: actionTypes.ADD_NOTIFICATION,
        //     payload: parseRes
        // });
    } catch (err) {
        console.log(err);
    }
};

export const getNotifications = () => async(dispatch, getState) => {
    try {
        const {userId} = getState();
        const response = await axios.get(`${SERVERURL}/api/notification/user/${userId}`, {
            headers: {token: localStorage.token}
        });
        const parseRes = await response.data;
        dispatch({
            type: actionTypes.GET_NOTIFICATIONS_BY_USERID,
            payload: parseRes
        });

        await axios.post(`${SERVERURL}/api/notification/user/${userId}`, {
          headers: {token: localStorage.token}
        });
    } catch (err) {
        console.log(err.response.data);      
    }
}