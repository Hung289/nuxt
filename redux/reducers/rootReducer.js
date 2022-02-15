import AuthReducer from './AuthReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    auth: AuthReducer
});

export default rootReducer;