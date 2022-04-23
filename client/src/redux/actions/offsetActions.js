import * as actionTypes from '../actionTypes/offsetActionTypes';

export const updOffset = () => {
    return {
        type: actionTypes.UPDATE_OFFSET,
    };
};

export const updOffsetInceremnt = () => {
    return {
        type: actionTypes.UPDATE_OFFSET_INCREMENT,
    };
};

export const updOffsetInitial = () => {
    return {
        type: actionTypes.OFFSET_INITIAL,
    };
};