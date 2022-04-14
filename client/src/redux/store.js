import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { isAuthenticatedReducer } from './reducers/isAuthenticatedReducers';
import { userIdReducer } from './reducers/userIdReducers';
import { questionReducer } from './reducers/questionsReducers';

const reducers = combineReducers({
    isAuthenticated: isAuthenticatedReducer,
    userId: userIdReducer,
    questions: questionReducer
});

const middleware = [thunk];

//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middleware)) );

export default store;