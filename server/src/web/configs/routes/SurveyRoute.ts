import { Router } from 'express';
import SurveyController from '../../controllers/SurveyController';

class SurveyRoute {
    private _surveyController: SurveyController

    constructor() {
        this._surveyController = new SurveyController();
    }

    get routes() : Router {
        const router = Router();
        router.get('/list', this._surveyController.listSurveys);
        router.post('/', this._surveyController.create);
        return router;
    }
}

Object.seal(SurveyRoute);
export default SurveyRoute;
