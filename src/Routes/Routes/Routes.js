import { createBrowserRouter } from "react-router-dom";
import Error404 from "../../Error404/Error404";
import Dashboard from "../../Layout/Dashboard";
import Main from "../../Layout/Main";
import AddProduct from "../../Pages/AddProduct/AddProduct";
import AllBuyers from "../../Pages/AllBuyers/AllBuyers";
import FilterProducts from "../../Pages/AllProducts/FilterProducts/FilterProducts";
import AllSellers from "../../Pages/AllSellers/AllSellers";
import AllUsers from "../../Pages/AllUsers/AllUsers";
import Blogs from "../../Pages/Blogs/Blogs";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import MyOrders from "../../Pages/MyOrders/MyOrders";
import MyProducts from "../../Pages/MyProducts/MyProducts";
import PaymentGateway from "../../Pages/PaymentGateway/PaymentGateway";
import SignUp from "../../Pages/SignUp/SignUp";
import Wishlist from "../../Wishlist/Wishlist";
import AdminRoute from "../AdminRoute/AdminRoute";
import BuyerRoute from "../BuyerRoute/BuyerRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SellerRoute from "../SellerRoute/SellerRoute";

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
                path: '/blogs',
                element: <Blogs></Blogs>
            },

            {
                path: '/category/:name',
                element: <PrivateRoute><FilterProducts></FilterProducts></PrivateRoute>
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: '/dashboard/myorders',
                element: <BuyerRoute><MyOrders></MyOrders></BuyerRoute>
            },
            {
                path: '/dashboard/wishlist',
                element: <BuyerRoute><Wishlist></Wishlist></BuyerRoute>
            },
            {
                path: '/dashboard/addproduct',
                element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
            },
            {
                path: '/dashboard/myproducts',
                element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
            },
            {
                path: '/dashboard/allbuyers',
                element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>
            },
            {
                path: '/dashboard/allsellers',
                element: <AdminRoute><AllSellers></AllSellers></AdminRoute>
            },
            {
                path: '/dashboard/allusers',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: '/dashboard/payment/:id',
                element: <PaymentGateway></PaymentGateway>,
                loader: ({params}) => fetch(`https://music-spot-server.vercel.app/bookings/${params.id}`)
            },
        ]
    },
    {
        path: '*',
        element: <Error404></Error404>
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