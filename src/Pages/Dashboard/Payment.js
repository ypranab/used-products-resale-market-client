import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Payment = () => {
    const booking = useLoaderData();
    console.log(booking)
    return (
        <div className='mb-10'>
            <div className="indicator">
                <div className="indicator-item indicator-bottom">
                    <button className="btn btn-error">Pay BDT {booking.price}</button>
                </div>
                <div className="card border">
                    <div className="card-body">
                        <h2 className="card-title">Payment for {booking.phoneName}</h2>
                        <p>Rerum reiciendis beatae tenetur excepturi</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;