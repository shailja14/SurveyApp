import { Router } from 'express';
import LoginController from '../../controllers/LoginController';

class LoginRoute {
    private _loginController: LoginController

    constructor() {
        this._loginController = new LoginController();
    }

    get routes() : Router {
        const router = Router();
        router.post('/login', this._loginController.login);
        router.post('/w+', this._loginController.login);
        return router;
    }
}

Object.seal(LoginRoute);
export default LoginRoute;
