import IUserDoc from '../../../dataAccessLayer/interfaces/UserDoc';
import IUserType from '../../../types/UserType';

 interface UserQueryService {
     create : (user : IUserType) => Promise<IUserDoc>
 }

export default UserQueryService;
