import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Checkout from './Checkout';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
    const booking = useLoaderData();
    console.log(booking)

    return (
        <div className='w-1/2 mb-10 h-screen'>
            <Elements stripe={stripePromise}>
                <Checkout
                    booking={booking}
                />
            </Elements>


        </div>
    );
};

export default Payment;