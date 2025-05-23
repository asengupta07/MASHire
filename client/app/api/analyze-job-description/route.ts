import { NextResponse } from 'next/server';
import { summariseJobDescription } from '@/functions/utils/summariseJobDesc';

export async function POST(request: Request) {
  try {
    const { jobDescription } = await request.json();

    if (!jobDescription) {
      return NextResponse.json(
        { error: 'Job description is required' },
        { status: 400 }
      );
    }

    const analysis = await summariseJobDescription(jobDescription);
    console.log(analysis);
    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Error analyzing job description:', error);
    return NextResponse.json(
      { error: 'Failed to analyze job description' },
      { status: 500 }
    );
  }
} 