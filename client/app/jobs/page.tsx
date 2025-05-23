"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  Building2,
  ArrowRight,
  Calendar,
  X,
  ExternalLink,
  User,
  CheckCircle,
  FileText,
  BrainCircuit,
} from "lucide-react"
import Navbar from "@/components/Navbar"
import { toast } from "sonner"
import JobApplicationModal from "@/components/JobApplicationModal"

// Add these CSS classes after the imports
const styles = `
  .text-gradient {
    background: linear-gradient(90deg, #00CC6A 0%, #00CCCC 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
  
  .green-glow {
    box-shadow: 0 0 15px 1px rgba(0, 204, 106, 0.3);
  }
  
  .shadow-glow {
    box-shadow: 0 0 10px 1px rgba(0, 204, 106, 0.4);
  }
  
  .bg-grid-pattern {
    background-image: 
      linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 20px 20px;
  }
  
  .glass-card {
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }
  
  .scrollbar-thin::-webkit-scrollbar {
    width: 6px;
  }
  
  .scrollbar-thin::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
  }
  
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background: rgba(0, 204, 106, 0.5);
    border-radius: 3px;
  }
  
  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 204, 106, 0.7);
  }
  
  @keyframes modalFadeIn {
    from {
      opacity: 0;
      backdrop-filter: blur(0px);
    }
    to {
      opacity: 1;
      backdrop-filter: blur(8px);
    }
  }
  
  @keyframes modalSlideUp {
    from {
      opacity: 0;
      transform: translate(-50%, -48%) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
  
  .modal-backdrop {
    animation: modalFadeIn 0.3s ease-out forwards;
  }
  
  .modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    animation: modalSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
`

interface Job {
  _id: string
  jobTitle: string
  requiredSkills: string[]
  requiredExperience: string
  requiredQualifications: string[]
  jobResponsibilities: string[]
  keyRequirements: string[]
  companyInformation: string[]
  companyDetails: {
    name: string
    website: string
    industry: string
    size: string
    founded: string
    description: string
  }
  jobLocationAndType: {
    location: string
    type: "remote" | "hybrid" | "onsite"
    time: "full-time" | "part-time"
  }
  settings: {
    applicationDeadline: string
    maxCandidates: number
    interviewTimeSlots: Array<{
      startTime: string
      endTime: string
      isAvailable: boolean
    }>
  }
  createdAt: string
}

const JobsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedTimeType, setSelectedTimeType] = useState<string>("all")
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false)
  const [selectedJobForApplication, setSelectedJobForApplication] = useState<Job | null>(null)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/jobs")
        if (!response.ok) throw new Error("Failed to fetch jobs")
        const data = await response.json()
        setJobs(data)
      } catch (error) {
        console.error("Error fetching jobs:", error)
        toast.error("Failed to load jobs")
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobs()
  }, [])

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.companyDetails.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.requiredSkills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      job.jobResponsibilities.some((resp) => resp.toLowerCase().includes(searchQuery.toLowerCase())) ||
      job.keyRequirements.some((req) => req.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesType = selectedType === "all" || job.jobLocationAndType.type === selectedType
    const matchesTimeType = selectedTimeType === "all" || job.jobLocationAndType.time === selectedTimeType

    return matchesSearch && matchesType && matchesTimeType
  })

  const openJobModal = (job: Job) => {
    setSelectedJob(job)
    setIsModalOpen(true)
  }

  const closeJobModal = () => {
    setSelectedJob(null)
    setIsModalOpen(false)
  }

  const handleApplyClick = (job: Job) => {
    setSelectedJobForApplication(job)
    setIsApplicationModalOpen(true)
  }

  const handleCloseApplicationModal = () => {
    setSelectedJobForApplication(null)
    setIsApplicationModalOpen(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-mashire-black">
        <style jsx global>
          {styles}
        </style>
        <Navbar />
        <main className="container mx-auto px-4 py-8 pt-28">
          <div className="text-center py-12">
            <div className="relative w-12 h-12 mx-auto">
              <div className="absolute inset-0 border-2 border-mashire-green border-opacity-20 rounded-full"></div>
              <div className="absolute inset-0 border-t-2 border-mashire-green rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-400 mt-4">Loading jobs...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-mashire-black">
      <style jsx global>
        {styles}
      </style>
      <Navbar />

      <main className="container mx-auto pt-28 px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 relative">
          {/* Background elements */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0"></div>
          <div className="absolute top-10 right-10 w-64 h-64 bg-mashire-green rounded-full opacity-10 blur-3xl z-0"></div>
          <div className="absolute bottom-0 left-10 w-48 h-48 bg-mashire-teal rounded-full opacity-10 blur-3xl z-0"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-mashire-dark border border-mashire-green border-opacity-30 mb-6">
              <span className="inline-block w-2 h-2 rounded-full bg-mashire-green animate-pulse mr-2"></span>
              <span className="text-sm text-gray-300">Find your next opportunity</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Find Your <span className="text-gradient">Dream Job</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover opportunities from companies using AI-powered recruitment
            </p>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search jobs by title, company, skills, or requirements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-black bg-opacity-40 backdrop-blur-sm border-gray-800 text-white focus:border-mashire-green focus:ring-1 focus:ring-mashire-green"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-black bg-opacity-40 backdrop-blur-sm border border-gray-800 text-white rounded-md px-3 py-2 focus:border-mashire-green focus:ring-1 focus:ring-mashire-green"
              >
                <option value="all">All Types</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">Onsite</option>
              </select>
              <select
                value={selectedTimeType}
                onChange={(e) => setSelectedTimeType(e.target.value)}
                className="bg-black bg-opacity-40 backdrop-blur-sm border border-gray-800 text-white rounded-md px-3 py-2 focus:border-mashire-green focus:ring-1 focus:ring-mashire-green"
              >
                <option value="all">All Time Types</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
              </select>
            </div>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <Card
              key={job._id}
              className="bg-black bg-opacity-40 backdrop-blur-sm border border-gray-800 hover:border-mashire-green transition-all duration-300 cursor-pointer group"
              onClick={() => openJobModal(job)}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-bold text-white mb-2 group-hover:text-gradient transition-all duration-300">
                      {job.jobTitle}
                    </CardTitle>
                    <CardDescription className="text-gray-400 flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      {job.companyDetails.name}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-white bg-opacity-5 text-gray-300 border-gray-700">
                      <MapPin className="h-3 w-3 mr-1" />
                      {job.jobLocationAndType.location}
                    </Badge>
                    <Badge variant="outline" className="bg-white bg-opacity-5 text-gray-300 border-gray-700">
                      <Briefcase className="h-3 w-3 mr-1" />
                      {job.jobLocationAndType.type.charAt(0).toUpperCase() + job.jobLocationAndType.type.slice(1)}
                    </Badge>
                    <Badge variant="outline" className="bg-white bg-opacity-5 text-gray-300 border-gray-700">
                      <Clock className="h-3 w-3 mr-1" />
                      {job.jobLocationAndType.time
                        .split("-")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}
                    </Badge>
                    <Badge variant="outline" className="bg-white bg-opacity-5 text-gray-300 border-gray-700">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(job.settings.applicationDeadline).toLocaleDateString()}
                    </Badge>
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {job.companyDetails.description || job.jobResponsibilities[0] || "No description available"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {job.requiredSkills.slice(0, 4).map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-mashire-green bg-opacity-20 text-mashire-bright-green border border-mashire-green border-opacity-30"
                      >
                        {skill}
                      </Badge>
                    ))}
                    {job.requiredSkills.length > 4 && (
                      <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                        +{job.requiredSkills.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
              {/* <CardFooter className="flex justify-end items-center border-t border-gray-800 pt-4">
                <Button className="bg-mashire-green text-black hover:bg-mashire-bright-green group-hover:shadow-glow transition-all duration-300">
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter> */}
            </Card>
          ))}
        </div>

        {/* No Results Message */}
        {jobs.length > 0 && filteredJobs.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No jobs found</h3>
            <p className="text-gray-400">Try adjusting your search or filters to find more opportunities.</p>
          </div>
        )}

        {/* Empty State when no jobs exist */}
        {jobs.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No jobs available yet</h3>
            <p className="text-gray-400">Check back later for new opportunities!</p>
          </div>
        )}

        {/* Job Detail Modal */}
        {isModalOpen && selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-40 backdrop-blur-lg modal-backdrop">
            <div className="modal-content w-full max-w-7xl h-[90vh] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden glass-card">
              {/* Green glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-mashire-green/20 to-mashire-teal/20 rounded-2xl blur opacity-50 pointer-events-none"></div>

              {/* Close Button */}
              <button
                onClick={closeJobModal}
                className="absolute top-6 right-6 z-20 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 backdrop-blur-sm transition-all duration-200"
              >
                <X className="h-5 w-5 text-white" />
              </button>

              {/* Scrollable Content */}
              <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-mashire-green scrollbar-track-gray-800">
                <div className="p-8 pb-12">
                  {/* Header */}
                  <div className="mb-8 pr-16">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-2">{selectedJob.jobTitle}</h2>
                        <div className="flex items-center gap-2 text-gray-300 mb-4">
                          <Building2 className="h-5 w-5" />
                          <span className="text-lg">{selectedJob.companyDetails.name}</span>
                          {selectedJob.companyDetails.website && (
                            <a
                              href={selectedJob.companyDetails.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-2 text-mashire-green hover:text-mashire-bright-green"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </div>
                      <Button 
                        className="bg-mashire-green text-black hover:bg-mashire-bright-green px-8 flex-shrink-0"
                        onClick={() => handleApplyClick(selectedJob)}
                      >
                        Apply Now
                      </Button>
                    </div>

                    {/* Job Meta Information */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      <Badge className="bg-white bg-opacity-10 backdrop-blur-sm text-white border-0 px-3 py-1">
                        <MapPin className="h-4 w-4 mr-2" />
                        {selectedJob.jobLocationAndType.location}
                      </Badge>
                      <Badge className="bg-white bg-opacity-10 backdrop-blur-sm text-white border-0 px-3 py-1">
                        <Briefcase className="h-4 w-4 mr-2" />
                        {selectedJob.jobLocationAndType.type.charAt(0).toUpperCase() +
                          selectedJob.jobLocationAndType.type.slice(1)}
                      </Badge>
                      <Badge className="bg-white bg-opacity-10 backdrop-blur-sm text-white border-0 px-3 py-1">
                        <Clock className="h-4 w-4 mr-2" />
                        {selectedJob.jobLocationAndType.time
                          .split("-")
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")}
                      </Badge>
                      <Badge className="bg-white bg-opacity-10 backdrop-blur-sm text-white border-0 px-3 py-1">
                        <Calendar className="h-4 w-4 mr-2" />
                        Apply by {new Date(selectedJob.settings.applicationDeadline).toLocaleDateString()}
                      </Badge>
                    </div>
                  </div>

                  {/* Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                      {/* Job Responsibilities */}
                      <div className="bg-black bg-opacity-5 backdrop-blur-sm rounded-xl p-6 border border-mashire-green border-opacity-10 hover:border-mashire-green/30 transition-all duration-300">
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-mashire-green" />
                          Job Responsibilities
                        </h3>
                        <ul className="space-y-3">
                          {selectedJob.jobResponsibilities.map((responsibility, index) => (
                            <li key={index} className="text-gray-300 flex items-start gap-3">
                              <div className="w-2 h-2 bg-mashire-green rounded-full mt-2 flex-shrink-0"></div>
                              <span className="leading-relaxed">{responsibility}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Key Requirements */}
                      <div className="bg-black bg-opacity-5 backdrop-blur-sm rounded-xl p-6 border border-mashire-green border-opacity-10 hover:border-mashire-green/30 transition-all duration-300">
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                          <User className="h-5 w-5 text-mashire-green" />
                          Key Requirements
                        </h3>
                        <ul className="space-y-3">
                          {selectedJob.keyRequirements.map((requirement, index) => (
                            <li key={index} className="text-gray-300 flex items-start gap-3">
                              <div className="w-2 h-2 bg-mashire-green rounded-full mt-2 flex-shrink-0"></div>
                              <span className="leading-relaxed">{requirement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Required Qualifications */}
                      <div className="bg-black bg-opacity-5 backdrop-blur-sm rounded-xl p-6 border border-mashire-green border-opacity-10 hover:border-mashire-green/30 transition-all duration-300">
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                          <FileText className="h-5 w-5 text-mashire-green" />
                          Required Qualifications
                        </h3>
                        <ul className="space-y-3">
                          {selectedJob.requiredQualifications.map((qualification, index) => (
                            <li key={index} className="text-gray-300 flex items-start gap-3">
                              <div className="w-2 h-2 bg-mashire-green rounded-full mt-2 flex-shrink-0"></div>
                              <span className="leading-relaxed">{qualification}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Required Skills */}
                      <div className="bg-black bg-opacity-5 backdrop-blur-sm rounded-xl p-6 border border-mashire-green border-opacity-10 hover:border-mashire-green/30 transition-all duration-300">
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                          <BrainCircuit className="h-5 w-5 text-mashire-green" />
                          Required Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedJob.requiredSkills.map((skill, index) => (
                            <Badge
                              key={index}
                              className="bg-mashire-green bg-opacity-20 text-mashire-bright-green border border-mashire-green border-opacity-30 backdrop-blur-sm"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                      {/* Company Information */}
                      <div className="bg-black bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-mashire-green border-opacity-20 hover:border-mashire-green/30 transition-all duration-300">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                          <Building2 className="h-5 w-5 text-mashire-green" />
                          Company Information
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <span className="text-gray-400 text-sm font-medium">Industry</span>
                            <p className="text-white mt-1">{selectedJob.companyDetails.industry}</p>
                          </div>
                          <div>
                            <span className="text-gray-400 text-sm font-medium">Company Size</span>
                            <p className="text-white mt-1">{selectedJob.companyDetails.size}</p>
                          </div>
                          <div>
                            <span className="text-gray-400 text-sm font-medium">Founded</span>
                            <p className="text-white mt-1">{selectedJob.companyDetails.founded}</p>
                          </div>
                          <div>
                            <span className="text-gray-400 text-sm font-medium">Description</span>
                            <p className="text-gray-300 text-sm mt-1 leading-relaxed">
                              {selectedJob.companyDetails.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Experience Required */}
                      <div className="bg-black bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-mashire-green border-opacity-20 hover:border-mashire-green/30 transition-all duration-300">
                        <h3 className="text-lg font-semibold text-white mb-3">Experience Required</h3>
                        <p className="text-gray-300 leading-relaxed">{selectedJob.requiredExperience}</p>
                      </div>

                      {/* Posted Date */}
                      <div className="bg-black bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-mashire-green border-opacity-20 hover:border-mashire-green/30 transition-all duration-300">
                        <h3 className="text-lg font-semibold text-white mb-3">Posted</h3>
                        <p className="text-gray-300">{new Date(selectedJob.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Application Modal */}
        {selectedJobForApplication && (
          <JobApplicationModal
            isOpen={isApplicationModalOpen}
            onClose={handleCloseApplicationModal}
            jobId={selectedJobForApplication._id}
            jobTitle={selectedJobForApplication.jobTitle}
          />
        )}
      </main>
    </div>
  )
}

export default JobsPage
