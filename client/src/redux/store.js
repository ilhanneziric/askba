import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { isAuthenticatedReducer } from './reducers/isAuthenticatedReducers';
import { userIdReducer } from './reducers/userIdReducers';
import { questionsReducer } from './reducers/questionsReducers';
import { questionReducer } from './reducers/questionReducers';

const reducers = combineReducers({
    isAuthenticated: isAuthenticatedReducer,
    userId: userIdReducer,
    questions: questionsReducer,
    question: questionReducer
});

const middleware = [thunk];


const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middleware)) );

export default store;