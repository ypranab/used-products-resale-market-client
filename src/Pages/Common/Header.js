import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useAdminRole from '../../hooks/useAdminRole';
import useSeller from '../../hooks/useSeller';

const Header = () => {
    const { user, logOut, loading } = useContext(AuthContext);
    const [isAdmin] = useAdminRole(user?.email)
    const [isSeller] = useSeller(user?.email)
    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch((error) => { console.log(error) })
    }
    const menuItem = <>
        {
            user?.uid ?
                <li><button onClick={handleLogout} className='text-secondary'>Logout</button></li>
                : <li><Link to='/login'><button className='btn btn-primary'>Login</button></Link></li>
        }
    </>

    return (
        <div className="navbar bg-accent mb-4">
            <div className="flex-1">
                <Link to='/' className="btn btn-ghost normal-case text-xl">Home</Link>
            </div>
            <div className="flex-1">
                <Link to='/blog' className="btn btn-ghost normal-case text-xl">Blog</Link>
            </div>
            <div className="flex-none">
                {!isSeller && user && <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle mr-3">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        </div>
                    </label>
                    <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
                        <div className="card-body">
                            <div className="card-actions">
                                <Link className='mx-auto' to='/dashboard/myorders'><button className="btn btn-primary btn-block">View cart</button></Link>
                            </div>
                        </div>
                    </div>
                </div>}
                <div className="dropdown dropdown-end">
                    {
                        user ?
                            <label tabIndex={0} className="btn btn-primary btn-circle">
                                <div className="w-10 rounded-full">
                                    <span className="text-xs">{isAdmin && 'Admin'}{!isAdmin && (isSeller ? 'seller' : 'buyer')}</span>
                                </div>
                            </label>
                            :
                            <Link className='btn btn-outline' to='/login'>login</Link>
                    }
                    {user && <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li className='font-extrabold text-red-400'>
                            <span>{user?.displayName}</span></li>
                        <li><Link to='/dashboard'>Dashboard</Link></li>
                        {menuItem}
                    </ul>}
                </div>
            </div>
        </div>
    );
};

export default Header;