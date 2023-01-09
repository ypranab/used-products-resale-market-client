import React from 'react';
import { useLoaderData } from 'react-router-dom';

const AllSellers = () => {
    const sellers = useLoaderData();
    return (
        <div className="overflow-x-auto w-full">
            <table className="table ml-12 w-3/4">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sellers.map(seller => <tr>
                            <td key={seller._id}>
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
                                <button className="btn btn-ghost btn-xs">details</button>
                            </th>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default AllSellers;