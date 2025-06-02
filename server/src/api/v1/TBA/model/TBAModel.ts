import mongoose from 'mongoose';

export interface ITBAModel extends mongoose.Document {
    name: string;
}

const TBASchema = new mongoose.Schema<ITBAModel>({
    name: { type: String, required: true },
});

const TBAModel = mongoose.model<ITBAModel>('TBA', TBASchema);

export default TBAModel;
