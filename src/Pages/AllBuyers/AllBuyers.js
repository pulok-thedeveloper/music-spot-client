import { useQuery } from '@tanstack/react-query';

const AllBuyers = () => {

    const {data: allBuyers =[]} = useQuery({
        queryKey: ['allBuyers'],
        queryFn: async() =>{
            const res = await fetch('http://localhost:5000/users?role=buyer');
            const data = await res.json();
            return data;
        }
    });
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
                                <td><button className='btn btn-sm btn-error'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBuyers;