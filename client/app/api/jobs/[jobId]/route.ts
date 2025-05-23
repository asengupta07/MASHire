import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import JobPosting from '@/lib/models/JobPosting';

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
    const job = await JobPosting.findById(jobId);
    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }
    return NextResponse.json(job);
  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json({ error: 'Failed to fetch job' }, { status: 500 });
  }
} 