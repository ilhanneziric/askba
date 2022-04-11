import * as actionTypes from '../actionTypes/userIdActionTypes';

export const updUserId = id => {
    return {
        type: actionTypes.UPDATE_USERID,
        payload: id
    };
};