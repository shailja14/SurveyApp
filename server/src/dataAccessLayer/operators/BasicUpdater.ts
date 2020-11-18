import { Document, Model } from 'mongoose';
import IRepoUpdater from './interfaces/RepoUpdater';

class BasicUpdater<T extends Document> implements IRepoUpdater<T> {
    private _schema: Model<Document>

    constructor(schemaModel: Model<Document>) {
        this._schema = schemaModel;
    }

    async update(query: Object, params: Object) {
        await this._schema.updateOne(query, { $set: params });
    }
}
export default BasicUpdater;
