import { Router } from 'express';
import UserController from '../../controllers/UserController';

class SurveyRoute {
    private _userController: UserController

    constructor() {
        this._userController = new UserController();
    }

    get routes() : Router {
        const router = Router();
        router.post('/users/', this._userController.create);
        return router;
    }
}

Object.seal(SurveyRoute);
export default SurveyRoute;
