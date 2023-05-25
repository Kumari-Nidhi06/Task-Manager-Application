import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    getorganizations, editTodo,
} from "../redux/actions";
import { getAllUser } from '../redux/actions/adminAction'
import { getAllOrganization } from "../redux/actions/organizationAction";
import { createUser, deleteUser } from "../redux/actions/authAdminAction";

const CreateUser = () => {

    const [value, setValue] = useState({});
    const [query, setquery] = useState('');
    const [state, setstate] = useState({
        query: '',
        list: []
    })
    const dispatch = useDispatch();
    const users = useSelector((state) => state?.adminReducer?.users);
    const [selectedTodo, setSelectedTodo] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowPerPAge, setRowPerPage] = useState(5);
    const [search, setSearch] = useState();
    const pageNumbers = [];

    let usersLength;
    if (users?.userList?.length) {
        usersLength = users?.userList?.length;
    }

    useEffect(() => {
        dispatch((getAllUser()));
        dispatch((getAllOrganization()));
    }, [])

    const deleteAction = (userId) => {
        dispatch(deleteUser(userId));
    }

    //  **************** Pagination Logic *******************

    for (let i = 1; i <= Math.ceil(usersLength / rowPerPAge); i++) {
        pageNumbers.push(i);
    }

    const indexOfLastRowOfCurrentPage = currentPage * rowPerPAge;
    const indexOfFirstRowOfCurrentPage = indexOfLastRowOfCurrentPage - rowPerPAge;

    const currentRows = users?.userList?.slice(indexOfFirstRowOfCurrentPage, indexOfLastRowOfCurrentPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handlePageSize = (e) => {
        setRowPerPage(e.target.value);
        setCurrentPage(1);
    }

    const handlePrevious = () => {
        if (currentPage !== 1) setCurrentPage(currentPage - 1);
    }

    const handleNext = () => {
        if (currentPage !== Math.ceil(users?.userList?.length / rowPerPAge))
            setCurrentPage(currentPage + 1);
    }

    // *******************************************

    const changeEvent = (e, id) => {
        setValue({ ...value, [e.target.name]: e.target.value });
    }

    const handleChange = (e) => {
        const results = users?.userList?.filter(post => {
            if (e.target.value === "") return users?.userList
            return post?.name?.toLowerCase()?.includes(e.target.value?.toLowerCase())
        })
        setstate({
            query: e.target.value,
            list: results
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createUser(value));
    }

    return (<>
        <div className="container bg-light  my-4 py-1 border rounded">
            <form className="mt-3 mb-2 " id="createUserForm" onSubmit={onSubmit}>
                <div className="row">
                    <div className="col-xl-3">
                        <label className="sr-only">Username</label>
                        <input
                            type="text"
                            name="username"
                            className="form-control mb-2 mr-sm-3"
                            placeholder="username"
                            defaultValue={value?.username}
                            onChange={(e) => changeEvent(e)}
                        />
                    </div>

                    <div className="col-xl-3">
                        <label className="sr-only">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control mb-2 mr-sm-3"
                            placeholder="Name"
                            defaultValue={value?.name}
                            onChange={(e) => changeEvent(e)}
                        />
                    </div>

                    <div className="col-xl-3">
                        <label className="sr-only">Email</label>
                        <input
                            type="text"
                            name="email"
                            className="form-control mb-2 mr-sm-3"
                            placeholder="Email"
                            defaultValue={value?.email}
                            onChange={(e) => changeEvent(e)}
                        />
                    </div>

                    <div className="col-xl-3">
                        <label className="sr-only">Description</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control mb-2 mr-sm-3"
                            placeholder="Password"
                            defaultValue={value?.password}
                            onChange={(e) => changeEvent(e)}
                        />
                    </div>
                    <div className="col-xl-3">
                        <button className="btn btn-primary mb-2 " type="submit">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>

        <div className="container bg-light  my-4 py-1 border rounded">
            <h3 className="text-center">User List</h3>
            <div className="row">

                <div className="col-3  col-xm-12 ">
                    <input className="form-control mb-2 mr-sm-3" onChange={handleChange} value={state.query} type="search" placeholder=" Search by Name :" />
                </div>

                <div className=" col-3  float-right">
                    <select className="form-select" onChange={(e) => handlePageSize(e)} >
                        <option >Select No. Of Item</option>
                        <option value="5" >5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </div>

            </div>
            <table className=" table table-hover  table-bordered ">

                <thead>
                    <tr>
                        <th scope="col">UserName</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                {
                    state.query === ''
                        ?
                        <tbody>
                            {currentRows?.map((user) =>
                                <tr>
                                    <td >{user.username}</td>
                                    <td >{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button className="btn btn-danger btn-sm ml-1 tooltips"
                                            onClick={() => deleteAction(user._id)} >
                                            <i className="fa-solid fa-trash-can"></i>
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                        :
                        !state.list.length ? "Your query did not return any results" :
                            state?.list.map((user, index) => {
                                return (
                                    <tbody>
                                        {
                                            <tr key={index} >
                                                <td >{user.username}</td>
                                                <td >{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    <button className="btn btn-danger btn-sm ml-1 tooltips"
                                                        onClick={() => deleteAction(user._id)} >
                                                        <i className="fa-solid fa-trash-can"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        }
                                    </tbody>
                                )
                            })
                }
            </table>
        </div>
        <div className="container">
            <div className="row pb-4" style={{ height: "60px" }}>
                <div className="col col-xm-12 text-start">
                    <button className="btn btn-secondary align-self-start" onClick={() => handlePrevious()} > Previous </button>
                </div>
                <div className="col col-xm-12">
                    <ul className="text-center">
                        {pageNumbers.map((number) => {
                            let btnClass = " btn btn-outline-secondary mx-1";
                            if (number === currentPage) btnClass = "btn btn-secondary mx-1";
                            return (
                                <button className={btnClass} onClick={() => paginate(number)}   >
                                    {number}
                                </button>
                            );
                        })}
                    </ul>
                </div>
                <div className="col col-xm-12 text-end">
                    <button className="btn btn-secondary ml-2 align-self-" onClick={() => handleNext()}  >   Next </button>
                </div>

            </div>
        </div>

    </>)
}

export default CreateUser;