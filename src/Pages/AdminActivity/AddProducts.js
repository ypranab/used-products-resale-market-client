import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const AddProducts = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageHostKey = process.env.REACT_APP_imagebb_key;
    const navigate = useNavigate();

    const handleAddPhone = (data) => {
        console.log(data);
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
            method: 'POST',
            body: formData
        })
            .then((response) => response.json())
            .then((imageData) => {
                if (imageData.success) {
                    const phone = {
                        name: data.name,
                        brand: data.brand,
                        price: parseInt(data.price),
                        image: imageData.data.url,
                        condition: data.condition,
                        location: data.location,
                        resalePrice: parseInt(data.resalePrice),
                        year: parseInt(data.year),
                        email: user?.email,
                        userName: user?.displayName
                    }
                    fetch('http://localhost:5000/phones', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authoriation: `bearer ${localStorage.getItem('user-token')}`
                        },
                        body: JSON.stringify(phone)
                    })
                        .then(res => res.json())
                        .then(data => {
                            toast.success(`${phone.name} added successfully`)
                            navigate('/dashboard/myproducts')
                        })
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    return (
        <div>
            <div>
                <div className='w-3/4 p-6'>
                    <h2 className='text-2xl'>ADD phone</h2>
                    <div className="divider"></div>
                    <form className='grid grid-cols-2 gap-8' onSubmit={handleSubmit(handleAddPhone)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Phone Name</span></label>
                            <input
                                {...register('name', { required: "Name is required" })}
                                type='text' className="input input-bordered w-full max-w-xs" />
                        </div>
                        {errors.name && <p className='text-red-600' role="alert">{errors.name?.message}</p>}

                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Phone Original Price</span></label>
                            <input
                                {...register('price', { required: "Price is required" })}
                                type='text' className="input input-bordered w-full max-w-xs" />
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Phone's Resale Price</span></label>
                            <input
                                {...register('resalePrice', { required: "Price is required" })}
                                type='text' className="input input-bordered w-full max-w-xs" />
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Purchase Year</span></label>
                            <input
                                {...register('year', { required: "year is required" })}
                                type='text' className="input input-bordered w-full max-w-xs" />
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Phone Number</span></label>
                            <input
                                {...register('mobile', { required: "mobile is required" })}
                                type='text' className="input input-bordered w-full max-w-xs" />
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Location</span></label>
                            <input
                                {...register('location', { required: "location is required" })}
                                type='text' className="input input-bordered w-full max-w-xs" />
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Select Phone brand</span></label>
                            <select
                                {...register('brand', { required: "Brand is required" })}
                                className="select select-ghost w-full max-w-xs">
                                <option>Apple</option>
                                <option>Samsung</option>
                                <option>Nokia</option>
                            </select>
                        </div>
                        {errors.brand && <p className='text-red-600' role="alert">{errors.brand?.message}</p>}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Select Condition</span>
                            </label>
                            <select
                                {...register('condition', { required: "condition is required" })}
                                className="select select-ghost w-full max-w-xs">
                                <option>Excellent</option>
                                <option>Good</option>
                                <option>Fair</option>
                            </select>
                        </div>
                        {errors.condition && <p className='text-red-600' role="alert">{errors.condition?.message}</p>}

                        <div className="form-control w-full max-w-xs">
                            <input {...register('image', {
                                required: "Image is required"
                            })}
                                type="file" className="file-input file-input-bordered file-input-accent w-full max-w-xs" />                            {errors.image && <p className='text-red-600' role="alert">{errors.image?.message}</p>}
                        </div>
                        <br />
                        <input className='my-4 w-full btn btn-accent' value="Add Phone" type="submit" />
                    </form>
                </div>

            </div>

        </div>
    );
};

export default AddProducts;