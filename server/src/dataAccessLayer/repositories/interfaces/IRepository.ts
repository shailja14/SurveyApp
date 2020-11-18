import { Types, Document } from 'mongoose';

interface IRepository<P, T extends Document> {
    create: (item: P) => Promise<T>
    findById: (_id: Types.ObjectId) => Promise<T>
    findOne: (query: Object) => Promise<T>
    retrieve: (query: Object) => Promise<Array<T>>
    delete?: (query: Object) => Promise<void>
    update?: (query: Object, params: Object) => Promise<void>
}
export default IRepository;
