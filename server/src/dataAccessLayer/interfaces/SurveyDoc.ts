import { Document } from 'mongoose';

interface SurveyDoc extends Document {
    name: string,
    trigger: object,
    email: string,
    url: string,
    expiry_date: Date,
    created_at: Date,
    created_by: string,
    accessibility: string,
    active: boolean
}
export default SurveyDoc;
