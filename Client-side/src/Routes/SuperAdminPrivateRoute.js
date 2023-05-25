import React from "react";
import { Outlet, Navigate } from 'react-router-dom';

const SuperAdminPrivateRoute = () => {
    let flag;
    if (JSON.parse(localStorage.getItem("user"))) {
        if (JSON.parse(localStorage.getItem("user"))['data']['user']['role'] === "superAdmin") {
            flag = 0; //redirect to superAdmin
        }
        else if (JSON.parse(localStorage.getItem("user"))['data']['user']['role'] === "admin") {
            flag = 1; //redirect to Admin
        }
        else {
            flag = 2  // redirect to user
        }
    } else {
        flag = 3;
    }

    return (
        <>
            {
                flag === 0 ? <Outlet /> : flag === 1 ? <Navigate to="/adminTodo" /> : flag === 2 ? <Navigate to="/userTodo" /> : <Navigate to="/" />
            }
        </>
    )
}

export default SuperAdminPrivateRoute;