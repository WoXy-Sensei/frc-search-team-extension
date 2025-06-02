import mongoose from 'mongoose';

export interface IWorldRanksModel extends Document {
    teamNumber: number;
    years?: mongoose.Types.DocumentArray<mongoose.InferSchemaType<typeof YearSchema>>;
    expireAt: string;
    createdAt: string;
}

interface Year {
    year: number;
    worldRank?: number | null;
}

const YearSchema = new mongoose.Schema<Year>(
    {
        year: { type: Number, required: true },
        worldRank: { type: Number, nullable: true },
    },
    { _id: false }
);

const WorldRanksSchema = new mongoose.Schema<IWorldRanksModel>(
    {
        teamNumber: { type: Number, required: true, unique: true, index: true },
        years: [YearSchema],
        expireAt: {
            type: String,
            required: true,
        },
        createdAt: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
            transform: function (doc, ret) {
                delete ret._id;
                delete ret.__v;
            },
        },
        toObject: {
            transform: function (doc, ret) {
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

const WorldRanksModel = mongoose.model<IWorldRanksModel>('WorldRanks', WorldRanksSchema, 'team-world-ranks');

export default WorldRanksModel;
