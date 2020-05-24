import { ADD_GROUP_MEMBER, SET_GROUP_NAME, CLEAR_WALL, ADD_POST, ADD_POSTER_NAME, SET_LOADING, SET_GROUP_ID, SET_IS_MEMBER} from '../action-types'

// Post object structure
// {
//     PostID: null,
//     PostContent: null,
//     PostUser: null,
//     PostGroup: null,
//     CreatedAt: null,
// }
const initialState = {
        posts: [],
        postUserNames: {},
        loading: true,
        group_id: null,
        GroupName: null,
        isMember: null,
        members: []
};

const wallReducer = (state, action) => {
    switch(action.type) {

        case ADD_POST:
            return {
                ...state,
                posts: [
                    action.post,
                    ...state.posts
                ]
            };
        
        case ADD_POSTER_NAME:
            const exists = Object.keys(state.postUserNames).some(PostUser => {return PostUser === action.PostUser});

            if (exists) {
                return state;
            }
            return {
                ...state,
                postUserNames: {
                    ...state.postUserNames,
                    [action.PostUser]: action.Username
                }
            }

        case SET_LOADING:
            return {
                ...state,
                loading: action.loading
            };

        case CLEAR_WALL:
            return initialState;

        case SET_GROUP_NAME:
            return {
                ...state,
                GroupName: action.GroupName
            }

        case SET_GROUP_ID:
            return {
                ...state,
                group_id: action.group_id
            }
        
        case SET_IS_MEMBER:
            return {
                ...state,
                isMember: action.isMember
            };
        
        case ADD_GROUP_MEMBER:
            return {
                ...state,
                members: [
                    ...state.members,
                    action.member
                ]
            };

        default:
            return state;
    }
};

export default wallReducer;