import store from "./store/index";
import { registerUser } from "./actions/index";

window.store = store;
window.registerUser = registerUser;