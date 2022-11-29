import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const MyProducts = () => {
    const [myproducts, setMyProducts] = useState([]);
    const { user } = useContext(AuthContext);
    console.log(user);
    useEffect(() => {
        fetch(`http://localhost:5000/products?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setMyProducts(data);
            })
    }, [user?.email])


    return (
        <div>
            <h3 className='text-center my-5 text-2xl'>My Products</h3>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className='text-center'>
                            <th></th>
                            <th>Items</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myproducts.map((product, i) => <tr>
                                <th>{i + 1}</th>

                                <td className='flex items-center'>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={product.picture} alt="" />
                                        </div>
                                    </div>
                                    {product.productName}
                                </td>
                                <td>{product.resalePrice}</td>
                                <td>{product.status}</td>
                                <td>
                                <button className='btn btn-sm btn-primary mr-3'>Advertise</button>
                                <button className='btn btn-sm btn-error'>Delete</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;