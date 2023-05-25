import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
const AdminPrivateRoutes = () => {
    let flag;
    if (JSON.parse(localStorage.getItem("user"))) {
        if (JSON.parse(localStorage.getItem("user"))['data']['user']['role'] === "admin") {
            flag = 0; //redirect to admin
        }
        else if (JSON.parse(localStorage.getItem("user"))['data']['user']['role'] === "superAdmin") {
            flag = 1; //redirect to superAdmin
        }
        else {
            flag = 2  // redirect to user
        }
    } else {
        flag = 3;
    }
    return (
        <>
            {flag === 0 ? <Outlet /> : flag === 1 ? <Navigate to="/createAdmin" /> : flag === 2 ? <Navigate to="/userTodo" /> : <Navigate to="/" />}
        </>
    )
}
export default AdminPrivateRoutes;