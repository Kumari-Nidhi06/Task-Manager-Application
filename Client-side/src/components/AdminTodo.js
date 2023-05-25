import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from 'react-toastify';
import { getAllUser, deleteUser, addTodo, getAdminTodos, deleteAdminTodo, updateAdminTask, editAdminTodo, markTodoCompleted } from "../redux/actions/adminAction";
import "./style.css";

const AdminTodo = () => {
    const dispatch = useDispatch();
    const isEdit = useSelector((state) => state?.adminReducer?.isEdit);
    const updateTask = useSelector((state) => state?.adminReducer?.updateTodo);
    const users = useSelector((state) => state?.adminReducer.users);
    const adminTodoLists = useSelector((state) => state?.adminReducer.adminTodoList);
    // console.log("adminTodo List", adminTodoLists);
    const [value, setValue] = useState({});
    const [selectedTodo, setSelectedTodo] = useState([]);
    const [state, setstate] = useState({
        query: '', list: []
    })
    const [currentPage, setCurrentPage] = useState(1);
    const [rowPerPAge, setRowPerPage] = useState(5);
    const pageNumbers = [];
    const userId = JSON.parse(localStorage.getItem("user"))['data']['user']['_id'];

    useEffect(() => {
        dispatch(getAllUser());
        dispatch(getAdminTodos());
        setValue({
            ...value,
            userId: userId
        })
        updateTask && setValue(() => updateTask);
    }, [updateTask]);

    const changeEvent = (e) => {
        setValue({
            ...value, [e.target.name]: e.target.value
        })
    }
    /**
     * 
     * @param {Todo Info} data 
     * for editing the todo
     */
    const actionClick = (data) => {
        if (data && data?.type === "edit") {
            console.log("data from adminTodo action click", data);
            const id = data.todo._id;
            dispatch(editAdminTodo(id));
        }
    };
    /**
     * 
     * @param {event} e 
     * @param {task Id} todoId 
     * delete Task Function
     */
    const handleDeleteTodo = (e, todoId) => {
        dispatch(deleteAdminTodo(todoId));
    }

    const checkEvent = (e, id) => {
        if (e?.target?.checked === true) {
            setSelectedTodo(id);
        }
        if (e?.target?.checked === false) {
            setSelectedTodo([]);
        }
    }
    /**
    * Mark as complete
    */
    const markCompleted = () => {
        console.log('Selected todo markCompleted:', selectedTodo);
        dispatch(markTodoCompleted(selectedTodo));
    };
    /**
     * 
     * @param {Event} e
     * Post call for submitting the task by admin 
     */
    const onSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            const id = value._id;
            dispatch(updateAdminTask(id, value));
        }
        else {
            console.log("value is from admin todo", value);
            dispatch(addTodo(value));
        }
    }
    /**
     * 
     * @param {Event} e
     * To serach the perticular task 
     */
    const handleChange = (e) => {
        const results = adminTodoLists?.tasks?.filter(post => {
            if (e.target.value === "") return adminTodoLists
            return post.title.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setstate({
            query: e.target.value,
            list: results
        })
    }
    
    //   ***************  Pagination *****************

    let todoLength;
    if (adminTodoLists?.tasks?.length) {
        todoLength = adminTodoLists?.tasks?.length;
    }

    for (let i = 1; i <= Math.ceil(todoLength / rowPerPAge); i++) {
        pageNumbers.push(i);
    }

    const indexOfLastRowOfCurrentPage = currentPage * rowPerPAge;
    const indexOfFirstRowOfCurrentPage = indexOfLastRowOfCurrentPage - rowPerPAge;

    const currentRows = adminTodoLists?.tasks?.slice(indexOfFirstRowOfCurrentPage, indexOfLastRowOfCurrentPage);
    /**
     * 
     * @param {Move to Specific Page Number} pageNumber 
     */

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    /**
     * 
     * @param {No. task show in the table of } e 
     */
    const handlePageSize = (e) => {
        setRowPerPage(e.target.value);
        setCurrentPage(1);
    }

    const handlePrevious = () => {
        if (currentPage !== 1) setCurrentPage(currentPage - 1);
    }

    const handleNext = () => {
        if (currentPage !== Math.ceil(adminTodoLists?.tasks?.length / rowPerPAge))
            setCurrentPage(currentPage + 1);
    }

    //*********************************** */

    return (
        <>
            <div className="container my-4 py-1 border bg-light rounded">
                <form className="mt-3 mb-2 " id="todoForm" onSubmit={onSubmit}>
                    <div className="row">
                        <div className="col-xl-3">
                            <label className="sr-only">Name</label>
                            <input
                                type="text"
                                name="title"
                                className="form-control mb-2 mr-sm-3"
                                placeholder="Todo Title"
                                defaultValue={value?.title}
                                onChange={(e) => changeEvent(e)}
                            />
                        </div>

                        <div className="col-xl-3">
                            <label className="sr-only">Description</label>
                            <input
                                type="text"
                                name="description"
                                className="form-control mb-2 mr-sm-3"
                                placeholder="Description"
                                defaultValue={value?.description}
                                onChange={(e) => changeEvent(e)}
                            />
                        </div>

                        {isEdit ? null : <div className="col-xl-3">
                            <label className="sr-only">Select User</label>
                            <select className="form-select  mb-2 mr-sm-3" aria-label="Default select example" name="userId" onChange={(e) => changeEvent(e)} >
                                <option>Select User</option>
                                {users?.userList?.map((user, index) =>
                                    <option key={index} value={user._id}>{user.name}</option>
                                )}
                            </select>
                        </div>}

                        <div className="col-xl-2">
                            <button className="btn btn-primary mb-2" type="submit">
                                {" "}
                                {isEdit ? "Update Todo" : "Create Todo"}
                                {" "}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <div className="container bg-light my-4 py-1 border rounded">
                <h3 className="text-center ">Admin Todo List</h3>
                <div className="row pb-4" style={{ height: "60px" }}>

                    <div className="col-lg-3 col-md-3 col-xm-12 ">
                        <input className="form-control mb-2 mr-sm-3" onChange={handleChange} value={state.query} type="search" placeholder=" Search by Name :" />
                    </div>

                    <div className="col-lg-3 col-md-3 col-sm-12 text-left">
                        <select className="form-select" onChange={(e) => handlePageSize(e)} >
                            <option >Select No. Of Item</option>
                            <option value="5" >5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </div>

                    <div className="col-lg-6 col-md-6 col-xm-12 text-right">
                        {/* <button className="btn btn-danger" onClick={() => dispatch(clearAlltodo())}  > Clear Todos   </button> */}
                        {selectedTodo.length > 0 && (
                            <>
                                <button className="btn btn-success ml-2" onClick={markCompleted}>
                                    Mark As Completed
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <table className="table table-bordered table-hover text-center ">
                    <thead>
                        <tr>
                            <th></th>
                            <th width="30%">Title</th>
                            <th width="50%">Description</th>
                            <th>Status</th>
                            <th width="20%"></th>
                        </tr>
                    </thead>

                    {
                        state.query === ''
                            ?
                            <tbody>
                                {
                                    currentRows?.map((todo, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input type={"checkbox"}
                                                    value={todo?._id} onChange={(e) => checkEvent(e, todo._id)}
                                                    name={`todo_${index}`} />
                                            </td>
                                            <td>{todo?.title}</td>
                                            <td>{todo?.description}</td>
                                            <td>
                                                {todo?.status === 'completed' ? (
                                                    <span className="badge text-bg-success p-2">Completed</span>
                                                ) : todo?.status === 'pending' ? (
                                                    <span className="badge text-bg-danger p-2">Pending</span>
                                                ) : ''}
                                            </td>

                                            <td>
                                                <button
                                                    className="btn btn-primary btn-sm bi bi-pencil tooltips"
                                                    onClick={() => actionClick({ todo: todo, type: "edit" })}  >
                                                    <i className="fa-solid fa-pencil"></i><span className="tooltiptext">   Edit Todo
                                                    </span>
                                                </button>
                                                <button className="btn btn-danger btn-sm ml-3 tooltips" onClick={(e) => handleDeleteTodo(e, todo?._id)}>
                                                    <i className="fa-solid fa-trash-can"></i>
                                                    <span className="tooltiptext">Delete Todo</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                            :
                            !state.list.length ? "Your query did not return any results" : state.list.map((post, index) => {
                                return (
                                    <tbody>
                                        <tr key={index}>
                                            <td>
                                                <input type={"checkbox"}
                                                    value={post?._id} onChange={(e) => checkEvent(e, post._id)}
                                                    name={`todo_${index}`} />
                                            </td>
                                            <td>{post?.title}</td>
                                            <td>{post?.description}</td>
                                            <td>
                                                {post?.status === 'completed' ? (
                                                    <span className="badge text-bg-success p-2">Completed</span>
                                                ) : post?.status === 'pending' ? (
                                                    <span className="badge text-bg-danger p-2">Pending</span>
                                                ) : ''}
                                            </td>

                                            <td>
                                                <button
                                                    className="btn btn-primary btn-sm bi bi-pencil tooltips"
                                                    onClick={() => actionClick({ todo: post, type: "edit" })}  >
                                                    <i className="fa-solid fa-pencil"></i><span className="tooltiptext">   Edit Todo
                                                    </span>
                                                </button>
                                                <button className="btn btn-danger btn-sm ml-3 tooltips" onClick={(e) => handleDeleteTodo(e, post?._id)}>
                                                    <i className="fa-solid fa-trash-can"></i>
                                                    <span className="tooltiptext">Delete Todo</span>
                                                </button>
                                            </td>
                                        </tr>
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
        </>
    )
}

export default AdminTodo;