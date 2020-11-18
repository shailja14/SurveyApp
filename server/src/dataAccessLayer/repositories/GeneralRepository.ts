import { Types, Document, Model } from 'mongoose';
import IRepoReader from '../operators/interfaces/RepoReader';
import IRepoCreater from '../operators/interfaces/RepoCreater';
import IRepoUpdater from '../operators/interfaces/RepoUpdater';
import BasicRepoUpdater from '../operators/BasicUpdater';
import BasicRepoReader from '../operators/BasicReader';
import BasicRepoCreater from '../operators/BasicCreater';
import IRepository from './interfaces/IRepository';

class GeneralRepository<P, T extends Document> implements IRepository<P, T> {
    private _reader: IRepoReader<T>

    private _creater: IRepoCreater<P, T>

    private _updater: IRepoUpdater<P>

    constructor(schema: Model<Document>, populate: string) {
        this._creater = new BasicRepoCreater<P, T>(schema);
        this._updater = new BasicRepoUpdater<T>(schema);
        this._reader = new BasicRepoReader<T>(schema, populate);
    }

    async findById(_id: Types.ObjectId) {
        return await this._reader.findById(_id);
    }

    async findOne(query: Object) {
        return await this._reader.findOne(query);
    }

    async retrieve(query: Object) {
        return await this._reader.retrieve(query);
    }

    async create(item: P) {
        return await this._creater.create(item);
    }

    async update(query: Object, params: Object) {
        await this._updater.update(query, params);
    }

    async aggregate(query: Object[]) {
        return this._reader.aggregate(query);
    }
}
export default GeneralRepository;
