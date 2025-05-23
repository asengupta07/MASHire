import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import JobApplication from '@/lib/models/JobApplication';

export async function GET(
  req: Request,
  { params }: { params: { jobId: string } }
) {
  try {
    await connectDB();
    const { jobId } = params;
    if (!jobId) {
      return NextResponse.json({ error: 'Missing jobId' }, { status: 400 });
    }
    const applicants = await JobApplication.find({ jobId });
    return NextResponse.json(applicants);
  } catch (error) {
    console.error('Error fetching applicants:', error);
    return NextResponse.json({ error: 'Failed to fetch applicants' }, { status: 500 });
  }
} 