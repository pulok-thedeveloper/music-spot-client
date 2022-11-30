import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const AllUsers = () => {

    const {data: allUsers =[], refetch} = useQuery({
        queryKey: ['allUsers'],
        queryFn: async() =>{
            const res = await fetch('https://music-spot-server.vercel.app/users');
            const data = await res.json();
            return data;
        }
    });

    const handleMakeAdmin= id =>{
        fetch(`https://music-spot-server.vercel.app/users/admin/${id}`, {
            method: 'PUT',
            headers:{
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                toast.success('Make Admin Successfully');
                refetch();
            }
        })
    }
    return (
        <div>
            <h3 className='text-center my-5 text-2xl'>All Users</h3>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUsers.map((user, i) => <tr>
                                <th>{i + 1}</th>
                                <td >
                                    {user.name}
                                </td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                {
                                    user?.role !== 'admin' &&
                                        <button onClick={()=> handleMakeAdmin(user._id)} className='btn btn-sm btn-primary mr-3'>Make Admin</button>
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

export default AllUsers;