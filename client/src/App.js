import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Menu from "./components/nav/Menu"
import Home from './pages/auth/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/user/Dashboard'
import PrivateRoute from "./components/routes/PrivateRoute";

export default  function App() {
  return (
    <BrowserRouter>
    <Menu />
    <Toaster />
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/*Dashboard route is being protected*/}
    <Route path="/dashboard" element={<PrivateRoute />} >

   {/*You dont need to specify the path since the parent"privateRoute" is having it */}
    <Route path="" element={<Dashboard />} />
    </Route>

    </Routes>
    </BrowserRouter>
  )
}

//
// 
