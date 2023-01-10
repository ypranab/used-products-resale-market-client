import { useEffect, useState } from 'react';

const useSeller = (email) => {
    const [isSeller, setIsSeller] = useState(false);
    const [sellerLoading, setSellerLoading] = useState(true);
    useEffect(() => {
        fetch(`http://localhost:5000/sellers/${email}`)
            .then(res => res.json())
            .then(data => {
                setIsSeller(data.isSeller)
                setSellerLoading(false)
            })
    }, [email, isSeller])

    return [isSeller, sellerLoading]
};

export default useSeller;