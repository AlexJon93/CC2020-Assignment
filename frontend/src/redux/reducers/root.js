import wallReducer      from "./wallReducer";
import userReducer      from "./userReducer";

const initialState = {
    user: {
        MemberId: null,
        Username: null,
        Email: null,
        groups: []
    }
};

const rootReducer = (state=initialState, action) => {
    return {
        wall: wallReducer(state.wall, action),
        user: userReducer(state.user, action),
    };
};
export default rootReducer;