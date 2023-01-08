import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import AddProducts from "../Pages/AdminActivity/AddProducts";
import AllBuyers from "../Pages/Dashboard/AllBuyers";
import Dashboard from "../Pages/Dashboard/Dashboard";
import RouteError from "../Pages/Error/RouteError";
import Home from "../Pages/Home/Home";
import PhoneDetails from "../Pages/Home/PhoneDetails/PhoneDetails";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import AdminRoute from "./AdminRoute/AdminRoute";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/category/:brand',
                element: <PrivateRoute><PhoneDetails></PhoneDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/category/${params.brand}`)
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: '/dashboard/addphone',
                element: <AddProducts></AddProducts>
            },
            {
                path: '/dashboard/buyers',
                element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>,
                loader: () => fetch('http://localhost:5000/buyers')
            }
        ]
    },
    {
        path: '*',
        element: <RouteError></RouteError>
    }
])