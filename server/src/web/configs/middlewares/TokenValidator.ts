import express from 'express';
import TokenConfig from '../constants/Token';

class TokenValidator {
    private tokenConfig: TokenConfig

    constructor() {
        this.tokenConfig = new TokenConfig();
    }

    public validate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const token = (req.headers.authorization) ? req.headers.authorization.split('Bearer ')[1] : '';
        if (token === '') {
            res.status(401).send({ error: 'Missing Token' });
            return;
        }
        try {
            const tokenPayload = this.tokenConfig.verifyToken(token);
            if (tokenPayload) {
                res.locals.user = tokenPayload.user;
                next();
            }
        } catch (error) {
            res.status(400).send({ error: 'Invalid Token' });
        }
    }
}
Object.seal(TokenValidator);
export default TokenValidator;
