import { POST_REGISTRATION }    from '../constants/action-types';

const initialState = {
    registerDetails: {
        email: "",
        password: "",
        passwordConfirm: ""
    },
    users: []
};

export default function registerReducer(state=initialState, action) {
    if (action.type != POST_REGISTRATION) {
        return state;
    }
    console.log(action.payload.newUser);
    return {
        ...state,
        users: [
            ...state.users,
            action.payload.newUser
        ] 
    };
}