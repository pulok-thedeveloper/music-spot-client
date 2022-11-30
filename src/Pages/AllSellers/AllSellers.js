import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const AllSellers = () => {

    const { data: allSellers = [], refetch } = useQuery({
        queryKey: ['allSellers'],
        queryFn: async () => {
            const res = await fetch('https://music-spot-server.vercel.app/users?role=seller');
            const data = await res.json();
            return data;
        }
    });

    const handleDelete = id => {
        const proceed = window.confirm('Are you sure, you wanna delete this user');
        if (proceed) {
            fetch(`https://music-spot-server.vercel.app/users/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
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

    const handleVerifySeller = id => {
        fetch(`https://music-spot-server.vercel.app/users/seller/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Verify Seller Successfully');
                    refetch();
                }
            })
    }


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
                                <td>
                                    {
                                        seller?.verifyStatus === 'verified' ?
                                            <button className="btn btn-sm mr-3" disabled>Verified</button>
                                            :
                                            <button onClick={() => handleVerifySeller(seller._id)} className='btn btn-sm btn-success mr-3'>Verify</button>
                                    }
                                    <button onClick={()=>handleDelete(seller._id)} className='btn btn-sm btn-error'>Delete</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllSellers;