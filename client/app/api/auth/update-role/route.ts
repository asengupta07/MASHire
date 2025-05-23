import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
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

    const { role } = await req.json();

    if (!role || !['recruiter', 'job_hunter'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      );
    }

    await connectDB();

    let user = await User.findOneAndUpdate(
      { email: session.user.email },
      { role },
      { new: true }
    );

    if (!user) {
      // Create new user if not found
      user = await User.create({
        email: session.user.email,
        name: session.user.name,
        image: session.user.image,
        role: role
      });
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('Error updating role:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}