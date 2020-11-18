import jwt from 'jsonwebtoken';
import IUserType from '../../../types/UserType';

interface TokenPayload {
    user: IUserType
}

class Token {
    private token = {
        secret: process.env.LOGIN_TOKEN || 'missingtoken',
        options: {
            expiresIn: '24h',
            mutatePayload: true,
        },
    }

    public getToken(user: IUserType) {
        return jwt.sign({ user }, this.token.secret, this.token.options);
    }

    public verifyToken(token : string) {
        return <TokenPayload>jwt.verify(token, this.token.secret);
    }
}
Object.seal(Token);
export default Token;
