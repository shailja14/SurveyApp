import { Types, Document } from 'mongoose';

interface Read<T extends Document> {
    retrieve: (query: Object) => Promise<Array<T>>
    findById: (id: Types.ObjectId) => Promise<T>
    findOne: (query: Object) => Promise<T>
    aggregate: (query: Object[]) => Promise<Array<any>>
}
export default Read;
