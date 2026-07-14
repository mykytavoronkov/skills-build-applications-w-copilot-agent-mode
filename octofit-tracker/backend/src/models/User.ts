import { Schema, model, Types } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  team?: Types.ObjectId;
  createdAt?: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  createdAt: { type: Date, default: Date.now },
});

export default model<IUser>('User', userSchema);
