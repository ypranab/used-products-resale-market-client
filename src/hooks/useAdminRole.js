import { useEffect, useState } from 'react';

const useAdminRole = (email) => {
    const [isAdmin, setIsAmdin] = useState(false);
    const [adminLoading, setAdminLoading] = useState(true);
    useEffect(() => {
        fetch(`https://used-products-resale-market-server-five.vercel.app/users/admin/${email}`)
            .then(res => res.json())
            .then(data => {
                setIsAmdin(data.isAdmin)
                setAdminLoading(false)
            })
    }, [email])
    return [isAdmin, adminLoading]
};

export default useAdminRole;