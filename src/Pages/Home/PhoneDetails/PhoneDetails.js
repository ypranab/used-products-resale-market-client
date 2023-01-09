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
                        className="p-5 card w-3/4 mx-auto shadow-xl">
                        <figure><img src={phone.image} alt="logo" /></figure>
                        <div className="card-body">
                            <h2 className="text-center font-bold">{phone.name}</h2>
                            <h2 className="text-center font-bold">{phone.brand}</h2>
                        </div>
                        <div className="card-actions justify-center">
                            {user &&
                                <label
                                    htmlFor="booking-modal"
                                    className="btn btn-primary text-white"
                                    onClick={() => setBookedPhone(phone)}
                                >Buy Phone</label>
                            }
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