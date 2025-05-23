import mongoose from 'mongoose';

export interface IJobApplication extends mongoose.Document {
  jobId: mongoose.Types.ObjectId;
  applicantId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phoneNumber: string;
  resume: {
    type: 'resume';
    url: string;
    text: string;
  };
  coverLetter?: {
    type: 'cover_letter';
    url: string;
    text: string;
  };
  additionalRemarks?: string;
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const jobApplicationSchema = new mongoose.Schema<IJobApplication>(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobPosting',
      required: true,
    },
    applicantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    resume: {
      type: {
        type: String,
        enum: ['resume'],
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
    coverLetter: {
      type: {
        type: String,
        enum: ['cover_letter'],
      },
      url: String,
      text: String,
    },
    additionalRemarks: String,
    status: {
      type: String,
      enum: ['pending', 'reviewing', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.JobApplication || mongoose.model<IJobApplication>('JobApplication', jobApplicationSchema); 