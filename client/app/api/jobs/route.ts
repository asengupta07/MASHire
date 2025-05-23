import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import JobPosting from '@/lib/models/JobPosting';

export async function GET() {
  try {
    await connectDB();

    const jobs = await JobPosting.find({})
      .select('jobTitle requiredSkills requiredExperience requiredQualifications jobResponsibilities keyRequirements companyInformation companyDetails jobLocationAndType settings createdAt')
      .sort({ createdAt: -1 });

      console.log(jobs);

    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
} 