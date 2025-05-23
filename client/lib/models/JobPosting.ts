import mongoose from 'mongoose';

interface JobLocationAndType {
  location: string;
  type: 'remote' | 'hybrid' | 'onsite';
  time: 'full-time' | 'part-time';
}

interface InterviewTimeSlot {
  startTime: Date;
  endTime: Date;
  isAvailable: boolean;
}

interface JobSettings {
  applicationDeadline: Date;
  maxCandidates: number;
  interviewTimeSlots: InterviewTimeSlot[];
}

interface CompanyDetails {
  name: string;
  website: string;
  industry: string;
  size: string;
  founded: string;
  description: string;
}

export interface IJobPosting extends mongoose.Document {
  jobTitle: string;
  requiredSkills: string[];
  requiredExperience: string;
  requiredQualifications: string[];
  jobResponsibilities: string[];
  keyRequirements: string[];
  companyInformation: string[];
  companyDetails: CompanyDetails;
  jobLocationAndType: JobLocationAndType;
  settings: JobSettings;
  postedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const jobPostingSchema = new mongoose.Schema<IJobPosting>(
  {
    jobTitle: { type: String, required: true },
    requiredSkills: [String],
    requiredExperience: String,
    requiredQualifications: [String],
    jobResponsibilities: [String],
    keyRequirements: [String],
    companyInformation: [String],
    companyDetails: {
      name: { type: String, required: true },
      website: String,
      industry: String,
      size: String,
      founded: String,
      description: String
    },
    jobLocationAndType: {
      location: { type: String, required: true },
      type: { 
        type: String, 
        enum: ['remote', 'hybrid', 'onsite'],
        required: true 
      },
      time: { 
        type: String, 
        enum: ['full-time', 'part-time'],
        required: true 
      }
    },
    settings: {
      applicationDeadline: { type: Date, required: true },
      maxCandidates: { type: Number, required: true, min: 1 },
      interviewTimeSlots: [{
        startTime: { type: Date, required: true },
        endTime: { type: Date, required: true },
        isAvailable: { type: Boolean, default: true }
      }]
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Clear the model cache to ensure schema updates are applied
// if (mongoose.models.JobPosting) {
//   delete mongoose.models.JobPosting;
// }

export default mongoose.models.JobPosting || mongoose.model<IJobPosting>('JobPosting', jobPostingSchema); 