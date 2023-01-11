import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const MyOrders = () => {
    const { user } = useContext(AuthContext);

    const { data: bookings = [] } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://used-products-resale-market-server-five.vercel.app/bookings?email=${user?.email}`, {
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('user-token')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })
    //setCartLength(bookings.length);
    return (
        <div>
            <h2 className='text-2xl mb-8'>My Orders</h2>
            <div className="overflow-x-auto mr-10">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>SN</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings &&
                            bookings?.map((booking, idx) =>
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <th>{booking.phoneName}</th>
                                    <th>{booking.brand}</th>
                                    <th>{booking.price}</th>
                                    <th>
                                        {
                                            booking.price && !booking.paid &&
                                            <Link to={`/dashboard/payment/${booking._id}`}><button className='btn btn-sm'>pay</button></Link>
                                        }
                                        {
                                            booking.paid && <span className='text-success'>paid</span>
                                        }
                                    </th>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;