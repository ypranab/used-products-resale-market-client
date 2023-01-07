import React from 'react';
import { Link } from 'react-router-dom';

const PhoneBrands = ({ brand }) => {
    return (

        <Link to='/login'>
            <div className="card w-3/4 mx-auto shadow-xl">
                <figure><img src={brand.logo} alt="logo" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{brand.name}</h2>
                </div>
            </div>
        </Link>

    );
};

export default PhoneBrands;