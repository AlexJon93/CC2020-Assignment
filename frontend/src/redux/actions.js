import { ADD_GROUP_MEMBER, SET_GROUP_ID, CLEAR_USER, ADD_TOKEN, POST_REGISTRATION, SET_USER, ADD_USER_GROUP, ADD_POST, ADD_POSTER_NAME, SET_LOADING, CLEAR_WALL, SET_GROUP_NAME, SET_IS_MEMBER } from "./action-types";

export function registerUser(payload) {
    return { type: POST_REGISTRATION, payload };
}

export const setUser = user => {
    return {type: SET_USER, user: user}
}

export const addToken = (tokenStr) => {
    return {type: ADD_TOKEN, token: tokenStr};
}

export const clearUser = () => {
    return {type: CLEAR_USER};
}

export const addGroup = (group) => {
    return {type: ADD_USER_GROUP, group: group}
}

export const addPost = (post) => {
    return {type: ADD_POST, post: post};
}

export const addPosterName = (MemberID, Username) => {
    return {type: ADD_POSTER_NAME, PostUser: MemberID, Username: Username}
}

export const setLoading = (loading) => {
    return {type: SET_LOADING, loading: loading};
}

export const clearWall = () => {
    return {type: CLEAR_WALL};
}

export const setGroupName = GroupName => {
    return {type: SET_GROUP_NAME, GroupName: GroupName}
}

export const setGroupID = group_id => {
    return {type: SET_GROUP_ID, group_id: group_id}
}

export const setIsMember = isMember => {
    return {type: SET_IS_MEMBER, isMember: isMember};
};

export const addGroupMember = member => {
    return {type: ADD_GROUP_MEMBER, member: member}
}