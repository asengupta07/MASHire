'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { DynamicInputList } from "@/components/ui/dynamic-input-list";

interface JobLocationAndType {
  location: string;
  type: 'remote' | 'hybrid' | 'onsite';
  time: 'full-time' | 'part-time';
}

interface InterviewTimeSlot {
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

interface JobSettings {
  applicationDeadline: string;
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

interface JobPostingData {
  jobTitle: string;
  requiredSkills: string[];
  requiredExperience: string;
  requiredQualifications: string[];
  jobResponsibilities: string[];
  keyRequirements: string[];
  companyInformation: string[]; // For vision, mission, etc.
  companyDetails: CompanyDetails;
  jobLocationAndType: JobLocationAndType;
  settings: JobSettings;
}

const initialFormData: JobPostingData = {
  jobTitle: '',
  requiredSkills: [],
  requiredExperience: '',
  requiredQualifications: [],
  jobResponsibilities: [],
  keyRequirements: [],
  companyInformation: [],
  companyDetails: {
    name: '',
    website: '',
    industry: '',
    size: '',
    founded: '',
    description: ''
  },
  jobLocationAndType: {
    location: '',
    type: 'onsite',
    time: 'full-time'
  },
  settings: {
    applicationDeadline: '',
    maxCandidates: 0,
    interviewTimeSlots: []
  }
};

export function JobPostingForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [rawJobDescription, setRawJobDescription] = useState('');
  const [formData, setFormData] = useState<JobPostingData>(initialFormData);

