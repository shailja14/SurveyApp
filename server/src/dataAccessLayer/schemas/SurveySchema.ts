import { Schema, Types, model } from 'mongoose';
import IUserDoc from '../interfaces/SurveyDoc';

class SurveySchema {
    static get schema() {
        const schema = new Schema({
            name: {
                type: String,
                required: true,
            },
            trigger: {
                type: Object,
            },
            email: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
            created_by: {
                type: Types.ObjectId,
                ref: 'Users',
                required: true,
            },
            accessibility: {
                type: String,
                required: true,
            },
            expiry_date: {
                type: Date,
                required: true,
            },
            created_at: {
                type: Date,
                required: true,
                default: new Date(),
            },
            active: {
                type: Boolean,
                required: true,
                default: true,
            },
        });
        return schema;
    }
}
const schema = model<IUserDoc>('Surveys', SurveySchema.schema);
export default schema;
