import bcrypt from 'bcryptjs';
import TokenConfig from '../../web/configs/constants/Token';
import LoginQueryService from './LoginQueryService';

class LoginService {
    private tokenConfig: TokenConfig

    private loginService: LoginQueryService

    constructor() {
        this.tokenConfig = new TokenConfig();
        this.loginService = new LoginQueryService();
    }

    public async authenticate(query) {
        const { emailOrId, password } = query;
        const user = await this.findOneUser({
            $or: [
                { email: emailOrId }, { userId: emailOrId },
            ],
        });
        if (!user || !emailOrId || !password) {
            throw Error(`Invalid Username or Password for ${emailOrId}`);
        }
        if (await bcrypt.compare(password, user.password)) {
            return ({
                message: 'Logged In Successfully',
                success: true,
                data: {
                    token: this.tokenConfig.getToken(user),
                    user,
                },
            });
        }
        throw Error(`Invalid Username or Password for ${emailOrId}`);
    }

    private async findOneUser(query: object) {
        return await this.loginService.findOneUser(query);
    }
}
export default LoginService;
