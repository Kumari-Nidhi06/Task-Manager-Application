import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
const PreventLoginPagePrivate = () => {
    let flag;
    if (JSON.parse(localStorage.getItem("user"))) {
        if (JSON.parse(localStorage.getItem("user"))['data']['user']['role'] === "user") {
            flag = 0; //user
        }
        else if (JSON.parse(localStorage.getItem("user"))['data']['user']['role'] === "admin") {
            flag = 1; // Redirect to Admin
        }
        else {
            flag = 2 // Redirect to super Admin
        }
    } else {
        flag = 3;
    }
    return (
        <>
            {
                flag === 0 ? <Navigate to="/userTodo" /> : flag === 1 ? <Navigate to="/adminTodo" /> : flag === 2 ? <Navigate to="/createAdmin" /> : <Outlet />
            }
        </>
    )
}
export default PreventLoginPagePrivate;