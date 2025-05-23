'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, Plus, Briefcase, Users, Calendar, Clock, ArrowUpRight, Filter } from 'lucide-react'

const JobsPage = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchJobsAndStats = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/jobs')
        const jobsData = await res.json()
        // For each job, fetch applicants and compute stats
        const jobsWithStats = await Promise.all(jobsData.map(async (job: any) => {
          let stats = {
            totalApplicants: 0,
            shortlisted: 0,
            interviewed: 0,
            daysLeft: 0,
          }
          try {
            const applicantsRes = await fetch(`/api/jobs/${job._id}/applicants`)
            const applicants = await applicantsRes.json()
            stats.totalApplicants = applicants.length
            stats.shortlisted = applicants.filter((a: any) => a.status === 'shortlisted').length
            stats.interviewed = applicants.filter((a: any) => a.status === 'interviewed').length
            // Calculate days left
            const deadline = new Date(job.settings.applicationDeadline)
            const now = new Date()
            stats.daysLeft = Math.max(0, Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
          } catch (err) {
            // If applicants fetch fails, leave stats as 0
          }
          return { ...job, stats }
        }))
        setJobs(jobsWithStats)
      } catch (err) {
        setJobs([])
      }
      setLoading(false)
    }
    fetchJobsAndStats()
  }, [])

  // Filter jobs based on search term and active tab
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
    if (activeTab === 'all') return matchesSearch
    if (activeTab === 'active') return matchesSearch && job.stats.daysLeft > 0
    if (activeTab === 'expired') return matchesSearch && job.stats.daysLeft <= 0
    return matchesSearch
  })

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'remote':
        return 'bg-blue-500/20 text-blue-300'
      case 'hybrid':
        return 'bg-purple-500/20 text-purple-300'
      case 'on-site':
        return 'bg-orange-500/20 text-orange-300'
      default:
        return 'bg-gray-500/20 text-gray-300'
    }
  }

  const getTimeTypeColor = (time: string) => {
    switch (time) {
      case 'full-time':
        return 'bg-green-500/20 text-green-300'
      case 'part-time':
        return 'bg-yellow-500/20 text-yellow-300'
      case 'contract':
        return 'bg-pink-500/20 text-pink-300'
      default:
        return 'bg-gray-500/20 text-gray-300'
    }
  }

  return (
    <div className="min-h-screen bg-mashire-black">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-28 pb-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Your Job Postings</h1>
            <p className="text-gray-400">Manage and monitor all your active recruitment campaigns</p>
          </div>
          <Button 
            className="mt-4 md:mt-0 bg-mashire-green text-black hover:bg-mashire-bright-green"
            onClick={() => router.push('/recruiter/jobs/create')}
          >
            <Plus className="mr-2 h-4 w-4" />
            Post New Job
          </Button>
        </div>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              className="pl-10 bg-mashire-dark border-gray-700 focus:border-mashire-green"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="border-gray-700 text-gray-300">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="bg-mashire-dark border border-gray-800">
            <TabsTrigger value="all" className="data-[state=active]:bg-mashire-green data-[state=active]:text-black">
              All Jobs ({jobs.length})
            </TabsTrigger>
            <TabsTrigger value="active" className="data-[state=active]:bg-mashire-green data-[state=active]:text-black">
              Active Jobs ({jobs.filter(job => job.stats.daysLeft > 0).length})
            </TabsTrigger>
            <TabsTrigger value="expired" className="data-[state=active]:bg-mashire-green data-[state=active]:text-black">
              Expired Jobs ({jobs.filter(job => job.stats.daysLeft <= 0).length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <JobCard 
                  key={job._id} 
                  job={job} 
                  formatDate={formatDate}
                  getJobTypeColor={getJobTypeColor}
                  getTimeTypeColor={getTimeTypeColor}
                  onClick={() => router.push(`/recruiter/jobs/${job._id}`)}
                />
              ))}
            </div>
            
            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <Briefcase className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-display font-bold mb-2">No jobs found</h3>
                <p className="text-gray-400 mb-6">
                  {searchTerm ? 'Try adjusting your search terms' : 'You haven\'t posted any jobs yet'}
                </p>
                <Button 
                  className="bg-mashire-green text-black hover:bg-mashire-bright-green"
                  onClick={() => router.push('/recruiter/jobs/create')}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Post New Job
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="active" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <JobCard 
                  key={job._id} 
                  job={job} 
                  formatDate={formatDate}
                  getJobTypeColor={getJobTypeColor}
                  getTimeTypeColor={getTimeTypeColor}
                  onClick={() => router.push(`/recruiter/jobs/${job._id}`)}
                />
              ))}
            </div>
            
            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <Briefcase className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-display font-bold mb-2">No active jobs found</h3>
                <p className="text-gray-400 mb-6">
                  {searchTerm ? 'Try adjusting your search terms' : 'You don\'t have any active job postings'}
                </p>
                <Button 
                  className="bg-mashire-green text-black hover:bg-mashire-bright-green"
                  onClick={() => router.push('/recruiter/jobs/create')}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Post New Job
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="expired" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <JobCard 
                  key={job._id} 
                  job={job} 
                  formatDate={formatDate}
                  getJobTypeColor={getJobTypeColor}
                  getTimeTypeColor={getTimeTypeColor}
                  onClick={() => router.push(`/recruiter/jobs/${job._id}`)}
                />
              ))}
            </div>
            
            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <Briefcase className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-display font-bold mb-2">No expired jobs found</h3>
                <p className="text-gray-400 mb-6">
                  {searchTerm ? 'Try adjusting your search terms' : 'You don\'t have any expired job postings'}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

