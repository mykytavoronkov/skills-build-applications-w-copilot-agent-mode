import { Schema, model, Types } from 'mongoose';

export interface ILeaderboard {
  user: Types.ObjectId;
  points: number;
  rank?: number;
  updatedAt?: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  points: { type: Number, required: true, default: 0 },
  rank: { type: Number },
  updatedAt: { type: Date, default: Date.now },
});

export default model<ILeaderboard>('Leaderboard', leaderboardSchema);
