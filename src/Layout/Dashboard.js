import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import useBuyer from '../hooks/useBuyer';
import useSeller from '../hooks/useSeller';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    const [seller] = useSeller(user?.email);
    const [isBuyer] = useBuyer(user?.email);

    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content mx-6">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content">
                        {
                            isBuyer && <>
                            <li><Link to="/dashboard">My Orders</Link></li>
                            </>
                        }
                        {
                            seller?.role==='seller' && <>
                                <li><Link to="/dashboard/addproduct">Add Product</Link></li>
                                <li><Link to="/dashboard/myproducts">My Products</Link></li>
                            </>
                        }

                        {
                            isAdmin && <>
                                <li><Link to="/dashboard/allsellers">All Sellers</Link></li>
                                <li><Link to="/dashboard/allbuyers">All Buyers</Link></li>
                                <li><Link to="/dashboard/allusers">All Users</Link></li>
                            </>
                        }

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;