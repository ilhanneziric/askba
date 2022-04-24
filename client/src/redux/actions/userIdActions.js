import * as actionTypes from '../actionTypes/userIdActionTypes';
import socket from '../../Socket';

export const updUserId = id => {
    socket.emit('register', id);
    return {
        type: actionTypes.UPDATE_USERID,
        payload: id
    };
};