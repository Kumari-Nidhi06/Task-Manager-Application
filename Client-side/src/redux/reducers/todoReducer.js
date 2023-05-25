import {
  GET_TODOS,
  ADD_TODO,
  DELETE_TODO,
  CLEAR_ALL_TODO,
  EDIT_TODO,
  UPDATE_TODO,
  MARK_COMPLETED,
  DELETE_USER_TODO
} from "../actions/actionTypes";

/**
 * this is the initialState for the reducer function
 */
const initialState = {
  todos: [],
  isEdit: false,
  editTodoId: "",
};
/**
 * 
 * @param {initialState} state 
 * @param {action} action 
 * @returns render initial state, (which is defined above) for the todo modification based on the input type of the action a perticular switch case will be executed.
 * And finally it will return the updated Todo state
 */
const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload
      }
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
        ],
        isEdit: action.isEdit,
      };
    case DELETE_TODO:
      const newTodoList = state.todos.filter((item) => item.id !== action.id);
      return {
        ...state,
        todos: newTodoList,
      };

    case EDIT_TODO:
      const editTodo = action.payload;
      let newEditTodo = state?.todos?.tasks?.find((item) => item._id === editTodo);
      return {
        ...state,
        isEdit: action.isEdit,
        editTodo: newEditTodo,
      };

    case UPDATE_TODO:
      return {
        ...state,
        isEdit: false,
      };

    case MARK_COMPLETED:
      const { selectedTodoId } = action.payload;
      let allTodos = [];

      selectedTodoId?.forEach((id) => {
        allTodos = state.todos.filter((todo) => {
          return todo.id !== id;
        });

        const selectedTodo = state.todos.find((todo) => todo?.id === id);
        selectedTodo.title = selectedTodo?.title;
        selectedTodo.description = selectedTodo?.description;
        selectedTodo.isCompleted = true;
        selectedTodo.isPending = selectedTodo?.isPending;
        allTodos.push(selectedTodo);
      });

      return {
        ...state,
        todos: [...allTodos],
        isEdit: false,
      };

    case CLEAR_ALL_TODO:
      return {
        ...state,
        todos: [],
      };
    case DELETE_USER_TODO:
      return {
        ...state,
      }

    default:
      return state;
  }
};
export default todoReducer;