  const handleInputChange = (field: keyof JobPostingData, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCompanyDetailsChange = (field: keyof CompanyDetails, value: string) => {
    setFormData(prev => ({
      ...prev,
      companyDetails: {
        ...prev.companyDetails,
        [field]: value
      }
    }));
  };

  const handleLocationTypeChange = (field: keyof JobLocationAndType, value: string) => {
    setFormData(prev => ({
      ...prev,
      jobLocationAndType: {
        ...prev.jobLocationAndType,
        [field]: value.toLowerCase()
      }
    }));
  };

  const handleSettingsChange = (field: keyof JobSettings, value: string | number | InterviewTimeSlot[]) => {
    setFormData(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [field]: value
      }
    }));
  };

  const handleTimeSlotAdd = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    
    const newTimeSlots: InterviewTimeSlot[] = [];
    for (let i = 0; i < hours; i++) {
      const slotStart = new Date(start.getTime() + i * 60 * 60 * 1000);
      const slotEnd = new Date(start.getTime() + (i + 1) * 60 * 60 * 1000);
      newTimeSlots.push({
        startTime: slotStart.toISOString(),
        endTime: slotEnd.toISOString(),
        isAvailable: true
      });
    }

    setFormData(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        interviewTimeSlots: [...prev.settings.interviewTimeSlots, ...newTimeSlots]
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/jobs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create job posting');
      }

      const data = await response.json();
      toast.success('Job posting created successfully!');
      
      // Reset form after successful submission
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error creating job posting:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create job posting');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAIAnalysis = async () => {
    if (!rawJobDescription.trim()) {
      toast.error('Please enter a job description');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/analyze-job-description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobDescription: rawJobDescription }),
      });

      if (!response.ok) throw new Error('Failed to analyze job description');

      const data = await response.json();
      
      // Only update the fields that come from AI analysis
      setFormData(prev => ({
        ...prev,
        jobTitle: data.jobTitle || prev.jobTitle,
        companyDetails: {
          ...prev.companyDetails,
          name: data.name || prev.companyDetails.name,
          website: data.website || prev.companyDetails.website,
          industry: data.industry || prev.companyDetails.industry,
          size: data.size || prev.companyDetails.size,
          founded: data.founded || prev.companyDetails.founded,
          description: data.description || prev.companyDetails.description
        },
        requiredSkills: data.requiredSkills || [],
        requiredExperience: data.requiredExperience || '',
        requiredQualifications: data.requiredQualifications || [],
        jobResponsibilities: data.jobResponsibilities || [],
        keyRequirements: data.keyRequirements || [],
        companyInformation: data.companyInformation || [],
        jobLocationAndType: {
          ...prev.jobLocationAndType,
          location: data.jobLocationAndType?.location || prev.jobLocationAndType.location,
          type: data.jobLocationAndType?.type || prev.jobLocationAndType.type,
          time: data.jobLocationAndType?.time || prev.jobLocationAndType.time
        },
        settings: {
          ...prev.settings,
          applicationDeadline: data.applicationDeadline || prev.settings.applicationDeadline,
          maxCandidates: data.maxCandidates || prev.settings.maxCandidates,
          interviewTimeSlots: data.interviewTimeSlots || prev.settings.interviewTimeSlots
        }
      }));
      
      toast.success('Job description analyzed successfully!');
    } catch (error) {
      toast.error('Failed to analyze job description');
    } finally {
      setIsLoading(false);
      setRawJobDescription('');
    }
  };

  return (
    <Card className="p-6 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-6">
          {/* AI Analysis Section */}
          <div className="border-b pb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">AI-Powered Job Description Analysis</h3>
              <Button
                type="button"
                onClick={handleAIAnalysis}
                disabled={isLoading}
                variant="outline"
              >
                {isLoading ? 'Analyzing...' : 'Analyze with AI'}
              </Button>
            </div>
            <div>
              <Label htmlFor="rawJobDescription">Paste Job Description (Optional)</Label>
              <Textarea
                id="rawJobDescription"
                value={rawJobDescription}
                onChange={(e) => setRawJobDescription(e.target.value)}
                placeholder="Paste the complete job description here to automatically fill the form..."
                className="min-h-[100px]"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Paste a job description to automatically extract and fill in the details below. You can still edit any field after analysis.
              </p>
            </div>
          </div>

          {/* Job Title Section */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold mb-4">Job Information</h3>
            <div>
              <Label htmlFor="jobTitle">Job Title *</Label>
              <Input
                id="jobTitle"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                placeholder="e.g., Senior Frontend Developer"
                required
              />
            </div>
          </div>

          {/* Company Details Section */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold mb-4">Company Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyDetails.name}
                  onChange={(e) => handleCompanyDetailsChange('name', e.target.value)}
                  placeholder="Enter company name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="companyWebsite">Company Website</Label>
                <Input
                  id="companyWebsite"
                  value={formData.companyDetails.website}
                  onChange={(e) => handleCompanyDetailsChange('website', e.target.value)}
                  placeholder="https://company.com"
                  type="url"
                />
              </div>
              <div>
                <Label htmlFor="companyIndustry">Industry</Label>
                <Input
                  id="companyIndustry"
                  value={formData.companyDetails.industry}
                  onChange={(e) => handleCompanyDetailsChange('industry', e.target.value)}
                  placeholder="e.g., Technology, Healthcare"
                />
              </div>
              <div>
                <Label htmlFor="companySize">Company Size</Label>
                <Input
                  id="companySize"
                  value={formData.companyDetails.size}
                  onChange={(e) => handleCompanyDetailsChange('size', e.target.value)}
                  placeholder="e.g., 50-200 employees"
                />
              </div>
              <div>
                <Label htmlFor="companyFounded">Founded Year</Label>
                <Input
                  id="companyFounded"
                  value={formData.companyDetails.founded}
                  onChange={(e) => handleCompanyDetailsChange('founded', e.target.value)}
                  placeholder="e.g., 2010"
                />
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="companyDescription">Company Description</Label>
              <Textarea
                id="companyDescription"
                value={formData.companyDetails.description}
                onChange={(e) => handleCompanyDetailsChange('description', e.target.value)}
                placeholder="Brief description of your company"
                className="mt-2"
              />
            </div>
          </div>

          {/* Job Details Section */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold mb-4">Job Details</h3>
            <div className="space-y-6">
              <DynamicInputList
                label="Required Skills"
                values={formData.requiredSkills}
                onChange={(values) => handleInputChange('requiredSkills', values)}
                placeholder="Enter a required skill"
              />

              <div>
                <Label htmlFor="requiredExperience">Required Experience</Label>
                <Textarea
                  id="requiredExperience"
                  value={formData.requiredExperience}
                  onChange={(e) => handleInputChange('requiredExperience', e.target.value)}
                  placeholder="Enter required experience"
                />
              </div>

              <DynamicInputList
                label="Required Qualifications"
                values={formData.requiredQualifications}
                onChange={(values) => handleInputChange('requiredQualifications', values)}
                placeholder="Enter a qualification"
              />

              <DynamicInputList
                label="Job Responsibilities"
                values={formData.jobResponsibilities}
                onChange={(values) => handleInputChange('jobResponsibilities', values)}
                placeholder="Enter a responsibility"
              />

              <DynamicInputList
                label="Key Requirements"
                values={formData.keyRequirements}
                onChange={(values) => handleInputChange('keyRequirements', values)}
                placeholder="Enter a requirement"
              />

              <DynamicInputList
                label="Company Vision & Mission"
                values={formData.companyInformation}
                onChange={(values) => handleInputChange('companyInformation', values)}
                placeholder="Enter company vision, mission, or values"
              />

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.jobLocationAndType.location}
                    onChange={(e) => handleLocationTypeChange('location', e.target.value)}
                    placeholder="Enter job location"
                  />
                </div>

                <div>
                  <Label htmlFor="type">Job Type</Label>
                  <select
                    id="type"
                    value={formData.jobLocationAndType.type}
                    onChange={(e) => handleLocationTypeChange('type', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="onsite">Onsite</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="time">Time Type</Label>
                  <select
                    id="time"
                    value={formData.jobLocationAndType.time}
                    onChange={(e) => handleLocationTypeChange('time', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Job Settings Section */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold mb-4">Automation Settings</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="applicationDeadline">Application Deadline *</Label>
                  <Input
                    id="applicationDeadline"
                    type="datetime-local"
                    value={formData.settings.applicationDeadline}
                    onChange={(e) => handleSettingsChange('applicationDeadline', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="maxCandidates">Maximum Candidates *</Label>
                  <Input
                    id="maxCandidates"
                    type="number"
                    min="1"
                    value={formData.settings.maxCandidates || ''}
                    onChange={(e) => handleSettingsChange('maxCandidates', e.target.value ? parseInt(e.target.value) : 0)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Interview Time Slots *</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Add interview time slots. Each slot should be at least 1 hour long.
                    The total number of slots should be equal to or greater than the maximum candidates.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="slotStart">Start Time</Label>
                      <Input
                        id="slotStart"
                        type="datetime-local"
                        onChange={(e) => {
                          const startTime = e.target.value;
                          const endTimeInput = document.getElementById('slotEnd') as HTMLInputElement;
                          if (startTime && endTimeInput.value) {
                            handleTimeSlotAdd(startTime, endTimeInput.value);
                            e.target.value = '';
                            endTimeInput.value = '';
                          }
                        }}
                      />
                    </div>
                    <div>
                      <Label htmlFor="slotEnd">End Time</Label>
                      <Input
                        id="slotEnd"
                        type="datetime-local"
                        onChange={(e) => {
                          const endTime = e.target.value;
                          const startTimeInput = document.getElementById('slotStart') as HTMLInputElement;
                          if (endTime && startTimeInput.value) {
                            handleTimeSlotAdd(startTimeInput.value, endTime);
                            startTimeInput.value = '';
                            e.target.value = '';
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                {formData.settings.interviewTimeSlots.length > 0 && (
                  <div className="mt-4">
                    <Label>Added Time Slots</Label>
                    <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                      {formData.settings.interviewTimeSlots.map((slot, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                          <span>
                            {new Date(slot.startTime).toLocaleString()} - {new Date(slot.endTime).toLocaleString()}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const newSlots = [...formData.settings.interviewTimeSlots];
                              newSlots.splice(index, 1);
                              handleSettingsChange('interviewTimeSlots', newSlots);
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Job Posting'}
        </Button>
      </form>
    </Card>
  );
} 