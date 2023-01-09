import { useEffect, useState } from 'react';

const useToken = (email) => {
    const [token, setToken] = useState('');
    useEffect(() => {
        if (email) {
            fetch(`https://used-products-resale-market-server-five.vercel.app/jwt?email=${email}`)
                .then(response => response.json())
                .then(data => {
                    const jsonToken = data.accessToken;
                    if (jsonToken) {
                        localStorage.setItem('user-token', jsonToken);
                        setToken(jsonToken)
                    }
                })
        }
    }, [email, token])
    return [token]
};

export default useToken;