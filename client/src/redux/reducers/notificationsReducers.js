import * as actionTypes from '../actionTypes/notificationsActionTypes';

export const notificationsReducer = (state = [], action) => {
    switch(action.type){
        case(actionTypes.GET_NOTIFICATIONS_BY_USERID):
            return state = action.payload;
        // case(actionTypes.SET_NOTIFICATIONS_SEEN):
        //     return state = state.map((n) => ({...n, seen:true}));
        default:
            return state;
    }
} 