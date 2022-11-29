import { useQuery } from '@tanstack/react-query';

const AllSellers = () => {

    const {data: allSellers =[]} = useQuery({
        queryKey: ['allSellers'],
        queryFn: async() =>{
            const res = await fetch('http://localhost:5000/users?role=seller');
            const data = await res.json();
            return data;
        }
    });


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
                                <button className='btn btn-sm btn-success mr-3'>Verify</button>
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

export default AllSellers;