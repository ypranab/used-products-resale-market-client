import React from 'react';
import AdvertisedItems from './AdvertisedItems';
import Banner from './Banner';
import PhoneBrands from './PhoneBrands';

const Home = () => {
    const brands = [
        {
            id: 1, name: 'Apple', logo: 'https://i.ibb.co/0DLDRSN/apple-logo.png'
        },
        {
            id: 2, name: 'Samsung', logo: 'https://i.ibb.co/RBYBbnZ/samsung-logo.png'
        },
        {
            id: 3, name: 'Nokia', logo: 'https://i.ibb.co/ZTWFhg0/Nnokia-logo.png'
        }
    ];

    return (
        <div>
            <Banner></Banner>
            <div className='p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    brands.map((brand, idx) => <PhoneBrands
                        key={idx}
                        brand={brand}
                    ></PhoneBrands>)
                }
            </div>
            <AdvertisedItems></AdvertisedItems>
            <div>
                <label className="swap swap-flip text-5xl">

                    <input type="checkbox" />

                    <div className="swap-on"><img src={'https://i.ibb.co/swF0kyY/banner-1.png'} alt="" /></div>
                    <div className="swap-off">
                        <div className="hero bg-base-200">
                            <div className="hero-content text-center">
                                <div className="max-w-md">
                                    <h1 className="text-5xl font-bold">Exiting offers</h1>
                                    <p className="py-6">New Year Sale!!</p>
                                    <span className='swap-on'>
                                        <span className="btn btn-primary">Get Started</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </label>
            </div>

        </div>
    );
};

export default Home;