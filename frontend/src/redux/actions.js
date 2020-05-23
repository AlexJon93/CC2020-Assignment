import { CLEAR_USER, ADD_TOKEN, POST_REGISTRATION, SET_USER, ADD_USER_GROUP } from "./action-types";

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
    return {type: ADD_USER_GROUP, action: group}
}