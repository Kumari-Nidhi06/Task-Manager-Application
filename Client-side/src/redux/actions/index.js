/**
 * imported all the action name from the actionTypes.js 
 */
import {
    ADD_TODO, EDIT_TODO, UPDATE_TODO, MARK_COMPLETED, GET_TODOS, DELETE_USER_TODO
} from "./actionTypes";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const localhostAuth = process.env.REACT_APP_authenticationService;

const localhostUserAction = process.env.REACT_APP_userServices;
export const getTodos = () => async (dispatch) => {
    console.log("getTodo func call;")
    const response = await axios.get(localhostUserAction + '/getAllTaskByUserId');
    dispatch({
        type: GET_TODOS,
        payload: response.data
    })
}

export const addNewTodo = (todo) => (dispatch) => {
    try {
        console.log("todo is addnNewTodo", todo);
        const response = axios.post(`${localhostUserAction}/createTask`, todo);
        if (response) {
            toast.success('Added Successfully', { autoClose: 1500 });
        }
        else {
            toast.error('Something Went Wrong', { autoClose: 1500 });
        }
        dispatch({
            type: ADD_TODO,
            payload: response.data
        });
    }
    catch (error) {
        console.log('error is', error);
        toast.error(error?.response?.data?.message, { autoClose: 1500 });
    }
}

/**
 * @param {id} id 
 * @returns Delete the perticular Todo and return
 */
export const editTodo = (id) => (dispatch) => {
    dispatch({
        type: EDIT_TODO,
        payload: id,
        isEdit: true
    })
}

/**
 * 
 * @param {id} id 
 * @param {todo list} todo 
 * @returns update the todo list
 */

export const updateTodo = (id, todo) => (dispatch) => {
    console.log("Update todo from index.js");
    console.log("Todo id:", id);
    const response = axios.put(`${localhostUserAction}/updatetask/${id}`, todo);
    console.log("Response is :", response);
    if (response) {
        toast.success('Updated Successfully', { autoClose: 1500 })
    }
    else {
        toast.error('Something Went Wrong', { autoClose: 1500 });
    }

    dispatch({
        type: UPDATE_TODO,
        payload: response.data
    });
    // window.location.reload();
}

/**
 * 
 * @param {id} id 
 * @returns mark the existing todo as completed and return the todo
 */
export const markTodoCompleted = (id) => (dispatch) => {
    const response = axios.put(`http://localhost:3002/updateStatus/${id}`);
    if (response) {
        toast.success('Marked Completed Successfully', { autoClose: 1500 })
    }
    else {
        toast.error('Something Went Wrong', { autoClose: 1500 });
    }
    dispatch({
        type: MARK_COMPLETED,
        payload: response
    });
}

export const deleteUserTodo = (id) => async (dispatch) => {
    try {
        const response = await axios.delete(`${localhostUserAction}/deleteTask/${id}`);
        dispatch({
            type: DELETE_USER_TODO,
            payload: response
        })
    }
    catch (error) {
        console.log(error);
    }
}