import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrganization, createOrganization, deleteOrganization } from "../redux/actions/organizationAction";

const CreateOrganization = () => {
    const [value, setValue] = useState({});
    const [query, setquery] = useState('');
    const [state, setstate] = useState({
        query: '',
        list: []
    })
    const dispatch = useDispatch();
    const organizations = useSelector((state) => state?.organizationReducer?.organization);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowPerPAge, setRowPerPage] = useState(5);
    const [search, setSearch] = useState();
    const pageNumbers = [];

    let organizationLength;
    if (organizations?.organizationList?.length) {
        organizationLength = organizations?.organizationList
            ?.length;
    }

    useEffect(() => {
        dispatch(getAllOrganization());
    }, [])

    //  **************** Pagination Logic *******************

    for (let i = 1; i <= Math.ceil(organizationLength / rowPerPAge); i++) {
        pageNumbers.push(i);
    }

    const indexOfLastRowOfCurrentPage = currentPage * rowPerPAge;
    const indexOfFirstRowOfCurrentPage = indexOfLastRowOfCurrentPage - rowPerPAge;

    const currentRows = organizations?.organizationList?.slice(indexOfFirstRowOfCurrentPage, indexOfLastRowOfCurrentPage);

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
        if (currentPage !== Math.ceil(organizations?.organizationList
            ?.length / rowPerPAge))
            setCurrentPage(currentPage + 1);
    }

    // *******************************************

    /**
     * 
     * @param {Organization Id to delte Organization} organizationId 
     */
    const deleteAction = (organizationId) => {
        dispatch(deleteOrganization(organizationId));
    }

    const changeEvent = (e) => {
        setValue({
            ...value, [e.target.name]: e.target.value,
        })
    }

    const handleChange = (e) => {
        const results = organizations?.organizationList?.filter(organization => {
            if (e.target.value === "") return organizations
            return organization.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setstate({
            query: e.target.value,
            list: results
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createOrganization(value));
        setValue({ name: "", password: "" });
        document.getElementById("organizationForm").reset();
    }

    return (<>
        <div className="container bg-light  my-4 py-1 border rounded">
            <form className="mt-3 mb-2 " id="organizationForm" onSubmit={onSubmit}>
                <div className="row">
                    <div className="col-xl-3">
                        <input
                            type="text"
                            name="name"
                            className="form-control mb-2 mr-sm-3"
                            placeholder="Organization Name"
                            defaultValue={value?.name}
                            onChange={(e) => changeEvent(e)}
                        />
                    </div>

                    <div className="col-xl-3">
                        <input
                            type="email"
                            name="email"
                            className="form-control mb-2 mr-sm-3"
                            placeholder="Organization Email"
                            defaultValue={value?.email}
                            onChange={(e) => changeEvent(e)}
                        />
                    </div>

                    <div className="col">
                        <input
                            type="text"
                            name="details"
                            className="form-control mb-2 mr-sm-3"
                            placeholder="Organization Detail"
                            defaultValue={value?.details}
                            onChange={(e) => changeEvent(e)}
                        />
                    </div>

                    <div className="col-1">
                        <button className="btn btn-primary mb-2 " type="submit">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>

        <div className="container bg-light  my-4 py-1 border rounded">
            <h3 className="text-center">Organization List</h3>
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
            <table className=" table table-hover table-bordered " style={{ height: "317px", overflowY: "auto", overflowX: "hidden" }}>
                <thead style={{ position: "sticky" }}>
                    <tr>
                        <th scope="col"> Organization Name</th>
                        <th scope="col">Organization Email</th>
                        <th scope="col">Organization Details</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                {
                    state.query === ''
                        ?
                        <tbody>
                            {
                                currentRows?.map((organization, index) => (
                                    <tr key={index}>
                                        <td >{organization.name}</td>
                                        <td>{organization.email}</td>
                                        <td>{organization.details}</td>
                                        <td>  <button className="btn btn-danger btn-sm ml-1 tooltips"
                                            onClick={() => deleteAction(organization._id)} >
                                            <i className="fa-solid fa-trash-can"></i>
                                        </button></td>
                                    </tr>
                                )
                                )}
                        </tbody>
                        :
                        !state.list.length ? "Your query did not return any results" :
                            state?.list.map((organization, index) => {
                                return (
                                    <tbody>
                                        {
                                            <tr key={index}>
                                                <td >{organization.name}</td>
                                                <td>{organization.email}</td>
                                                <td>{organization.details}</td>
                                                <td>  <button className="btn btn-danger btn-sm ml-1 tooltips"
                                                    onClick={() => deleteAction(organization._id)} >
                                                    <i className="fa-solid fa-trash-can"></i>
                                                </button></td>
                                            </tr>
                                        }
                                    </tbody>
                                )
                            })
                }
            </table>
        </div >
        <div className="container">
            <div className="row pb-4" style={{ height: "60px" }}>
                <div className="col col-xm-12 text-start">
                    <button className="btn btn-secondary align-self-start" onClick={() => handlePrevious()} > Previous </button>
                </div>
                <div className="col col-xm-12">
                    <ul className="text-center">
                        {
                            pageNumbers?.map((number, index) => {
                                let btnClass = " btn btn-outline-secondary mx-1";
                                if (number === currentPage) btnClass = "btn btn-secondary mx-1";
                                return (
                                    <button key={index} className={btnClass}
                                        onClick={() => paginate(number)} >
                                        {number}
                                    </button>
                                );
                            })
                        }
                    </ul>
                </div>
                <div className="col col-xm-12 text-end">
                    <button className="btn btn-secondary ml-2 align-self-" onClick={() => handleNext()}  >   Next </button>
                </div>

            </div>
        </div>

    </>)
}

export default CreateOrganization;