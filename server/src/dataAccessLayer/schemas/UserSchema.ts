import { Schema, Types, model } from 'mongoose';
import IUserDoc from '../interfaces/UserDoc';

class UserSchema {
    static get schema() {
        const schema = new Schema({
            name: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
            },
            password: {
                type: String,
                required: true,
            },
            updated_at: {
                type: Date,
                required: true,
                default: new Date(),
            },
        });
        return schema;
    }
}
const schema = model<IUserDoc>('Users', UserSchema.schema);
export default schema;
