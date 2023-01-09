import React from 'react';
import { useLoaderData } from 'react-router-dom';

const AllBuyers = () => {
    const buyers = useLoaderData();
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
                        buyers.map(buyer => <tr key={buyer._id}>
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
                                <button className="btn btn-ghost btn-xs">details</button>
                            </th>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default AllBuyers;