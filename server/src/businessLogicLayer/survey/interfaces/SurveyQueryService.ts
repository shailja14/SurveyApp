import ISurveyDoc from '../../../dataAccessLayer/interfaces/SurveyDoc';
import ISurveyType from '../../../types/SurveyType';

 interface SurveyQueryService {
     retrieve : (query : Object) => Promise<Array<ISurveyDoc>>
     findOne : (query : Object, readOnly : boolean) => Promise<ISurveyDoc>
     create : (survey : ISurveyType) => Promise<ISurveyDoc | Error>
 }

export default SurveyQueryService;
