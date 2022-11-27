import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import AllProducts from "../../Pages/AllProducts/AllProducts";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import MyOrders from "../../Pages/MyOrders/MyOrders";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/allproducts',
                element: <AllProducts></AllProducts>
            },

            {
                path: '/myorders',
                element: <PrivateRoute><MyOrders></MyOrders></PrivateRoute>
            },
        ]
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/signup',
        element: <SignUp></SignUp>
    },
])

export default router;