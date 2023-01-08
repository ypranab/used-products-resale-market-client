import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Common/Header';
import SideBar from './SideBar';

const Dashboard = () => {
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

export default Dashboard;