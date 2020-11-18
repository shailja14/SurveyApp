import { Document } from 'mongoose';

interface UserDoc extends Document {
    name: string,
    email: string,
    password: string,
    updated_at: Date,
}
export default UserDoc;
