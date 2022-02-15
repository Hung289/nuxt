import * as AuthAction from "../actions/AuthAction";
import * as AuthService from '../../Lib/AuthService';
const initState = {
    user: AuthService.getCurrentUser(),
    token: "",
};

const AuthReducer = (state = initState, action) => {
    switch (action.type) {
        case AuthAction.AUTH_LOADUSER:
            return { user: action.Data };
        case AuthAction.AUTH_LOGOUT:
            return { ...state, user: {} };
        default:
            return { ...state };
    }
};

export default AuthReducer;
