import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-hot-toast';

const AllSellers = () => {
    const { data: sellers, isLoading, refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            try {
                const res = await fetch('https://used-products-resale-market-server-five.vercel.app/sellers', {
                    headers: {
                        'content-type': 'application/json',
                    }
                })
                const data = await res.json()
                return data;
            }
            catch (error) { }
        }
    })

    if (isLoading) {
        return <p>Loading</p>
    }

    const handleDelete = (seller) => {
        fetch(`https://used-products-resale-market-server-five.vercel.app/seller/${seller._id}`, {
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

    const handleVerify = seller => {
        fetch(`https://used-products-resale-market-server-five.vercel.app/users/verify${seller._id}/${seller.email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('user-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Verified Successfully')
                    refetch()
                }
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
                        <th>Verify</th>
                        <th>Delete</th>
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
                            <td>
                                {!seller.verify ?
                                    <button className='btn btn-secondary btn-xs'
                                        onClick={() => { if (window.confirm('Are you sure?')) { handleVerify(seller) } }}>Verify</button>
                                    : <button className='btn btn-xs' disabled>verified</button>}
                            </td>
                            <th>
                                <button
                                    onClick={() => { if (window.confirm('Delete the seller?')) { handleDelete(seller) } }} className="btn btn-warning btn-xs">delete</button>
                            </th>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default AllSellers;