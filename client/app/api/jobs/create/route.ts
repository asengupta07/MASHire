import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import JobPosting from '@/lib/models/JobPosting';
import User from '@/lib/models/User';
import { authOptions } from '../../../../lib/auth';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    // Get the user who is posting the job
    const user = await User.findOne({ email: session.user.email });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if user is a recruiter
    if (user.role !== 'recruiter') {
      return NextResponse.json(
        { error: 'Only recruiters can post jobs' },
        { status: 403 }
      );
    }

    const jobData = await req.json();
    
    console.log('Received job data:', JSON.stringify(jobData, null, 2));

    // Validate required fields
    if (!jobData.jobTitle || jobData.jobTitle.trim() === '') {
      return NextResponse.json(
        { error: 'Job title is required' },
        { status: 400 }
      );
    }

    if (!jobData.companyDetails?.name || jobData.companyDetails.name.trim() === '') {
      return NextResponse.json(
        { error: 'Company name is required' },
        { status: 400 }
      );
    }

    // Validate settings
    if (!jobData.settings?.applicationDeadline || !jobData.settings?.maxCandidates) {
      return NextResponse.json(
        { error: 'Application deadline and maximum candidates are required' },
        { status: 400 }
      );
    }

    if (!jobData.settings?.interviewTimeSlots || jobData.settings.interviewTimeSlots.length < jobData.settings.maxCandidates) {
      return NextResponse.json(
        { error: 'Number of interview time slots must be equal to or greater than maximum candidates' },
        { status: 400 }
      );
    }

    // Convert string dates to Date objects
    const settings = {
      ...jobData.settings,
      applicationDeadline: new Date(jobData.settings.applicationDeadline),
      interviewTimeSlots: jobData.settings.interviewTimeSlots.map((slot: any) => ({
        startTime: new Date(slot.startTime),
        endTime: new Date(slot.endTime),
        isAvailable: true
      }))
    };

    // Create the job posting
    const jobPosting = await JobPosting.create({
      ...jobData,
      settings,
      jobLocationAndType: {
        ...jobData.jobLocationAndType,
        type: jobData.jobLocationAndType.type.toLowerCase(),
        time: jobData.jobLocationAndType.time.toLowerCase()
      },
      postedBy: user._id
    });

    console.log('Created job posting:', JSON.stringify(jobPosting, null, 2));

    return NextResponse.json({ success: true, jobPosting });
  } catch (error) {
    console.error('Error creating job posting:', error);
    return NextResponse.json(
      { error: 'Failed to create job posting' },
      { status: 500 }
    );
  }
} 