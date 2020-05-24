import wallReducer      from "./wallReducer";
import userReducer      from "./userReducer";

const initialState = {
    wall: {
        posts: [],
        postUserNames: {},
        loading: true,
        group_id: null,
        GroupName: null,
        isMember: null,
        members: []
    }, 
    user: {
        MemberID: null,
        Username: null,
        Email: null,
        groups: [],
        loading: true
    }
}
const rootReducer = (state=initialState, action) => {
    return {
        wall: wallReducer(state.wall, action),
        user: userReducer(state.user, action),
    };
};
export default rootReducer;