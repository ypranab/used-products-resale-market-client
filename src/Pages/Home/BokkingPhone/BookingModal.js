import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider';

const BookingModal = ({ bookedPhone, setBookedPhone }) => {
    const { user } = useContext(AuthContext);
    console.log(bookedPhone)
    const handleBooking = event => {
        event.preventDefault()
        const form = event.target;
        const phoneName = form.phoneName.value;
        const brand = form.brand.value;
        const price = parseInt(form.price.value);
        const phone = form.phone.value;
        const location = form.location.value;

        const booking = {
            phoneName,
            phoneId: bookedPhone._id,
            brand,
            price,
            phone,
            location,
            email: user.email
        }

        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                //console.log(data)
                if (data.acknowledged) {
                    setBookedPhone(null);
                    toast.success('booking confirmed')
                }
                else {
                    setBookedPhone(null);
                    toast.error(data.message);
                }
            })

    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-4 mt-6'>
                        <input name='name' type="text" defaultValue={user.displayName} disabled placeholder="Name" className="input input-bordered w-full" />
                        <input name='email' type="email" defaultValue={user.email} disabled placeholder="Name" className="input input-bordered w-full" />
                        <input name='phoneName' type="text" defaultValue={bookedPhone.name} disabled placeholder="Name" className="input input-bordered w-full" />
                        <input name='brand' type="text" defaultValue={bookedPhone.brand} disabled placeholder="Brand" className="input input-bordered w-full" />
                        <input name='price' type="text" defaultValue={bookedPhone.price} disabled placeholder="Price" className="input input-bordered w-full" />
                        <input name='location' type="text" placeholder="meeting location" className="input input-bordered w-full" required />
                        <input name='phone' type="text" placeholder="phone number" className="input input-bordered w-full" required />
                        <br />
                        <input type="submit" className='w-full btn btn-accent' value="Submit" />
                    </form>
                </div>
            </div>
        </>

    );
};

export default BookingModal;