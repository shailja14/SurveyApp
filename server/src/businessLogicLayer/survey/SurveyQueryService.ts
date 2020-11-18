import IRepository from '../../dataAccessLayer/repositories/interfaces/IRepository';
import ISurveyType from '../../types/SurveyType';
import SurveyDoc from '../../dataAccessLayer/interfaces/SurveyDoc';
import GeneralRepository from '../../dataAccessLayer/repositories/GeneralRepository';
import SurveySchema from '../../dataAccessLayer/schemas/SurveySchema';
import ISurveyQueryService from './interfaces/SurveyQueryService';

class SurveyQueryService implements ISurveyQueryService {
    static populate = 'created_by'

    private repo : IRepository<ISurveyType, SurveyDoc>

    constructor() {
        this.repo = new GeneralRepository<ISurveyType, SurveyDoc>(SurveySchema,
            SurveyQueryService.populate);
    }

    async findOne(query : Object) {
        return Object.prototype.hasOwnProperty.call(query, '_id')
            ? await this.repo.findById(query['_id'])
            : await this.repo.findOne(query);
    }

    async retrieve(query : Object) {
        return await this.repo.retrieve(query);
    }

    async create(newSurvey : ISurveyType) {
        const survey = await this.findOne({ name: newSurvey.name });
        if (survey) {
            return new Error(`Survey with ${newSurvey.name} already exists.`);
        }
        return await this.repo.create(newSurvey);
    }
}

export default SurveyQueryService;
