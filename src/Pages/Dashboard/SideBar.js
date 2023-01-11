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
        <div className='h-screen'>
            {!isSeller && !isAdmin &&
                <Link to='/dashboard/myorders'><button className='btn btn-primary mb-5'>My Orders</button></Link>
            }
            {isSeller && !isAdmin &&
                <>
                    <button className='btn btn-primary mb-5'><Link to='/dashboard/addphone'>Add Phone</Link></button>
                    <button className='btn btn-primary mb-5'><Link to='/dashboard/myproducts'>My Products</Link></button>
                </>
            }
            {
                isAdmin &&
                <>
                    <button className='btn btn-secondary mb-5'><Link to='/dashboard/buyers'>All Buyers</Link></button>
                    <button className='btn btn-secondary mb-5'><Link to='/dashboard/sellers'>All sellers</Link></button>
                </>
            }

        </div>
    );
};

export default SideBar;