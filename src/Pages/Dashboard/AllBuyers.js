import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-hot-toast';

const AllBuyers = () => {

    const { data: buyers, isLoading, refetch } = useQuery({
        queryKey: ['buyers'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/buyers', {
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

    const handleDelete = (buyer) => {
        fetch(`http://localhost:5000/seller/${buyer._id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('user-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                refetch();
                toast.success(`Buyer ${buyer.name} deleted`)
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
                        buyers.map((buyer, idx) => <tr key={buyer._id}>
                            <td>{idx + 1}</td>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div>
                                        <div className="font-bold">{buyer.name}</div>
                                        <div className="text-sm opacity-50">{buyer.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span className="badge badge-ghost badge-sm">{buyer.email}</span>
                            </td>
                            <th>
                                <button onClick={() => { if (window.confirm('Delete the buyer?')) { handleDelete(buyer) } }} className="btn btn-ghost btn-xs">delete</button>
                            </th>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default AllBuyers;