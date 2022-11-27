import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/icon.png'
import { AuthContext } from '../../../context/AuthProvider';
import avatar from '../../../assets/avatar.jpg'

const Navbar = () => {
    const [categories, setCategories] = useState([]);
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetch('categories.json')
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])

    const categoriyList = <>
        {
            categories.map(category => <li key={category._id}><Link to={`/category/${category.name}`}>{category.name}</Link></li>)
        }
    </>

    const menuItems = <>
        <li><Link to='/'>Home</Link></li>
        <li tabIndex={0}>
            <Link to='/allproducts' className="justify-between">
                Products
                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
            </Link>
            <ul className="p-2 bg-base-200 z-10">
                {categoriyList}
            </ul>
        </li>
        <li><Link to='/blogs'>Blogs</Link></li>

    </>
    return (
        <div className="navbar bg-base-100 border-b">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl">
                    <img className='w-8 mr-2' src={logo} alt='' />
                    Music Spot
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user?.uid ?
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={avatar} alt=""/>
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                {
                                    user?.uid && <li><Link to='/myorders'>My Orders</Link></li>
                                }
                                <li><button onClick={handleLogOut}>Sign Out</button></li>
                            </ul>
                        </div>

                        :
                        <Link to='/login'><button className="btn rounded-none btn-primary">Login</button></Link>

                }
            </div>
        </div>
    );
};

export default Navbar;