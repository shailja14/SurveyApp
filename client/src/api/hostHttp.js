import API from 'axios';

const baseURL = process.env.API_URL || 'http://localhost:5000/';

const getHeaders = (methodType, token) => {
    const headerData = {
        method: methodType,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    if (token) {
        headerData.headers.Authorization = `Bearer ${token}`;
    }
    return headerData;
};

const postAPICall = async (url, payload, callBack, token) => {
    const headers = getHeaders('POST', token);
    API.post(`${baseURL}${url}`, payload, headers).then((res) => {
        callBack('success', res);
    })
        .catch((err) => callBack('err', err));
};

const getAPICall = async (url, queryParam, callBack, token) => {
    const headers = getHeaders('GET', token);
    API.get(`${baseURL}${url}`, headers).then((res) => {
        callBack('success', res);
    })
        .catch((err) => callBack('err', err));
};

export {
    getHeaders,
    postAPICall,
    getAPICall,
};
