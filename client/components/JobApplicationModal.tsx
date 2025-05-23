import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Upload } from 'lucide-react';

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
  jobTitle: string;
}

export default function JobApplicationModal({ isOpen, onClose, jobId, jobTitle }: JobApplicationModalProps) {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    phoneNumber: '',
    additionalRemarks: '',
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'resume' | 'coverLetter') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['.pdf', '.docx'];
    const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
    if (!validTypes.includes(fileExtension)) {
      toast.error('Please upload a PDF or DOCX file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB');
      return;
    }

    if (type === 'resume') {
      setResumeFile(file);
    } else {
      setCoverLetterFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) {
      toast.error('Please upload your resume');
      return;
    }

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('jobId', jobId);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phoneNumber', formData.phoneNumber);
      formDataToSend.append('resume', resumeFile);
      if (coverLetterFile) {
        formDataToSend.append('coverLetter', coverLetterFile);
      }
      if (formData.additionalRemarks) {
        formDataToSend.append('additionalRemarks', formData.additionalRemarks);
      }

      const response = await fetch('/api/jobs/apply', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      toast.success('Application submitted successfully!');
      onClose();
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-mashire-dark border border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            Apply for {jobTitle}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="bg-black bg-opacity-40 border-gray-800 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="bg-black bg-opacity-40 border-gray-800 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-gray-300">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
              className="bg-black bg-opacity-40 border-gray-800 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="resume" className="text-gray-300">Resume (PDF or DOCX)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="resume"
                type="file"
                accept=".pdf,.docx"
                onChange={(e) => handleFileChange(e, 'resume')}
                required
                className="bg-black bg-opacity-40 border-gray-800 text-white"
              />
              {resumeFile && (
                <span className="text-sm text-gray-400">{resumeFile.name}</span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverLetter" className="text-gray-300">Cover Letter (Optional)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="coverLetter"
                type="file"
                accept=".pdf,.docx"
                onChange={(e) => handleFileChange(e, 'coverLetter')}
                className="bg-black bg-opacity-40 border-gray-800 text-white"
              />
              {coverLetterFile && (
                <span className="text-sm text-gray-400">{coverLetterFile.name}</span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalRemarks" className="text-gray-300">Additional Remarks (Optional)</Label>
            <Textarea
              id="additionalRemarks"
              name="additionalRemarks"
              value={formData.additionalRemarks}
              onChange={handleInputChange}
              className="bg-black bg-opacity-40 border-gray-800 text-white min-h-[100px]"
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-800 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-mashire-green text-black hover:bg-mashire-bright-green"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Submit Application
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 