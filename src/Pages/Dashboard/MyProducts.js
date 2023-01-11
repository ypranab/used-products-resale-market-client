import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthProvider';

const MyProducts = () => {
    const { user } = useContext(AuthContext);

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://used-products-resale-market-server-five.vercel.app/products?email=${user?.email}`, {
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('user-token')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <p>Loading</p>
    }

    const handleDelete = (id) => {
        fetch(`https://used-products-resale-market-server-five.vercel.app/products/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('user-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                //console.log(data)
                toast.success(`Phone deleted`)
                refetch();
            })
    }
    return (
        <div>
            <h2 className='text-2xl mb-8'>My products {products?.length}</h2>
            <div className="overflow-x-auto mr-10">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>SN</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Resale Price</th>
                            <th>Purchase Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products &&
                            products?.map((product, idx) =>
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <th>{product.name}</th>
                                    <th>{product.brand}</th>
                                    <th>{product.resalePrice}</th>
                                    <th>{product.price}</th>
                                    <th className='text-green-400'>{product.status}</th>
                                    <th>
                                        <button onClick={() => { if (window.confirm('Delete the phone?')) { handleDelete(product._id) } }} className="btn btn-warning btn-xs">delete</button>
                                    </th>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;