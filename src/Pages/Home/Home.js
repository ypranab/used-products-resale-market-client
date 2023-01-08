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
        </div>
    );
};

export default Home;