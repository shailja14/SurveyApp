import express from 'express';
import { validationResult } from 'express-validator';
import LoginService from '../../businessLogicLayer/login/LoginService';

class LoginController {
    private loginService: LoginService;

    constructor() {
        this.loginService = new LoginService();
    }

    login = async (req: express.Request, res: express.Response) => {
        try {
            const results = validationResult(req);
            if (!results.isEmpty()) {
                res.status(200).json({ success: false, message: 'Form Verification Failed' });
            } else {
                const result = await this.loginService.authenticate(req.body);
                res.status(200).json(result);
            }
        } catch (err) {
            res.status(401).json({ success: false, message: err.toString() });
        }
    }
}

export default LoginController;
