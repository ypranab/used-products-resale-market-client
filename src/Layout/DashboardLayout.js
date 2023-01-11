import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Pages/Common/Header';
import SideBar from '../Pages/Dashboard/SideBar';

const DashboardLayout = () => {
    return (
        <div>
            <Header></Header>
            <div className='flex'>
                <div className='flex-none w-32'>
                    <SideBar></SideBar>
                </div>
                <div className='flex-auto'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;