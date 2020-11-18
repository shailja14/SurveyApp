import {
    postAPICall,
} from './hostHttp';

const registerUserAPI = async (payload, callBack, token) => {
    const url = 'users/';
    await postAPICall(url, payload, callBack, token);
};

export default registerUserAPI;
