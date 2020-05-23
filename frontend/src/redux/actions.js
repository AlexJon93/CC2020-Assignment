import { POST_REGISTRATION } from "../constants/action-types";

export function registerUser(payload) {
    return { type: POST_REGISTRATION, payload };
}