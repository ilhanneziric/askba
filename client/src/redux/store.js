import { createStore, combineReducers} from 'redux';

import { isAuthenticatedReducer } from './reducers/isAuthenticatedReducers';
import { userIdReducer } from './reducers/userIdReducers';

const reducers = combineReducers({
    isAuthenticated: isAuthenticatedReducer,
    userId: userIdReducer
});

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;