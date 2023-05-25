import { combineReducers } from "redux";
import todoReducer from "./todoReducer";
import authReducer from "./authReducer";
import adminReducer from "./adminReducer";
import organizationReducer from "./organizationReducer";

/**
 * Combine todoReducer and store it in the rootReducer
 */

const rootReducer = combineReducers({
    organizationReducer, todoReducer, authReducer, adminReducer
})
export default rootReducer