interface JobCardProps {
  job: any
  formatDate: (date: Date) => string
  getJobTypeColor: (type: string) => string
  getTimeTypeColor: (time: string) => string
  onClick: () => void
}

const JobCard: React.FC<JobCardProps> = ({ 
  job, 
  formatDate, 
  getJobTypeColor, 
  getTimeTypeColor,
  onClick 
}) => {
  return (
    <Card className="glass-card bg-mashire-dark bg-opacity-60 border-gray-800 hover:border-mashire-green hover:green-glow transition-all duration-300 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-display font-bold mb-1 text-white">{job.jobTitle}</h3>
            <p className="text-gray-400 text-sm">{job.companyDetails.name}</p>
          </div>
          <div className="flex flex-col items-end">
            <Badge className={`${job.stats.daysLeft > 0 ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
              {job.stats.daysLeft > 0 ? `${job.stats.daysLeft} days left` : 'Expired'}
            </Badge>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className={getJobTypeColor(job.jobLocationAndType.type)}>
            {job.jobLocationAndType.type.charAt(0).toUpperCase() + job.jobLocationAndType.type.slice(1)}
          </Badge>
          <Badge className={getTimeTypeColor(job.jobLocationAndType.time)}>
            {job.jobLocationAndType.time.charAt(0).toUpperCase() + job.jobLocationAndType.time.slice(1)}
          </Badge>
          <Badge variant="outline" className="border-gray-700 text-gray-300">
            {job.jobLocationAndType.location}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <Users className="h-4 w-4 text-mashire-green mr-2" />
            <span className="text-sm text-gray-300">{job.stats.totalApplicants} applicants</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-mashire-green mr-2" />
            <span className="text-sm text-gray-300">Deadline: {formatDate(job.settings.applicationDeadline)}</span>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-400">
          <Clock className="h-4 w-4 mr-2" />
          <span>Posted on {formatDate(job.createdAt)}</span>
        </div>
      </CardContent>
      
      <CardFooter className="p-0">
        <Button 
          className="w-full rounded-none bg-mashire-dark hover:bg-mashire-green hover:text-black border-t border-gray-800 h-12"
          variant="ghost"
          onClick={onClick}
        >
          View Details
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

export default JobsPage
