import React from 'react';

const AdvertisedItems = () => {
    return (
        <div className="stats w-3/4 lg:w-1/2 bg-secondary m-7 text-primary-content">

            <div className="w-full stat">
                <div className="stat-title">Hot Sale</div>
                <div className="stat-value">Discount 10%</div>
                <div className="stat-actions">
                    <button className="btn btn-sm btn-success">buy now</button>
                </div>
            </div>

            <div className="stat">
                <div className="stat-title">Hurry UP!!</div>
                <div className="stat-value">Stock limited</div>
                <div className="stat-actions">
                    <button className="btn btn-sm mr-2">OFFERS</button>
                    <button className="btn btn-sm">ADD To WISHLIST</button>
                </div>
            </div>

        </div>
    );
};

export default AdvertisedItems;