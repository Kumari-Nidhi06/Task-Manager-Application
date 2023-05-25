import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';

const UserPrivateRoutes = () => {
    let flag;
    if (JSON.parse(localStorage.getItem("user"))) {
        if (JSON.parse(localStorage.getItem("user"))['data']['user']['role'] === "user") {
            flag = 0; //redirect to User
        }
        else if (JSON.parse(localStorage.getItem("user"))['data']['user']['role'] === "admin") {
            flag = 1; //redirect to admin
        }
        else {
            flag = 2  // redirect to superAdmin
        }
    } else {
        flag = 3;
    }
    return (
        <>
            {flag === 0 ? <Outlet /> : flag === 1 ? <Navigate to="/adminTodo" /> : flag === 2 ? <Navigate to="/createAdmin" /> : <Navigate to="/" />}
        </>
    )
}
export default UserPrivateRoutes;