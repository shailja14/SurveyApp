import {
    postAPICall,
} from './hostHttp';

const LoginAPI = async (payload, callBack) => {
    const url = 'login';
    await postAPICall(url, payload, callBack, '');
};

export default LoginAPI;
