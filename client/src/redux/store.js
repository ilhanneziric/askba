import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { isAuthenticatedReducer } from './reducers/isAuthenticatedReducers';
import { userIdReducer } from './reducers/userIdReducers';
import { questionsReducer } from './reducers/questionsReducers';
import { questionReducer } from './reducers/questionReducers';
import { userReducer } from './reducers/userReducers';
import { offsetReducer } from './reducers/offsetReducers';
import { notificationsReducer } from './reducers/notificationsReducers';

const reducers = combineReducers({
    isAuthenticated: isAuthenticatedReducer,
    userId: userIdReducer,
    questions: questionsReducer,
    question: questionReducer,
    user: userReducer,
    offset: offsetReducer,
    notifications: notificationsReducer
});

const middleware = [thunk];


const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middleware)) );

export default store;