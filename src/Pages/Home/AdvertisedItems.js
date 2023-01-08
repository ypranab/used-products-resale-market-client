import React from 'react';

const AdvertisedItems = () => {
    return (
        <div className="stats bg-secondary m-7 text-primary-content">

            <div className="stat">
                <div className="stat-title">Account balance</div>
                <div className="stat-value">$89,400</div>
                <div className="stat-actions">
                    <button className="btn btn-sm btn-success">Add funds</button>
                </div>
            </div>

            <div className="stat">
                <div className="stat-title">Current balance</div>
                <div className="stat-value">$89,400</div>
                <div className="stat-actions">
                    <button className="btn btn-sm">Withdrawal</button>
                    <button className="btn btn-sm">deposit</button>
                </div>
            </div>

        </div>
    );
};

export default AdvertisedItems;