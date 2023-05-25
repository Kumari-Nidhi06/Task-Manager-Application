import {
    GET_ALL_USER, DELETE_USER, ADD_TODO_ADMIN, GET_ADMIN_TODO, DELETE_ADMIN_TODO, UPDATE_ADMIN_TODO, EDIT_ADMIN_TODO, MARK_ADMIN_TODO_COMPLETED
} from './actionTypes';
import axios from "axios";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.withCredentials = true;

const localhostAuth = process.env.REACT_APP_authenticationService;

const localhostUserAction = process.env.REACT_APP_userServices;

export const addTodo = (todo) => (dispatch) => {
    try {
        const response = axios.post(`${localhostUserAction}/createTask`, todo);
        if (response) {
            toast.success('Added Successfully', { autoClose: 1500 })
        }
        else {
            toast.error('Something Went Wrong', { autoClose: 1500 });
        }
        dispatch({
            type: ADD_TODO_ADMIN,
            payload: response.data
        });
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message, { autoClose: 1500 });
    }
}

export const getAllUser = () => async (dispatch) => {
    try {
        const response = await axios.get(localhostAuth + 'getUserList', { withCredentials: true });
        dispatch({
            type: GET_ALL_USER,
            payload: response.data
        })
    }
    catch (error) {
        toast.error(error?.response?.data?.message, { autoClose: 1500 });
        console.log("error getAlluser", error);
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {
        const response = await axios.delete(`http://localhost:3002/deleteUser/${id}`);
        // console.log("delete user response", response);
        toast.success(response?.data?.message, { autoClose: 1500 });
        dispatch({
            type: DELETE_USER
        })
    }
    catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message, { autoClose: 1500 });
    }
}

export const getAdminTodos = () => async (dispatch) => {
    try {
        const response = await axios.get(localhostUserAction + '/getAllTaskByUserId');
        toast.success(response?.data?.message, { autoClose: 1500 });
        dispatch({
            type: GET_ADMIN_TODO,
            payload: response.data
        })
    }
    catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message, { autoClose: 1500 });
    }
}

export const editAdminTodo = (id) => (dispatch) => {
    dispatch({
        type: EDIT_ADMIN_TODO,
        payload: id,
        isEdit: true
    })
}


export const updateAdminTask = (id, task) => async (dispatch) => {
    const response = axios.put(`${localhostUserAction}/updatetask/${id}`, task);
    // console.log("Response is :", response);
    if (response) {
        toast.success('Updated Successfully', { autoClose: 1500 })
    }
    else {
        toast.error('Something Went Wrong', { autoClose: 1500 });
    }

    dispatch({
        type: UPDATE_ADMIN_TODO,
        payload: response.data
    });
}


export const deleteAdminTodo = (id) => async (dispatch) => {
    try {
        const response = await axios.delete(`${localhostUserAction}/deleteTask/${id}`);
        toast.success(response?.data?.message, { autoClose: 1500 })
        dispatch({
            type: DELETE_ADMIN_TODO
        })
    }
    catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message, { autoClose: 1500 });
    }
}

export const markTodoCompleted = (id) => async (dispatch) => {
    const response = axios.put(`${localhostUserAction}/updateStatus/${id}`);
    if (response) {
        toast.success('Marked Completed Successfully', { autoClose: 1500 })
    } else {
        toast.error('Something Went Wrong', { autoClose: 1500 });
    }
    dispatch({
        type: MARK_ADMIN_TODO_COMPLETED,
        payload: response
    });
}