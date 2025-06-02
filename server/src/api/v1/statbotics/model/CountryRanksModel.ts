import mongoose from 'mongoose';

export interface ICountryRanksModel extends Document {
    teamNumber: number;
    years?: mongoose.Types.DocumentArray<mongoose.InferSchemaType<typeof YearSchema>>;
    expireAt: string;
    createdAt: string;
}

interface Year {
    year: number;
    countryRank?: number | null;
}

const YearSchema = new mongoose.Schema<Year>(
    {
        year: { type: Number, required: true },
        countryRank: { type: Number, nullable: true },
    },
    { _id: false }
);

const CountryRanksSchema = new mongoose.Schema<ICountryRanksModel>(
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

const CountryRanksModel = mongoose.model<ICountryRanksModel>('CountryRanks', CountryRanksSchema, 'team-country-ranks');

export default CountryRanksModel;
