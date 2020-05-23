import { SET_GROUP_NAME, CLEAR_WALL, ADD_POST, ADD_POSTER_NAME, SET_LOADING, SET_GROUP_ID} from '../action-types'

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
    GroupName: null
}

const wallReducer = (state=initialState, action) => {
    switch(action.type) {

        case ADD_POST:
            return {
                ...state,
                posts: [
                    ...state.posts,
                    action.post
                ]
            };
        
        case ADD_POSTER_NAME:
            const exists = Object.keys(state.postUserNames).some(PostUser => PostUser === action.PostUser);

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
                groupName: action.groupName
            }

        case SET_GROUP_ID:
            return {
                ...state,
                group_id: action.group_id
            }

        default:
            return state;
    }
};

export default wallReducer;