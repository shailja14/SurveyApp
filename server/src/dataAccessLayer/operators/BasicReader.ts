import { Types, Document, Model } from 'mongoose';
import IRepoReader from './interfaces/RepoReader';

class BasicReader<T extends Document> implements IRepoReader<T> {
    private _schema: Model<Document>

    private _populate: string

    constructor(schemaModel: Model<Document>, populate: string) {
        this._schema = schemaModel;
        this._populate = populate;
    }

    async retrieve(query: Object) {
        return <Array<T>> await this._schema.find(query).populate(this._populate).exec();
    }

    async findById(_id: Types.ObjectId) {
        return <T> await this._schema.findById(_id).populate(this._populate).exec();
    }

    async findOne(query: Object) {
        return <T> await this._schema.findOne(query).populate(this._populate).exec();
    }

    async aggregate(query: Object[]) {
        return await this._schema.aggregate(query);
    }
}
export default BasicReader;
