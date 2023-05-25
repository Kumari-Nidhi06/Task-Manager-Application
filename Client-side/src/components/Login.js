import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import { login } from '../redux/actions/authAction';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import './css/login.css'

const Login = (props) => {
    const dispatch = useDispatch();
    const [data, setData] = useState({});
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const changeEvent = (e) => {
        setData({
            ...data, [e.target.name]: e.target.value,
        });
        if (e.target.name === 'email') {
            setError({
                email: ""
            })
        }
        if (e.target.name === 'password') {
            setError({
                password: ""
            })
        }
    }

    const handleLogin = (e) => {
        e.preventDefault();
        if (!data.email) {
            setError((error) => ({
                ...error, email: "Please Enter the Email"
            }));
            return;
        }
        if (!data.password) {
            setError((error) => ({
                ...error, password: "Enter the Password"
            }));
            return;
        }
        dispatch(login(data)).then((res) => {
            if (res === 'superAdmin' || res === 'admin' || res === 'user') {
                props.setLogin(true);
                { res === 'superAdmin' ? navigate("/createAdmin") : res === 'admin' ? navigate('adminTodo') : navigate('/userTodo') }
            }
            else {
                console.log(res);
            }
        });

        setData({ email: "", password: "" });
        document.getElementById("loginForm").reset();
    }
    const handleToggle = () => {
        let pass = document.getElementById("password");
        let toggleBtn = document.getElementById("toggle");
        let currentType = pass.getAttribute("type");
        if (currentType === "password") {
            pass.setAttribute("type", "text");
            toggleBtn.setAttribute("class", "fa-solid fa-eye-slash");
        } else {
            pass.setAttribute("type", "password");
            toggleBtn.setAttribute("class", "fa-sharp fa-solid fa-eye toggle");
        }
    };

    return (
        <>
            <div className="login-card shadow-lg border">
                <h2>Login</h2>
                <h3>Enter your credentials</h3>
                <form onSubmit={handleLogin} id="loginForm" className="login-form " >
                    <input type="email" placeholder='Email' name='email' id='email' onChange={(e) => changeEvent(e)} required />
                    <input type="password" placeholder='Password' name='password' id='password' onChange={(e) => changeEvent(e)} required />
                    <span className="fa-sharp fa-solid fa-eye toggle" id="toggle" onClick={handleToggle}></span>

                    <button type="submit">Login</button>
                </form>
            </div>
            <Outlet />
            <ToastContainer />
        </>
    )
}

export default Login;