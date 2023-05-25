import React from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./css/navbar.css";
import { Link } from "react-router-dom";
import { logOut } from '../redux/actions/authAction';


const Navbar = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authService = process.env.REACT_APP_authenticationService;

    let flag;
    const role = (localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user"))['data']['user']['role'] : null
    const handleLogout = (e) => {
        dispatch(logOut());
        toast.success("logout Successfully", { autoClose: 1500 });
        localStorage.removeItem("user");
        props.setLogin(false);
        navigate('/');
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-color ">
                <div className="container-fluid">
                    <a className="navbar-brand text-light hover" href="#">Task Manager </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {
                                role === 'superAdmin' ?
                                    <>
                                        <li className="nav-item">
                                            <Link to='/createAdmin' className="nav-link text-light active" aria-current="page" >Create-Admin</Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link to='/createOrganization' className="nav-link text-light  active" aria-current="page" >Create-organization</Link>
                                        </li>
                                    </> : null
                            }
                            {
                                role === 'admin' ?
                                    <>
                                        <li className="nav-item">
                                            <Link to='/createUser' className="nav-link text-light  active" aria-current="page" >Create-User</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to='/adminTodo' className="nav-link text-light  active" aria-current="page" >Create-Task</Link>
                                        </li>
                                    </>
                                    : null
                            }
                        </ul>
                        <form className="d-flex" onSubmit={handleLogout} >
                            <button className="btn btn-light float-right" type="submit">Logout</button>
                        </form>
                    </div>
                </div>
            </nav>
            <ToastContainer />
        </>
    )
}

export default Navbar;