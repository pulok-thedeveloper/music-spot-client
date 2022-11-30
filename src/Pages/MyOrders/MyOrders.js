import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const MyOrders = () => {
    const { user } = useContext(AuthContext);

    const url = `https://music-spot-server.vercel.app/bookings?email=${user?.email}`;

    const { data: bookings = [] } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers:{
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })



    return (
        <div>
            <h3 className='text-center my-5 text-2xl'>My Orders</h3>

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
                            bookings.map((booking, i) => <tr>
                                <th>{i + 1}</th>

                                <td className='flex items-center'>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={booking.picture} alt="" />
                                        </div>
                                    </div>
                                    {booking.productName}
                                </td>
                                <td>{booking.price}</td>
                                <td>
                                    {
                                        !booking.paid ?
                                        <Link to={`/dashboard/payment/${booking._id}`}><button className='btn btn-primary btn-sm'>Payment</button></Link>
                                        :
                                        <button className='btn disabled btn-sm'>Paid</button>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;