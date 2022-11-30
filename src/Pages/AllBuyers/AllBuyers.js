import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const AllBuyers = () => {

    const {data: allBuyers =[], refetch} = useQuery({
        queryKey: ['allBuyers'],
        queryFn: async() =>{
            const res = await fetch('http://localhost:5000/users?role=buyer');
            const data = await res.json();
            return data;
        }
    });


    const handleDelete = id => {
        const proceed = window.confirm('Are you sure, you wanna delete this user');
        if (proceed) {
            fetch(`http://localhost:5000/users/${id}`, {
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
    return (
        <div>
            <h3 className='text-center my-5 text-2xl'>All Buyers</h3>

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
                            allBuyers.map((buyer, i) => <tr>
                                <th>{i + 1}</th>
                                <td >
                                    {buyer.name}
                                </td>
                                <td>{buyer.email}</td>
                                <td><button onClick={()=>handleDelete(buyer._id)} className='btn btn-sm btn-error'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBuyers;