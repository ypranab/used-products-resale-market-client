import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useAdminRole from '../../hooks/useAdminRole';
import useSeller from '../../hooks/useSeller';

const SideBar = () => {
    const { user } = useContext(AuthContext);
    const [isSeller] = useSeller(user?.email)
    const [isAdmin] = useAdminRole(user?.email)
    return (
        <div className='grid grid-cols-1 gap-4'>
            {!isSeller &&
                <button className='btn btn-primary'><Link to='/dashboard/myorders'>My Orders</Link></button>
            }
            {isSeller && !isAdmin &&
                <>
                    <button className='btn btn-primary'><Link to='/dashboard/addphone'>Add Phone</Link></button>
                    <button className='btn btn-primary'><Link to='/dashboard/myproducts'>My Products</Link></button>
                </>
            }
            {
                isAdmin &&
                <>
                    <button className='btn btn-secondary'><Link to='/dashboard/buyers'>All Buyers</Link></button>
                    <button className='btn btn-secondary'><Link to='/dashboard/sellers'>All sellers</Link></button>
                </>
            }

        </div>
    );
};

export default SideBar;