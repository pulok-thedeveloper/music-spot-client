import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

const Wishlist = () => {
    const { user } = useContext(AuthContext);

    const url = `http://localhost:5000/wishlist?email=${user?.email}`;

    const { data: wishlist = [] } = useQuery({
        queryKey: ['wishlist', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })
    return (
        <div>
            <h3 className='text-center my-5 text-2xl'>My Wishlist</h3>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Items</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            wishlist.map((wishlist, i) => <tr>
                                <th>{i + 1}</th>

                                <td className='flex items-center'>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={wishlist.picture} alt="" />
                                        </div>
                                    </div>
                                    {wishlist.productName}
                                </td>
                                <td>{wishlist.price}</td>
                                <td><button className='btn btn-primary btn-sm'>Payment</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Wishlist;