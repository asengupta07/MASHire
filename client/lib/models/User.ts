import mongoose from 'mongoose';

export type UserRole = 'recruiter' | 'job_hunter';

export interface IUser extends mongoose.Document {
  email: string;
  name: string;
  image?: string;
  role?: UserRole;
  googleId: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: String,
    role: {
      type: String,
      enum: ['recruiter', 'job_hunter'],
    },
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model<IUser>('User', userSchema); 