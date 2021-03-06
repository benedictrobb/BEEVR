import {REGISTER_STUDENT, FETCH_STUDENTS} from '../constants/action_types.js';

const initialState = {
    errorMessage: '',
    student: {},
    response: {
        isLogged: false,
        isAuthenticated: false,
    },
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
    case REGISTER_STUDENT:
        return {
            ...state,
            student: {
                status: action.status,
                error: action.error,
                response: action.response,
            },
        };
    case FETCH_STUDENTS:
        return {
            ...state,
            student: {
                status: action.status,
                error: action.error,
                response: action.response,
            },
        };
    default:
        return state;
    }
};
