import { JobPostingForm } from '@/components/JobPostingForm';
import Navbar from '@/components/Navbar';

export default function PostJobPage() {
  return (
    <div className="min-h-screen bg-mashire-black">
      <Navbar />
      
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0"></div>
      <div className="absolute top-20 right-10 w-96 h-96 bg-mashire-green rounded-full opacity-10 blur-3xl z-0"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-mashire-teal rounded-full opacity-10 blur-3xl z-0"></div>

      <div className="container mx-auto px-4 pt-28 pb-20 relative z-10">
        <div className="text-center mb-12">
          {/* <div className="inline-flex items-center px-4 py-2 rounded-full bg-mashire-dark border border-mashire-green border-opacity-30 mb-6">
            <span className="inline-block w-2 h-2 rounded-full bg-mashire-green animate-pulse-green mr-2"></span>
            <span className="text-sm text-gray-300">Create your job posting</span>
          </div> */}
          
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span>Post a </span>
            <span className="text-gradient">New Job</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Fill out the form below to create your job posting. Our AI will help you craft the perfect job description.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <JobPostingForm />
        </div>
      </div>
    </div>
  );
} 