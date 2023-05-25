import { CREATE_ADMIN, GET_ALL_ADMIN, DELETE_ADMIN, CREATE_USER, DELETE_USER, ADD_TODO_ADMIN, GET_ALL_USER, GET_ADMIN_TODO, DELETE_ADMIN_TODO, UPDATE_ADMIN_TODO, EDIT_ADMIN_TODO, MARK_ADMIN_TODO_COMPLETED } from "../actions/actionTypes";

const initialState = {
    data: [],
    adminTodoList: [],
    admin: [],
    users: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_ADMIN:
            return {
                ...state,
                admin: action.payload
            }

        case CREATE_ADMIN:
            return {
                ...state,
                admin: [
                    ...state.admin
                ]
            }
        case DELETE_ADMIN:
            return {
                ...state,
                admin: [...state.admin]
            }

        case CREATE_USER:
            return {
                ...state,
                users: [
                    ...state.users
                ]
            }

        case DELETE_USER:
            return {
                ...state,
                users: [...state.users]
            }

        case ADD_TODO_ADMIN:
            return {
                ...state,
                data: [
                    ...state.data
                ]
            }

        case GET_ALL_USER:
            return {
                ...state,
                users: action.payload
            }

        case DELETE_USER:
            return {
                ...state,
            }
        case GET_ADMIN_TODO:
            return {
                ...state,
                adminTodoList: action.payload
            }
        case DELETE_ADMIN_TODO:
            return {
                ...state,
            }
        case EDIT_ADMIN_TODO:
            const updateTodo = action.payload;
            console.log("updatetodo from EDIT_ADMIN_TODO", updateTodo);
            let newUpdateTodo = state?.adminTodoList?.tasks?.find((todo) => todo._id === updateTodo);
            console.log("newUpdateTodo:", newUpdateTodo);
            return {
                ...state,
                isEdit: action.isEdit,
                updateTodo: newUpdateTodo
            }

        case UPDATE_ADMIN_TODO:
            return {
                ...state,
                isEdit: false
            }
        case MARK_ADMIN_TODO_COMPLETED:
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default adminReducer;