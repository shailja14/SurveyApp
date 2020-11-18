import express from 'express';
import SurveyRoute from '../SurveyRoute';

class BaseRoutes {
    private survey: SurveyRoute;

    constructor() {
        this.survey = new SurveyRoute();
    }

    get routes() {
        const app = express();
        app.use('/surveys', this.survey.routes.bind(this.survey));

        return app;
    }
}
export default BaseRoutes;
