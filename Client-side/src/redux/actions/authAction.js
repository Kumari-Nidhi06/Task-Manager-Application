import {
    LOGIN, LOG_OUT, SIGN_UP
} from './actionTypes';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const localhostAuth = process.env.REACT_APP_authenticationService;

export const login = (data) => async (dispatch) => {
    try {
        const response = await axios.post(localhostAuth + 'login', data);
        if (response.data.PaswordMessage) {
            const error = response.data.PaswordMessage;
            toast.error(response.data.PaswordMessage, { autoClose: 1500 });
            return error;
        }
        else if (response.data.UserExistMessage) {
            // console.log(response.data.UserExistMessage);
            const error = response.data.UserExistMessage;
            toast.error(response.data.UserExistMessage, { autoClose: 1500 });
            return error;
        }
            localStorage.setItem("user", JSON.stringify(response));
            const role = response.data.user.role;
            if (response) {
                toast.success('Logged in Successfully', { autoClose: 1500 });
            } else {
                toast.error('Something Went Wrong', { autoClose: 1500 });
            }
            dispatch({
                type: LOGIN,
                payload: response
            });
            return role;
    }
    catch (error) {
        toast.error(error?.response?.data?.message)
        return false
    }
}

export const logOut = () => async (dispatch) => {
    try {
        const response = await axios.post(localhostAuth + 'logout');
        dispatch({
            type: LOG_OUT,
            payload: response
        });
    }
    catch (error) { console.log(error) }
}


export const signUp = (data) => (dispatch) => {
    try {
        const response = axios.post('http://localhost:3002/userRegister', data);
        if (response) {
            toast.success('Signed in Successfully', { autoClose: 1500 });
        }
        dispatch({
            type: SIGN_UP,
            payload: response
        });
    }
    catch (err) {
        console.log(err);
        toast.danger(err);
    }
}