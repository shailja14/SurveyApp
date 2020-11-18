import {
    postAPICall,
    getAPICall,
} from './hostHttp';

const surveyCreateAPI = async (payload, callBack, token) => {
    const url = 'surveys/';
    await postAPICall(url, payload, callBack, token);
};

const surveyListAPI = async (queryParam, callBack, token) => {
    const url = 'surveys/list';
    await getAPICall(url, queryParam, callBack, token);
};

export {
    surveyCreateAPI,
    surveyListAPI,
};
