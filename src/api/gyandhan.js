import React from 'react';
import axios from 'axios';

const gyandhan = axios.create({
    baseURL:"http://localhost:5000",
    headers:{
        "content-type":"application/json"
    }
})

export default gyandhan;