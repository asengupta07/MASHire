import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import JobApplication from '@/lib/models/JobApplication';
import User from '@/lib/models/User';
import { authOptions } from '../../../../lib/auth';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import mammoth from 'mammoth';
import { PDFExtract, PDFExtractOptions } from 'pdf.js-extract';
import { extractPdfTextFromBuffer } from '@/functions/parser/parsePdf';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function extractTextFromDOCX(buffer: Buffer): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } catch (error) {
    console.error('Error extracting text from DOCX:', error);
    return '';
  }
}

async function uploadToCloudinary(file: Buffer, fileName: string): Promise<{ url: string; text: string }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        folder: 'job_applications',
      },
      async (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        let text = '';
        if (fileName.toLowerCase().endsWith('.pdf')) {
          text = await extractPdfTextFromBuffer(file);
        } else if (fileName.toLowerCase().endsWith('.docx')) {
          text = await extractTextFromDOCX(file);
        }

        resolve({
          url: result!.secure_url,
          text,
        });
      }
    );

    const readable = new Readable();
    readable._read = () => {};
    readable.push(file);
    readable.push(null);
    readable.pipe(uploadStream);
  });
}

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

    const user = await User.findOne({ email: session.user.email });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const formData = await req.formData();
    const jobId = formData.get('jobId') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phoneNumber = formData.get('phoneNumber') as string;
    const additionalRemarks = formData.get('additionalRemarks') as string;
    const resumeFile = formData.get('resume') as File;
    const coverLetterFile = formData.get('coverLetter') as File;

    if (!jobId || !name || !email || !phoneNumber || !resumeFile) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const resumeBuffer = Buffer.from(await resumeFile.arrayBuffer());
    const resumeResult = await uploadToCloudinary(resumeBuffer, resumeFile.name);

    let coverLetterResult = null;
    if (coverLetterFile) {
      const coverLetterBuffer = Buffer.from(await coverLetterFile.arrayBuffer());
      coverLetterResult = await uploadToCloudinary(coverLetterBuffer, coverLetterFile.name);
    }

    const application = await JobApplication.create({
      jobId,
      applicantId: user._id,
      name,
      email,
      phoneNumber,
      resume: {
        type: 'resume',
        url: resumeResult.url,
        text: resumeResult.text,
      },
      ...(coverLetterResult && {
        coverLetter: {
          type: 'cover_letter',
          url: coverLetterResult.url,
          text: coverLetterResult.text,
        },
      }),
      additionalRemarks,
    });

    return NextResponse.json({ success: true, application });
  } catch (error) {
    console.error('Error creating job application:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 