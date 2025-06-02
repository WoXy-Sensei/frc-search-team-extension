import mongoose from 'mongoose';

export interface IOverviewModel extends mongoose.Document {
    deepseekModel: string;
    teamNumber: number;
    prompt: string;
    generatedOverview: string;
    expireAt: string;
    createdAt: string;
}

const OverviewSchema = new mongoose.Schema<IOverviewModel>({
    deepseekModel: {
        default: 'deepseek-chat',
        type: String,
        required: true,
        enum: ['deepseek-chat'],
    },
    teamNumber: {
        type: Number,
        unique: true,
        required: true,
    },
    prompt: {
        type: String,
        required: true,
    },
    generatedOverview: {
        type: String,
        required: true,
    },
    expireAt: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        required: true,
    },
});

const OverviewModel = mongoose.model<IOverviewModel>('Overview', OverviewSchema, 'team-overviews');

export default OverviewModel;
