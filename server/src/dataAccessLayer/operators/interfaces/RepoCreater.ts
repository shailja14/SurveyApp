import { Document } from 'mongoose';

interface Create<T, P extends Document> {
    create: (item: T) => Promise<P>
}
export default Create;
