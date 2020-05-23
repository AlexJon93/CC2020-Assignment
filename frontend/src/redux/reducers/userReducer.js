import { SET_USER, CLEAR_USER, ADD_USER_GROUP} from '../action-types';

const blankUser = {
    MemberId: null,
    Username: null,
    Email: null,
    groups: []
};

const userReducer = (state, action) => {

    switch(action.type) {

        case SET_USER:
            return {...blankUser, ...action.user };

        case CLEAR_USER:
            return blankUser;

        case ADD_USER_GROUP:
            // TODO: Consider making this whole thing one for loop check for efficiency
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
                // Compare the two groups
                for (const group of state.groups) {
                    if (group.GroupID === action.group.GroupID) {

                        var equal = true;
                        for (const key in group) {
                            if (group[key] != action.group[key]) {
                                equal = false;
                                break;
                            }
                        }
                        if (equal) {
                            return state;
                        }
                    }
                } 
                // Replace the old version with the new
                const newGroups = state.groups.filter(group => group.GroupID !== action.group.GroupID); 
                return {
                    ...state,
                    groups: [
                        action.group,
                        ...newGroups,
                    ]
                };
            }

        default:
            return state;
    }
}
export default userReducer;