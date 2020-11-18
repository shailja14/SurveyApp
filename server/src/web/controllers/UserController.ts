import express from 'express';
import UserQueryService from '../../businessLogicLayer/user/UserQueryService';

class SurveyController {
    private userQueryService: UserQueryService;

    public constructor() {
        this.userQueryService = new UserQueryService();
    }

    public create = async (req: express.Request, res: express.Response) => {
        try {
            const user = req.body;
            const result = await this.userQueryService.create(user);
            res.status(200).send({ success: true, messgae: result });
        } catch (err) {
            res.status(200).send({ success: false, message: err });
        }
    }
}
export default SurveyController;
