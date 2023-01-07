import React from 'react';
import Banner from './Banner';
import PhoneBrands from './PhoneBrands';

const Home = () => {
    const brands = [
        {
            name: 'Apple', logo: 'https://i.ibb.co/0DLDRSN/apple-logo.png'
        },
        {
            name: 'Samsung', logo: 'https://i.ibb.co/RBYBbnZ/samsung-logo.png'
        },
        {
            name: 'Nokia', logo: 'https://i.ibb.co/ZTWFhg0/Nnokia-logo.png'
        }
    ];

    return (
        <div>
            <Banner></Banner>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    brands.map((brand, idx) => <PhoneBrands
                        key={idx}
                        brand={brand}
                    ></PhoneBrands>)
                }
            </div>

        </div>
    );
};

export default Home;