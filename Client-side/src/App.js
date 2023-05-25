import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// require('dotenv').config(); 
import Login from './components/Login';
import SignUp from "../src/components/SignUp";
import AddTodo from './components/AddTodo';
import UserTodo from './components/UserTodo';
import TodoLists from "./components/TodoLists";
import Navbar from './components/Navbar';
import AdminTodo from './components/AdminTodo';
import CreateAdmin from './components/CreateAdmin';
import CreateOrganization from './components/CreateOrganization';
import CreateUser from './components/CreateUser';
import AdminPrivateRoutes from "./Routes/AdminPrivateRoute";
import PreventLoginPagePrivate from "./Routes/PriventLoginPagePrivate";
import AfterLogin from './Routes/AfterLogin';
import UserPrivateRoutes from './Routes/UserPrivateRoute';
import SuperAdminPrivateRoutes from "./Routes/SuperAdminPrivateRoute";

function App() {
  const [value, setValue] = useState("")
  const [login, setLogin] = useState(false);
  useEffect(() => {
    setValue(localStorage.getItem("user"));
  }, [login]);
  return (<>

    <Router >
      {value !== null ? <Navbar setLogin={setLogin} /> : null}
      {/* <Navbar /> */}
      <Routes >

        <Route element={<PreventLoginPagePrivate />}>
          <Route path="/" element={<Login setLogin={setLogin} />} />
          <Route index element={<Login setLogin={setLogin} />} />
          <Route path="/" element={< Login />} />
        </Route>

        <Route element={<AfterLogin />}>
          <Route path="/nav" element={<Navbar />} exact />
        </Route>

        <Route element={<AdminPrivateRoutes />}>
          <Route path="/nav" element={<Navbar />} exact />
          <Route path="/adminTodo" element={<AdminTodo />} exact />
          <Route path="/createUser" element={<CreateUser />} />
        </Route>

        <Route element={<SuperAdminPrivateRoutes />}>
          <Route path="/nav" element={<Navbar />} exact />
          <Route path="/createAdmin" element={<CreateAdmin />} exact />
          <Route path="/createOrganization" element={<CreateOrganization />} exact />
        </Route>

        <Route element={<UserPrivateRoutes />}>
          <Route path="/userTodo" element={<UserTodo />} exact />

          {/* <Route path="/addTodo" element={<AddTodo />} exact />
          <Route path="/todoList" element={<TodoLists />} exact /> */}
        </Route>

      </Routes>
    </Router>
  </>);
}

export default App;
