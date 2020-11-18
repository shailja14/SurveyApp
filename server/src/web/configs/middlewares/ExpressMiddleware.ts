import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import LoginRoute from '../routes/LoginRoute';
import UserRoute from '../routes/UserRoute';
import BaseRoutes from '../routes/base/BaseRoute';
import TokenValidator from './TokenValidator';

class MiddlewaresBase {
    static get configuration() {
        const app = express();
        app.use(bodyParser.json());
        app.use(cors());
        app.use(new LoginRoute().routes);
        app.use(new UserRoute().routes);
        app.use(new TokenValidator().validate);
        app.use(new BaseRoutes().routes);
        return app;
    }
}
Object.seal(MiddlewaresBase);
export default MiddlewaresBase;
