import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import BookingModal from '../BokkingPhone/BookingModal';

const PhoneDetails = () => {
    const phones = useLoaderData();
    const { user } = useContext(AuthContext);
    const [bookedPhone, setBookedPhone] = useState(null);

    return (
        <>
            <div className='p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    phones.map(phone => <div
                        key={phone._id}
                        className="m-4 card card-side bg-base-100 shadow-xl">
                        <figure className='w-1/2 ml-2'><img src={phone.image} alt="logo" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{phone.name}</h2>
                            <h2 className="font-bold">Brand: {phone.brand}</h2>
                            <h2 className="text-center">Original Price: {phone.price}</h2>
                            <h2 className="text-center">Resale Price: {phone.resalePrice}</h2>
                            <h2 className="text-center">Year Used: {2023 - phone.year} year</h2>
                            <h2 className="text-center">Seller: {phone.userName}</h2>
                            <h2 className="text-center">Location of Seller: {phone.location}</h2>
                            <div className="card-actions justify-center">
                                {user &&
                                    <>
                                        <br />
                                        <label
                                            htmlFor="booking-modal"
                                            className="btn btn-primary text-white"
                                            onClick={() => setBookedPhone(phone)}
                                        >Buy Phone</label>
                                    </>

                                }
                            </div>
                        </div>
                    </div>)
                }
            </div>
            {
                bookedPhone &&
                <BookingModal
                    bookedPhone={bookedPhone}
                    setBookedPhone={setBookedPhone}
                ></BookingModal>
            }
        </>


    );
};

export default PhoneDetails;