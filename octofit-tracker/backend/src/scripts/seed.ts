import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    // Users
    const users = await User.insertMany([
      { name: 'Ada Lovelace', email: 'ada@octofit.com' },
      { name: 'Grace Hopper', email: 'grace@octofit.com' },
      { name: 'Alan Turing', email: 'alan@octofit.com' },
      { name: 'Katherine Johnson', email: 'katherine@octofit.com' },
      { name: 'Margaret Hamilton', email: 'margaret@octofit.com' },
      { name: 'Tim Berners-Lee', email: 'tim@octofit.com' },
    ]);

    // Teams
    const teamAlpha = await Team.create({
      name: 'Octo Alpha',
      members: [users[0]._id, users[1]._id, users[2]._id],
    });
    const teamBeta = await Team.create({
      name: 'Octo Beta',
      members: [users[3]._id, users[4]._id, users[5]._id],
    });

    // Assign teams back to users
    await Promise.all([
      User.updateMany({ _id: { $in: teamAlpha.members } }, { team: teamAlpha._id }),
      User.updateMany({ _id: { $in: teamBeta.members } }, { team: teamBeta._id }),
    ]);

    // Activities
    await Activity.insertMany([
      { user: users[0]._id, type: 'Running', durationMinutes: 30, distanceKm: 5 },
      { user: users[1]._id, type: 'Cycling', durationMinutes: 45, distanceKm: 15 },
      { user: users[2]._id, type: 'Swimming', durationMinutes: 40, distanceKm: 2 },
      { user: users[3]._id, type: 'Yoga', durationMinutes: 60 },
      { user: users[4]._id, type: 'Running', durationMinutes: 25, distanceKm: 4 },
      { user: users[5]._id, type: 'Weightlifting', durationMinutes: 50 },
    ]);

    // Leaderboard
    await Leaderboard.insertMany([
      { user: users[0]._id, points: 120, rank: 1 },
      { user: users[1]._id, points: 105, rank: 2 },
      { user: users[2]._id, points: 95, rank: 3 },
      { user: users[3]._id, points: 90, rank: 4 },
      { user: users[4]._id, points: 80, rank: 5 },
      { user: users[5]._id, points: 70, rank: 6 },
    ]);

    // Workouts
    await Workout.insertMany([
      {
        name: 'Full Body Blast',
        description: 'A full body workout covering all major muscle groups',
        difficulty: 'intermediate',
        durationMinutes: 45,
        exercises: ['Squats', 'Push-ups', 'Lunges', 'Plank'],
      },
      {
        name: 'Couch to 5K',
        description: 'Beginner-friendly running program',
        difficulty: 'beginner',
        durationMinutes: 30,
        exercises: ['Walk/Run intervals'],
      },
      {
        name: 'HIIT Cardio Burn',
        description: 'High intensity interval training for cardio endurance',
        difficulty: 'advanced',
        durationMinutes: 25,
        exercises: ['Burpees', 'Jump Squats', 'Mountain Climbers', 'High Knees'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

