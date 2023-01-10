import React from 'react';
import { Link } from 'react-router-dom';

const PhoneBrands = ({ brand }) => {
    const { logo, name } = brand;
    return (

        <Link to={`/category/${name}`}>
            <div className="p-5 card bg-cyan-100 w-3/4 mx-auto shadow-xl">
                <figure><img src={logo} alt="logo" /></figure>
                <div className="card-body">
                    <h2 className="text-center font-bold">{name}</h2>
                </div>
            </div>
        </Link>

    );
};

export default PhoneBrands;