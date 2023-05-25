import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createAdmin, getAllAdmin, deleteAdmin } from "../redux/actions/authAdminAction";
import { getAllOrganization } from '../redux/actions/organizationAction';
import { ToastContainer, toast } from 'react-toastify';

const CreateAdmin = () => {
    const [data, setData] = useState({});
    const [query, setquery] = useState('');
    const [state, setstate] = useState({
        query: '',
        list: []
    })
    const dispatch = useDispatch();
    const organizations = useSelector((state) => state?.organizationReducer?.organization);
    const organizationList = organizations.organizationList
    const adminList = useSelector((state) => state?.adminReducer?.admin);
    const admins = adminList.adminList;
    const [selectedTodo, setSelectedTodo] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowPerPAge, setRowPerPage] = useState(5);
    const [search, setSearch] = useState();
    const pageNumbers = [];

    let adminsLength;
    if (admins?.length) {
        adminsLength = admins?.length;
    }

    useEffect(() => {
        dispatch(getAllAdmin());
        dispatch(getAllOrganization());
    }, [])
    /**
     * 
     * @param {Admin Id Used To Delete the Admin} adminId 
     */
    const deleteAction = (adminId) => {
        dispatch(deleteAdmin(adminId));
    }
    //  **************** Pagination Logic *******************

    for (let i = 1; i <= Math.ceil(adminsLength / rowPerPAge); i++) {
        pageNumbers.push(i);
    }

    const indexOfLastRowOfCurrentPage = currentPage * rowPerPAge;
    const indexOfFirstRowOfCurrentPage = indexOfLastRowOfCurrentPage - rowPerPAge;

    const currentRows = admins?.slice(indexOfFirstRowOfCurrentPage, indexOfLastRowOfCurrentPage);

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
        if (currentPage !== Math.ceil(admins?.length / rowPerPAge))
            setCurrentPage(currentPage + 1);
    }

    // *******************************************
    const changeEvent = (e) => {
        setData({
            ...data, [e.target.name]: e.target.value,
        });
    }

    /**
     * 
     * @param {Event} e
     * To serach the perticular Admin 
     */
    const handleChange = (e) => {
        const results = admins?.filter(admin => {
            if (e.target.value === "") return admins
            return admin?.name?.toLowerCase().includes(e.target.value?.toLowerCase())
        })
        setstate({
            query: e.target.value,
            list: results
        })
    }
    /**
        * 
        * @param {Event} e
        * Post call for submitting form to create admin 
        */
    const onSubmit = (e) => {
        e.preventDefault();
        // console.log("Data from create Admin", data)
        dispatch(createAdmin(data));
    }
    return (<>
        <div className="container bg-light  my-4 py-1 border rounded">
            <form className="mt-3 mb-2 " id="organizationForm" onSubmit={onSubmit}>
                <div className="row">
                    <div className="col-xl-3">
                        <label className="sr-only">Username</label>
                        <input
                            type="text"
                            name="username"
                            className="form-control mb-2 mr-sm-3"
                            placeholder="username"
                            defaultValue={data?.username}
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
                            defaultValue={data?.name}
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
                            defaultValue={data?.email}
                            onChange={(e) => changeEvent(e)}
                        />
                    </div>

                    <div className="col-xl-3">
                        <label className="sr-only">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control mb-2 mr-sm-3"
                            placeholder="Password"
                            defaultValue={data?.password}
                            onChange={(e) => changeEvent(e)}
                        />
                    </div>

                    <div className="col-xl-3">
                        <label className="sr-only">Select Organization</label>
                        <select className="form-select  mb-2 mr-sm-3" aria-label="Default select example" name="orgId" onChange={(e) => changeEvent(e)} >
                            <option>Select Organization</option>
                            {organizationList?.map((organization, index) =>
                                <option key={index} value={organization._id}>{organization.name}</option>
                            )} </select>
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
            <h3 className="text-center">Admin List</h3>
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
                        <th scope="col">Username</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                {/* {admins.map((admin) => */}
                {
                    state.query === ''
                        ?
                        <tbody>
                            {
                                currentRows?.map((admin, index) => (
                                    <tr key={index}>
                                        <td >{admin.username}</td>
                                        <td >{admin.name}</td>
                                        <td>{admin.email}</td>
                                        <td>  <button className="btn btn-danger btn-sm ml-1 tooltips"
                                            onClick={() => deleteAction(admin._id)} >
                                            <i className="fa-solid fa-trash-can"></i>
                                        </button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                        :
                        !state?.list.length ? "Your query did not return any results" : state?.list.map((admin, index) => {
                            return (
                                <tbody>
                                    {
                                        <tr key={index}>
                                            <td scope="row">{admin.username}</td>
                                            <td scope="row">{admin.name}</td>
                                            <td>{admin.email}</td>
                                            <td>
                                                <button className="btn btn-danger btn-sm ml-1 tooltips"
                                                    onClick={() => deleteAction(admin._id)} >
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
                        {pageNumbers?.map((number) => {
                            let btnClass = " btn btn-outline-secondary mx-1";
                            if (number === currentPage) btnClass = "btn btn-secondary mx-1";
                            return (
                                <button
                                    className={btnClass}
                                    onClick={() => paginate(number)}
                                >
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
        <ToastContainer />
    </>)
}

export default CreateAdmin;