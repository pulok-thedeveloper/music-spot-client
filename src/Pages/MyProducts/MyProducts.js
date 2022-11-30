import { useQuery } from '@tanstack/react-query';
import React, { useContext} from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthProvider';

const MyProducts = () => {
    const { user } = useContext(AuthContext);

    console.log(user);

    const url = `https://music-spot-server.vercel.app/products?email=${user?.email}`;

    const { data: myproducts = [], refetch } = useQuery({
        queryKey: ['myproducts', user?.email],
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

    const handleDelete = id => {
        const proceed = window.confirm('Are you sure, you wanna delete this product');
        if (proceed) {
            fetch(`https://music-spot-server.vercel.app/products/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        refetch();
                        toast.success("deleted successfully");

                    }
                })
        }
    }

    const handleAdvertise= id =>{
        fetch(`https://music-spot-server.vercel.app/products/${id}`, {
            method: 'PUT',
            headers:{
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                toast.success('Advertised Successfully');
                refetch();
            }
        })
    }


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
                                {
                                    product?.status === 'sold' || product.isAdvertise ?
                                    <button className='btn btn-sm disabled mr-3'>Advertise</button>:
                                    <button onClick={()=>handleAdvertise(product._id)} className='btn btn-sm btn-primary mr-3'>Advertise</button>
                                }

                                
                                <button onClick={()=>handleDelete(product._id)} className='btn btn-sm btn-error'>Delete</button>
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