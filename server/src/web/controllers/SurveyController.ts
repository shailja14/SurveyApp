import express from 'express';
import SurveyQueryService from '../../businessLogicLayer/survey/SurveyQueryService';

class SurveyController {
    private surveyQueryService: SurveyQueryService;

    public constructor() {
        this.surveyQueryService = new SurveyQueryService();
    }

    public create = async (req: express.Request, res: express.Response) => {
        try {
            const survey = req.body;
            survey['created_by'] = res.locals.user;
            const result = await this.surveyQueryService.create(survey);
            if (result instanceof Error) {
                res.status(200).send({ success: false, message: result.message });
            } else {
                res.status(200).send({ success: true, message: result });
            }
        } catch (err) {
            res.status(200).send({ success: false, message: err });
        }
    }

    public listSurveys = async (req: express.Request, res: express.Response) => {
        try {
            const result = await this.surveyQueryService.retrieve({});
            res.status(200).send({ success: true, message: result });
        } catch (err) {
            res.status(400).send({ success: true, message: err });
        }
    }
}
export default SurveyController;
