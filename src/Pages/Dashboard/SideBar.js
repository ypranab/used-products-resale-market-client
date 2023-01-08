import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useAdminRole from '../../hooks/useAdminRole';
import useSeller from '../../hooks/useSeller';

const SideBar = () => {
    const { user } = useContext(AuthContext);
    const [isSeller] = useSeller(user?.email)
    console.log(isSeller)
    const [isAdmin] = useAdminRole(user?.email)
    return (
        <div>
            {isSeller &&
                <button className='btn btn-primary'><Link to='/dashboard/addphone'>Add Phone</Link></button>
            }
            {
                isAdmin &&
                <button className='btn btn-secondary'><Link to='/dashboard/buyers'>All Buyers</Link></button>
            }

        </div>
    );
};

export default SideBar;