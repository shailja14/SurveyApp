import bcrypt from 'bcryptjs';
import IRepository from '../../dataAccessLayer/repositories/interfaces/IRepository';
import IUserType from '../../types/UserType';
import UserDoc from '../../dataAccessLayer/interfaces/UserDoc';
import GeneralRepository from '../../dataAccessLayer/repositories/GeneralRepository';
import UserSchema from '../../dataAccessLayer/schemas/UserSchema';
import IUserQueryService from './interfaces/UserQueryService';

class UserQueryService implements IUserQueryService {
    static populate = 'organisation updated_by'

    private repo : IRepository<IUserType, UserDoc>

    constructor() {
        this.repo = new GeneralRepository<IUserType, UserDoc>(UserSchema,
            UserQueryService.populate);
    }

    async create(user : IUserType) {
        const rounds = 10;
        return await this.repo.create({
            ...user,
            password: bcrypt.hashSync(user.password, rounds),
        });
    }
}

export default UserQueryService;
