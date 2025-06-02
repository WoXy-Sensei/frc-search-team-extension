import mongoose, { Document } from 'mongoose';

interface TeamYearStatbotics {
  team: number;
  year: number;
  name: string;
  country: string;
  state: string | null;
  district: string | null;
  rookie_year: number;
  epa: Record<string, any>;
  record: Record<string, any>; 
  district_points: number | null;
  district_rank: number | null;
  competing: Record<string, any>; 
}

export interface ITeamYearsModel extends Document {
  teamNumber: number;
  years: mongoose.Types.DocumentArray<TeamYearStatbotics>;
  expireAt: string;
  createdAt: string;
}

const TeamYearSchema = new mongoose.Schema<TeamYearStatbotics>(
  {
    team: { type: Number, required: true },
    year: { type: Number, required: true },
    name: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, default: null },
    district: { type: String, default: null },
    rookie_year: { type: Number, required: true },
    epa: { type: Object, required: true },
    record: { type: Object, required: true },
    district_points: { type: Number, default: null },
    district_rank: { type: Number, default: null },
  },
  { _id: false }
);

const TeamYearsSchema = new mongoose.Schema<ITeamYearsModel>(
  {
    teamNumber: { type: Number, required: true, unique: true, index: true },
    years: [TeamYearSchema],
    expireAt: { type: String, required: true },
    createdAt: { type: String, required: true },
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

const TeamYearsModel = mongoose.model<ITeamYearsModel>('TeamYears', TeamYearsSchema, 'team-years');

export default TeamYearsModel;
