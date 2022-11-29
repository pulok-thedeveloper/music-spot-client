import React, { useEffect, useState } from 'react';

const AllSellers = () => {
    const [allSellers, setAllSellers] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/users?role=seller')
            .then(res => res.json())
            .then(data => {
                setAllSellers(data);
            })
    }, [])
    return (
        <div>
            <h3 className='text-center my-5 text-2xl'>All Sellers</h3>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allSellers.map((seller, i) => <tr>
                                <th>{i + 1}</th>
                                <td >
                                    {seller.name}
                                </td>
                                <td>{seller.email}</td>
                                <td><button className='btn btn-sm btn-error'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllSellers;