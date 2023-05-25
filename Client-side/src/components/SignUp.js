import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from '../redux/actions/authAction';
import { ToastContainer, toast } from 'react-toastify';

const SignUp = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({});
    const [error, setError] = useState('')

    const changeEvent = (e) => {
        setData({
            ...data, [e.target.name]: e.target.value,
        });
        if (e.target.name === 'name') {
            setError({
                name: ""
            })
        }
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

    const handleSignUp = (e) => {
        e.preventDefault();
        if (!data.name) {
            setError((error) => ({
                ...error, email: "Please Enter your Name"
            }));
            return;
        }
        if (!data.email) {
            setError((error) => ({
                ...error, email: "Please Enter the Email"
            }));
            return;
        }
        if (!data.password) {
            setError((error) => ({
                ...error, password: "ENter the Password"
            }));
            return;
        }
        console.log("SignUp data:", data);
        dispatch(signUp(data));
        setData({ name: "", email: "", password: "" });
        document.getElementById("signUpForm").reset();
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
            <div className="register-card">
                <h2>Register</h2>
                <h3>Enter your credentials</h3>
                <form className="register-form" onSubmit={handleSignUp} id="signUpForm">
                    <input type="text" placeholder='Name' name='name' id='name' onChange={(e) => changeEvent(e)} required />
                    <span className="text-danger">{error?.name}</span>
                    <input type="email" placeholder='Email' name='email' id='email' onChange={(e) => changeEvent(e)} required />
                    <span className="text-danger">{error?.name}</span>
                    <input type="password" placeholder='Password' name='password' id='password' onChange={(e) => changeEvent(e)} required />
                    <span className="text-danger">{error?.name}</span>
                    <span className="fa-sharp fa-solid fa-eye toggle" id="toggle" onClick={handleToggle}></span>
                    <Link to={"/"}>Already have an account?</Link>
                    <button type='submit' id='submitBtn'>Register</button>
                </form>
            </div>

            <Outlet />
            <ToastContainer />
        </>
    )
}

export default SignUp;