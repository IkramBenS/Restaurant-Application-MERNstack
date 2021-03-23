//API signup method

import axios from 'axios';

export const signup = async (data) => {
    const config = {
        headers: {
            'Content-Type' : 'application/json',
        },
    };

    const response = await axios.post('/api/auth/signup', data, config); //first request to our backend server

    return response;
} ;