import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const AddProducts = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageHostKey = process.env.REACT_APP_imagebb_key;
    console.log(imageHostKey);

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
                //console.log(imageData);
                if (imageData.success) {
                    //console.log(imageData.data.url)
                    const phone = {
                        name: data.name,
                        brand: data.brand,
                        image: imageData.data.url
                    }
                    fetch('http://localhost:5000/phones', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(phone)
                    })
                        .then(res => res.json())
                        .then(data => {
                            toast.success(`${phone.name} added successfully`)
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
                <div className='w-96 p-6'>
                    <h2 className='text-2xl'>add phone</h2>
                    <form onSubmit={handleSubmit(handleAddPhone)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Phone Name</span></label>
                            <input
                                {...register('name', { required: "Name is required" })}
                                type='text' className="input input-bordered w-full max-w-xs" />
                        </div>
                        {errors.name && <p className='text-red-600' role="alert">{errors.name?.message}</p>}

                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Phone brand</span></label>
                            <select
                                {...register('brand', { required: "Brand is required" })}
                                className="select select-ghost w-full max-w-xs">
                                <option disabled>Pick brand</option>
                                <option>Apple</option>
                                <option>Samsung</option>
                                <option>Nokia</option>
                            </select>
                        </div>
                        {errors.brand && <p className='text-red-600' role="alert">{errors.brand?.message}</p>}

                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text">Image</span></label>
                            <input type='file' {...register('image', {
                                required: "Image is required"
                            })} className="input input-bordered w-full max-w-xs" />
                            {errors.image && <p className='text-red-600' role="alert">{errors.image?.message}</p>}
                        </div>
                        <input className='my-4 w-full btn btn-accent' value="Add a Phone" type="submit" />
                    </form>
                </div>

            </div>

        </div>
    );
};

export default AddProducts;