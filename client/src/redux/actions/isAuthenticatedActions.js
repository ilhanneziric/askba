import * as actionTypes from '../actionTypes/isAuthenticatedActionTypes';

export const updIsAuthenticated = isAuth => {
    return {
        type: actionTypes.UPDATE_ISAUTHENTICATED,
        payload: isAuth
    };
};