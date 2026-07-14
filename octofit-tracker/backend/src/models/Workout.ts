import { Schema, model } from 'mongoose';

export interface IWorkout {
  name: string;
  description?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  exercises: string[];
}

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  description: { type: String },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  durationMinutes: { type: Number, required: true },
  exercises: [{ type: String }],
});

export default model<IWorkout>('Workout', workoutSchema);
