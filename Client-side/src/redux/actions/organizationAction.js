import { GET_ALL_ORGANIZATION, CREATE_ORGANIZATION, DELETE_ORGANIZATION } from './actionTypes';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const localhostAuth = process.env.REACT_APP_authenticationService;

export const getAllOrganization = () => async (dispatch) => {
    try {
        const response = await axios.get(localhostAuth + 'getOrganizationList');
        dispatch({
            type: GET_ALL_ORGANIZATION,
            payload: response.data
        })
    }
    catch (error) {
        toast.error(error?.response?.data?.message, { autoClose: 1500 });
        console.log("error getAllOrganization", error);
    }
}

export const createOrganization = (data) => async (dispatch) => {
    try {
        console.log("data from org action:", data);
        const response = await axios.post(localhostAuth + 'createorganization', data);
        dispatch({
            type: CREATE_ORGANIZATION,
            payload: response
        })
    } catch (error) {
        console.log("err", error);
    }
}

export const deleteOrganization = (organizationId) => async (dispatch) => {
    try {
        console.log("task id from deleteOrganization", organizationId);
        const response = axios.delete(localhostAuth + `deleteOrganization/${organizationId}`);
        dispatch({
            type: DELETE_ORGANIZATION,
            payload: response
        })
    }
    catch (error) {
        console.log('err', error);
    }
}