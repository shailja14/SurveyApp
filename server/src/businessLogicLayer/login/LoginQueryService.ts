import IUserDocType from '../../dataAccessLayer/interfaces/UserDoc';
import IUserType from '../../types/UserType';
import GeneralRepository from '../../dataAccessLayer/repositories/GeneralRepository';
import UserSchema from '../../dataAccessLayer/schemas/UserSchema';
import IRepository from '../../dataAccessLayer/repositories/interfaces/IRepository';

class LoginQueryService {
    static populate: string = ''

    private repo: IRepository<IUserType, IUserDocType >

    constructor() {
        this.repo = new GeneralRepository<IUserType, IUserDocType>(UserSchema,
            LoginQueryService.populate);
    }

    async findOneUser(query : Object) {
        const user = await this.repo.findOne(query);
        return user;
    }
}

export default LoginQueryService;
