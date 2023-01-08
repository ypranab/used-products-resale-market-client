import React from 'react';
import { useLoaderData } from 'react-router-dom';

const PhoneDetails = () => {
    const phones = useLoaderData();
    return (
        <div className='p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {
                phones.map(phone => <div
                    key={phone._id}
                    className="p-5 card w-3/4 mx-auto shadow-xl">
                    <figure><img src={phone.image} alt="logo" /></figure>
                    <div className="card-body">
                        <h2 className="text-center font-bold">{phone.name}</h2>
                        <h2 className="text-center font-bold">{phone.brand}</h2>
                    </div>
                </div>)
            }
        </div>

    );
};

export default PhoneDetails;