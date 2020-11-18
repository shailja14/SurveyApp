import { Document, Model } from 'mongoose';
import IRepoCreater from './interfaces/RepoCreater';

class BasicCreater<T, P extends Document> implements IRepoCreater<T, P> {
    private _schema: Model<Document>

    constructor(schemaModel: Model<Document>) {
        this._schema = schemaModel;
    }

    async create(item: T) {
        return <P> await this._schema.create(item);
    }
}
export default BasicCreater;
