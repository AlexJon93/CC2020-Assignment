import { SET_USER, CLEAR_USER, ADD_USER_GROUP} from '../action-types';

const blankUser = {
    MemberID: null,
    Username: null,
    Email: null,
    groups: [],
    loading:true
}

const userReducer = (state, action) => {

    switch(action.type) {
        case SET_USER:
            return {...state, ...action.user };

        case CLEAR_USER:
            return blankUser;

        case ADD_USER_GROUP:
            console.log(state, action);
            const exists = state.groups.some(group => group.GroupID === action.group.GroupID); 

            if (!exists) {
                return {
                    ...state,
                    groups: [
                        ...state.groups,
                        action.group
                    ]
                };
            }
            else {
                return state;
            }

        default:
            return state;
    }
}
export default userReducer;