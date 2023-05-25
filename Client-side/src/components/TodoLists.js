import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./style.css"

import {
  getTodos,
  deleteTodo,
  editTodo,
  markTodoCompleted,
  clearAlltodo, deleteUserTodo
} from "../redux/actions";
import "./style.css";

const TodoLists = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state?.todoReducer?.todos);
  console.log("Todos", todos);
  const [selectedTodo, setSelectedTodo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(5);
  const [search, setSearch] = useState();
  const pageNumbers = [];

  let todoLength;
  if (todos?.tasks?.length) {
    todoLength = todos?.tasks?.length;
  }

  useEffect(() => {
    dispatch(getTodos());
  }, [])

  //  **************** Pagination Logic *******************

  for (let i = 1; i <= Math.ceil(todoLength / rowPerPage); i++) {
    pageNumbers.push(i);
  }

  const indexOfLastRowOfCurrentPage = currentPage * rowPerPage;
  const indexOfFirstRowOfCurrentPage = indexOfLastRowOfCurrentPage - rowPerPage;

  const currentRows = todos?.tasks?.slice(indexOfFirstRowOfCurrentPage, indexOfLastRowOfCurrentPage);

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
    if (currentPage !== Math.ceil(todos.length / rowPerPage))
      setCurrentPage(currentPage + 1);
  }

  // *******************************************

  /**
   * actionClick Function
   * @param {Todo list and Action type ->  Edit or Delete todo in JSON form} data
   */
  const actionClick = (data) => {
    if (data && data?.type === "edit") {
      const idd = data.todo._id;
      dispatch(editTodo(idd));
    } else if (data && data?.type === "delete") {
      const id = data.todo._id;
      console.log("todo id from todoList action click", id)
      dispatch(deleteUserTodo(id));
    }
  };

  const deleteTodoo = (taskId) => {
    console.log("task id from todoList", taskId);
    dispatch(deleteUserTodo(taskId));
  }
  /**
   * Function
   * @param {event} e
   * @param {todo Id} todoId
   */
  const changeEvent = (e, id) => {
    if (e?.target?.checked === true) {
      setSelectedTodo(id);
    }
    if (e?.target?.checked === false) {
      setSelectedTodo([]);
    }
  }

  /**
   * function to mark the perticular todo as completed
   */
  const markCompleted = () => {
    console.log('Selected todo markCompleted:', selectedTodo);
    dispatch(markTodoCompleted(selectedTodo));
  };

  const [query, setquery] = useState('');
  const [state, setstate] = useState({
    query: '',
    list: []
  })
  const handleChange = (e) => {
    const results = todos?.tasks?.filter(post => {
      if (e.target.value === "") return todos
      return post.title.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setstate({
      query: e.target.value,
      list: results
    })
  }

  return (<>
    <div className="container my-2 pt-2 bg-light rounded ">
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
          {selectedTodo.length > 0 && (
            <>
              <button className="btn btn-success ml-2" onClick={markCompleted}>
                Mark As Completed
              </button>
            </>
          )}
        </div>
      </div>

      <table className="table table-bordered  overflow-y-scroll table-hover" id="myTable" >
        <thead>
          <tr>
            <th width="3%">
            </th>
            <th width="30%">Name</th>
            <th width="42%">Description</th>
            <th width="8%">Status</th>
            <th width="20%">Action</th>
          </tr>
        </thead>
        {
          state.query === ''
            ?
            <tbody >
              {
                currentRows?.map((todo, index) => (
                  <tr key={index}>
                    <td>
                      <input type={"checkbox"}
                        value={todo?._id} onChange={(e) => changeEvent(e, todo._id)}
                        name={`todo_${index}`} />
                    </td>
                    <td>{todo?.title} </td>
                    <td>{todo?.description}</td>
                    <td>
                      {todo?.status === 'completed' ? (
                        <span className="badge text-bg-success p-2">Completed</span>
                      ) : todo?.status === 'pending' ? (
                        <span className="badge text-bg-danger p-2">Pending</span>
                      ) : ''}
                    </td>
                    <td>
                      {todo?.role ? null : <>
                        <button
                          className="btn btn-primary btn-sm bi bi-pencil tooltips"
                          onClick={() => actionClick({ todo: todo, type: "edit" })}  >
                          <i className="fa-solid fa-pencil"></i> <span className="tooltiptext">
                            Edit Todo
                          </span>
                        </button>
                        <button className="btn btn-danger btn-sm ml-1 tooltips"
                          onClick={() => { deleteTodoo(todo?._id) }}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                          <span className="tooltiptext">Delete Todo</span>
                        </button>
                      </>
                      }
                    </td>
                  </tr>
                ))
              }
            </tbody>
            :
            !state.list.length ? "Your query did not return any results" : state.list.map((post, index) => {
              return (
                <tbody >
                  {
                    <tr key={index}>
                      <td>
                        <input type={"checkbox"}
                          value={post?.id} onChange={(e) => changeEvent(e, post._id)}
                          name={`todo_${index}`} />
                      </td>
                      <td>{post.title}  </td>
                      <td>{post.description}</td>
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
                          onClick={() => actionClick({ todo: post, type: "edit" })}
                        > <i className="fa-solid fa-pencil"></i>
                          <span className="tooltiptext">Edit Todo</span>
                        </button>
                        <button className="btn btn-danger btn-sm ml-1 tooltips"
                          onClick={() => actionClick({ todo: post, type: "delete" })} >
                          <i className="fa-solid fa-trash-can"></i>
                          <span className="tooltiptext">Delete Todo</span>
                        </button>
                      </td>
                    </tr>

                  }
                </tbody>
              )
            })
        }
      </table>

      <div className="row pb-4" style={{ height: "60px" }}>
        <div className="col col-xm-12 text-start">
          <button className="btn btn-secondary align-self-start" onClick={() => handlePrevious()} > Previous 12</button>
        </div>
        <div className="col col-xm-12">
          <ul className="text-center">
            {
              pageNumbers?.map((number) => {
                let btnClass = " btn btn-outline-secondary mx-1";
                if (number === currentPage) btnClass = "btn btn-secondary mx-1";
                return (
                  <button className={btnClass}
                    onClick={() => paginate(number)} >
                    {number}
                  </button>
                );
              })
            }
          </ul>
        </div>
        <div className="col col-xm-12 text-end">
          <button className="btn btn-secondary ml-2 align-self-" onClick={() => handleNext()} > Next </button>
        </div>
      </div>
    </div>
    <ToastContainer />
  </>
  );
};

export default TodoLists;
