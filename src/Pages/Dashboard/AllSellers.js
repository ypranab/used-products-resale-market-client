import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-hot-toast';

const AllSellers = () => {
    const { data: sellers, isLoading, refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/sellers', {
                    headers: {
                        'content-type': 'application/json',
                    }
                })
                const data = await res.json()
                return data;
            }
            catch (error) {

            }
        }
    })

    if (isLoading) {
        return <p>Loading</p>
    }

    const handleDelete = (seller) => {
        fetch(`http://localhost:5000/seller/${seller._id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('user-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success(`Seller ${seller.name} deleted`)
                refetch();
            })
    }

    return (
        <div className="overflow-x-auto w-full">
            <table className="table ml-12 w-3/4">
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sellers.map((seller, idx) => <tr key={seller._id}>
                            <td>{idx + 1}</td>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div>
                                        <div className="font-bold">{seller.name}</div>
                                        <div className="text-sm opacity-50">{seller.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span className="badge badge-ghost badge-sm">{seller.email}</span>
                            </td>
                            <th>
                                <button onClick={() => { if (window.confirm('Delete the seller?')) { handleDelete(seller) } }} className="btn btn-ghost btn-xs">delete</button>
                            </th>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default AllSellers;