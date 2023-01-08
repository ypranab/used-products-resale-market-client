import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useAdminRole from '../../hooks/useAdminRole';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdminRole(user?.email)
    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch((error) => { console.log(error) })
    }
    const menuItem = <>
        {
            user?.uid ?
                <>
                    <li><button onClick={handleLogout} className='text-secondary'>Logout</button></li>
                </>
                : <li><Link to='/login'>Login</Link></li>
        }
    </>
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link to='/' className="btn btn-ghost normal-case text-xl">Home</Link>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            <span className="badge badge-sm indicator-item">8</span>
                        </div>
                    </label>
                    <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
                        <div className="card-body">
                            <span className="font-bold text-lg">8 Items</span>
                            <span className="text-info">Subtotal: $999</span>
                            <div className="card-actions">
                                <button className="btn btn-primary btn-block">View cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dropdown dropdown-end">
                    {
                        user ?
                            <label tabIndex={0} className="btn btn-primary btn-circle">
                                <div className="w-10 rounded-full">
                                    {user?.name}
                                </div>
                            </label>
                            :
                            <Link to='/login'>login</Link>
                    }
                    {user && <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <Link className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li><Link to='/dashboard'>Dashboard</Link></li>
                        {
                            isAdmin &&
                            <>
                                <li><Link to='/dashboard/addphone'>Add Phone</Link></li>
                                <li><Link to='/dashboard/buyers'>Users</Link></li>
                            </>
                        }
                        {menuItem}
                    </ul>}
                </div>
            </div>
        </div>
    );
};

export default Header;