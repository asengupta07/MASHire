"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ArrowLeft,
  Users,
  Calendar,
  CheckCircle2,
  XCircle,
  Settings,
  BarChart3,
  PieChart,
  Star,
  Download,
  MessageSquare,
  Play,
  AlertCircle,
  Briefcase,
  MapPin,
  Building,
  Timer,
  Loader2,
  Filter,
} from "lucide-react"
import React from "react"

const JobDashboardPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter()
  const unwrappedParams = React.use(params)
  const jobId = unwrappedParams.id
  const [job, setJob] = useState<any>(null)
  const [applicants, setApplicants] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<any>({
    totalApplicants: 0,
    shortlisted: 0,
    interviewed: 0,
    hired: 0,
    rejected: 0,
    pending: 0,
    skillMatch: { excellent: 0, good: 0, fair: 0, poor: 0 },
  })
  const [isScreening, setIsScreening] = useState(false)
  const [screeningProgress, setScreeningProgress] = useState(0)
  const [screeningStatus, setScreeningStatus] = useState("")
  const [screeningSteps, setScreeningSteps] = useState<string[]>([])

  useEffect(() => {
    const fetchJobAndApplicants = async () => {
      setLoading(true)
      try {
        const jobRes = await fetch(`/api/jobs/${jobId}`)
        const jobData = await jobRes.json()
        // Calculate daysLeft
        const deadline = new Date(jobData.settings?.applicationDeadline)
        const now = new Date()
        const daysLeft = Math.max(0, Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
        jobData.stats = { ...jobData.stats, daysLeft }
        setJob(jobData)
        const applicantsRes = await fetch(`/api/jobs/${jobId}/applicants`)
        const applicantsData = await applicantsRes.json()
        setApplicants(applicantsData)
        // Compute stats
        const statObj = {
          totalApplicants: applicantsData.length,
          shortlisted: applicantsData.filter((a: any) => a.status === 'shortlisted').length,
          interviewed: applicantsData.filter((a: any) => a.status === 'interviewed').length,
          hired: applicantsData.filter((a: any) => a.status === 'hired').length,
          rejected: applicantsData.filter((a: any) => a.status === 'rejected').length,
          pending: applicantsData.filter((a: any) => a.status === 'pending').length,
          skillMatch: { excellent: 0, good: 0, fair: 0, poor: 0 },
        }
        // Skill match (if available)
        applicantsData.forEach((a: any) => {
          if (a.skillMatch && statObj.skillMatch[a.skillMatch as keyof typeof statObj.skillMatch] !== undefined) {
            statObj.skillMatch[a.skillMatch as keyof typeof statObj.skillMatch]++
          }
        })
        setStats(statObj)
      } catch (err) {
        setJob(null)
        setApplicants([])
        setStats({
          totalApplicants: 0,
          shortlisted: 0,
          interviewed: 0,
          hired: 0,
          rejected: 0,
          pending: 0,
          skillMatch: { excellent: 0, good: 0, fair: 0, poor: 0 },
        })
      }
      setLoading(false)
    }
    fetchJobAndApplicants()
  }, [jobId])

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-300"
      case "shortlisted":
        return "bg-blue-500/20 text-blue-300"
      case "interviewed":
        return "bg-purple-500/20 text-purple-300"
      case "hired":
        return "bg-green-500/20 text-green-300"
      case "rejected":
        return "bg-red-500/20 text-red-300"
      default:
        return "bg-gray-500/20 text-gray-300"
    }
  }

  const getSkillMatchColor = (match: string) => {
    switch (match) {
      case "excellent":
        return "bg-green-500/20 text-green-300"
      case "good":
        return "bg-blue-500/20 text-blue-300"
      case "fair":
        return "bg-yellow-500/20 text-yellow-300"
      case "poor":
        return "bg-red-500/20 text-red-300"
      default:
        return "bg-gray-500/20 text-gray-300"
    }
  }

  const startScreeningProcess = () => {
    setIsScreening(true)
    setScreeningProgress(0)
    setScreeningStatus("Initializing AI screening process...")
    setScreeningSteps([])

    // Simulate the screening process
    const steps = [
      "Analyzing resumes and extracting key information...",
      "Matching candidate skills with job requirements...",
      "Evaluating candidate experience and qualifications...",
      "Ranking candidates based on overall fit...",
      "Identifying top candidates for interviews...",
      "Generating personalized feedback for each candidate...",
      "Preparing interview questions based on candidate profiles...",
      "Scheduling interviews with shortlisted candidates...",
      "Sending notifications to all candidates...",
      "Finalizing screening process and generating reports...",
    ]

    let currentStep = 0
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setScreeningStatus(steps[currentStep])
        setScreeningSteps((prev) => [...prev, steps[currentStep]])
        setScreeningProgress((currentStep + 1) * 10)
        currentStep++
      } else {
        clearInterval(interval)
        setScreeningStatus("Screening process completed successfully!")

        // Update applicant statuses to simulate the screening results
        const updatedApplicants = applicants.map((applicant) => {
          if (applicant.status === "pending" && applicant.aiScore >= 85) {
            return { ...applicant, status: "shortlisted" }
          }
          return applicant
        })
        setApplicants(updatedApplicants)
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-mashire-black">
      <Navbar />

      <div className="container mx-auto px-4 pt-28 pb-20">
        {/* Back button and header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            className="mb-4 text-gray-400 hover:text-white hover:bg-mashire-dark"
            onClick={() => router.push("/recruiter/jobs")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Button>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl md:text-4xl font-display font-bold">{job?.jobTitle}</h1>
                <Badge
                  className={job?.stats?.daysLeft > 0 ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}
                >
                  {job?.stats?.daysLeft > 0 ? `${job?.stats?.daysLeft} days left` : "Expired"}
                </Badge>
              </div>
              <div className="flex items-center text-gray-400 gap-4">
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-1" />
                  <span>{job?.companyDetails?.name}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{job?.jobLocationAndType?.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Posted on {formatDate(job?.createdAt)}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-4 md:mt-0">
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:border-mashire-green hover:text-mashire-green"
              >
                <Settings className="mr-2 h-4 w-4" />
                Edit Job
              </Button>
              <Button
                className="bg-mashire-green text-black hover:bg-mashire-bright-green"
                onClick={startScreeningProcess}
                disabled={isScreening && screeningProgress < 100}
              >
                {isScreening && screeningProgress < 100 ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Screening in Progress...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Start Screening & Scheduling
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Screening Progress */}
        {isScreening && (
          <Card className="glass-card bg-mashire-dark bg-opacity-60 border-gray-800 mb-8">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-display flex items-center">
                <Briefcase className="mr-2 h-5 w-5 text-mashire-green" />
                AI Screening Process
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-400">Progress: {screeningProgress}%</span>
                  <span className="text-sm text-gray-400">
                    {screeningProgress === 100 ? "Completed" : "In Progress"}
                  </span>
                </div>
                <Progress value={screeningProgress} className="h-2 bg-gray-700"/>
              </div>

              <div className="bg-black bg-opacity-30 rounded-lg p-4 border border-gray-800">
                <div className="flex items-center mb-3">
                  {screeningProgress === 100 ? (
                    <CheckCircle2 className="h-5 w-5 text-mashire-green mr-2" />
                  ) : (
                    <Loader2 className="h-5 w-5 text-mashire-green mr-2 animate-spin" />
                  )}
                  <span className="text-white font-medium">{screeningStatus}</span>
                </div>

                <ScrollArea className="h-40">
                  <div className="space-y-2">
                    {screeningSteps.map((step, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-mashire-green mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{step}</span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card bg-mashire-dark bg-opacity-60 border-gray-800">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Applicants</p>
                  <p className="text-3xl font-display font-bold">{job?.stats?.totalApplicants}</p>
                </div>
                <div className="bg-black bg-opacity-20 p-2 rounded-lg">
                  <Users className="h-6 w-6 text-mashire-green" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-800">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Application Rate</span>
                  <span className="text-white">{job?.stats?.applicationRate}/day</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card bg-mashire-dark bg-opacity-60 border-gray-800">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Shortlisted</p>
                  <p className="text-3xl font-display font-bold">{job?.stats?.shortlisted}</p>
                </div>
                <div className="bg-black bg-opacity-20 p-2 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-mashire-green" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-800">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Shortlist Rate</span>
                  <span className="text-white">
                    {Math.round((job?.stats?.shortlisted / job?.stats?.totalApplicants) * 100)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card bg-mashire-dark bg-opacity-60 border-gray-800">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Interviewed</p>
                  <p className="text-3xl font-display font-bold">{job?.stats?.interviewed}</p>
                </div>
                <div className="bg-black bg-opacity-20 p-2 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-mashire-green" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-800">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Interview Rate</span>
                  <span className="text-white">
                    {Math.round((job?.stats?.interviewed / job?.stats?.shortlisted) * 100 || 0)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card bg-mashire-dark bg-opacity-60 border-gray-800">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Time Remaining</p>
                  <p className="text-3xl font-display font-bold">{job?.stats?.daysLeft} days</p>
                </div>
                <div className="bg-black bg-opacity-20 p-2 rounded-lg">
                  <Timer className="h-6 w-6 text-mashire-green" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-800">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Deadline</span>
                  <span className="text-white">{formatDate(job?.settings?.applicationDeadline)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="applicants" className="mb-8">
          <TabsList className="bg-mashire-dark border border-gray-800 mb-6">
            <TabsTrigger
              value="applicants"
              className="data-[state=active]:bg-mashire-green data-[state=active]:text-black"
            >
              Applicants
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-mashire-green data-[state=active]:text-black"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-mashire-green data-[state=active]:text-black"
            >
              Job Settings
            </TabsTrigger>
          </TabsList>

          {/* Applicants Tab */}
          <TabsContent value="applicants">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Applicant Status Summary */}
              <Card className="glass-card bg-mashire-dark bg-opacity-60 border-gray-800 lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-xl font-display">Applicant Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                        <span className="text-gray-300">Pending</span>
                      </div>
                      <span className="font-medium">{applicants.filter((a) => a.status === "pending").length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                        <span className="text-gray-300">Shortlisted</span>
                      </div>
                      <span className="font-medium">{applicants.filter((a) => a.status === "shortlisted").length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-purple-400 mr-2"></div>
                        <span className="text-gray-300">Interviewed</span>
                      </div>
                      <span className="font-medium">{applicants.filter((a) => a.status === "interviewed").length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                        <span className="text-gray-300">Hired</span>
                      </div>
                      <span className="font-medium">{applicants.filter((a) => a.status === "hired").length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                        <span className="text-gray-300">Rejected</span>
                      </div>
                      <span className="font-medium">{applicants.filter((a) => a.status === "rejected").length}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-800">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400 text-sm">Skill Match Distribution</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                          <span className="text-gray-300">Excellent</span>
                        </div>
                        <span>{applicants.filter((a) => a.skillMatch === "excellent").length}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-blue-400 mr-2"></div>
                          <span className="text-gray-300">Good</span>
                        </div>
                        <span>{applicants.filter((a) => a.skillMatch === "good").length}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></div>
                          <span className="text-gray-300">Fair</span>
                        </div>
                        <span>{applicants.filter((a) => a.skillMatch === "fair").length}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-red-400 mr-2"></div>
                          <span className="text-gray-300">Poor</span>
                        </div>
                        <span>{applicants.filter((a) => a.skillMatch === "poor").length}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Applicants Table */}
              <Card className="glass-card bg-mashire-dark bg-opacity-60 border-gray-800 lg:col-span-3">
                <CardContent>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-xl font-display">All Applicants</CardTitle>
                  </CardHeader>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="h-8 px-2 border-gray-700 text-gray-300">
                      <Filter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="h-8 px-3 border-gray-700 text-gray-300">
                      Export
                      <Download className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-4">
                    {applicants.length === 0 ? (
                      <div className="text-gray-400 text-center py-8">No applicants yet.</div>
                    ) : (
                      <table className="min-w-full text-sm text-gray-300">
                        <thead>
                          <tr>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-left">Applied</th>
                          </tr>
                        </thead>
                        <tbody>
                          {applicants.map((a: any, i: number) => (
                            <tr key={a._id || i} className="border-t border-gray-800">
                              <td className="px-4 py-2">{a.name}</td>
                              <td className="px-4 py-2">{a.email}</td>
                              <td className="px-4 py-2">
                                <span className={`px-2 py-1 rounded ${getStatusColor(a.status)}`}>{a.status}</span>
                              </td>
                              <td className="px-4 py-2">{formatDate(a.createdAt)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Application Trends */}
              <Card className="glass-card bg-mashire-dark bg-opacity-60 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl font-display flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5 text-mashire-green" />
                    Application Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between px-2">
                    {/* Simplified Bar Chart */}
                    <div className="w-1/7 flex flex-col items-center">
                      <div className="h-20 w-6 bg-mashire-green rounded-t-sm"></div>
                      <span className="text-xs text-gray-500 mt-2">Mon</span>
                    </div>
                    <div className="w-1/7 flex flex-col items-center">
                      <div className="h-32 w-6 bg-mashire-green rounded-t-sm"></div>
                      <span className="text-xs text-gray-500 mt-2">Tue</span>
                    </div>
                    <div className="w-1/7 flex flex-col items-center">
                      <div className="h-24 w-6 bg-mashire-green rounded-t-sm"></div>
                      <span className="text-xs text-gray-500 mt-2">Wed</span>
                    </div>
                    <div className="w-1/7 flex flex-col items-center">
                      <div className="h-48 w-6 bg-mashire-green rounded-t-sm"></div>
                      <span className="text-xs text-gray-500 mt-2">Thu</span>
                    </div>
                    <div className="w-1/7 flex flex-col items-center">
                      <div className="h-36 w-6 bg-mashire-green rounded-t-sm"></div>
                      <span className="text-xs text-gray-500 mt-2">Fri</span>
                    </div>
                    <div className="w-1/7 flex flex-col items-center">
                      <div className="h-16 w-6 bg-mashire-green rounded-t-sm"></div>
                      <span className="text-xs text-gray-500 mt-2">Sat</span>
                    </div>
                    <div className="w-1/7 flex flex-col items-center">
                      <div className="h-12 w-6 bg-mashire-green rounded-t-sm"></div>
                      <span className="text-xs text-gray-500 mt-2">Sun</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Source Channels */}
              <Card className="glass-card bg-mashire-dark bg-opacity-60 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl font-display flex items-center">
                    <PieChart className="mr-2 h-5 w-5 text-mashire-green" />
                    Source Channels
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center mb-6">
                    {/* Simplified Pie Chart */}
                    <div className="relative w-32 h-32">
                      <div
                        className="absolute inset-0 border-[16px] border-blue-500 rounded-full"
                        style={{ clipPath: "polygon(50% 50%, 100% 50%, 100% 0, 0 0, 0 50%)" }}
                      ></div>
                      <div
                        className="absolute inset-0 border-[16px] border-green-500 rounded-full"
                        style={{ clipPath: "polygon(50% 50%, 0 50%, 0 100%, 50% 100%)" }}
                      ></div>
                      <div
                        className="absolute inset-0 border-[16px] border-yellow-500 rounded-full"
                        style={{ clipPath: "polygon(50% 50%, 50% 100%, 100% 100%, 100% 75%)" }}
                      ></div>
                      <div
                        className="absolute inset-0 border-[16px] border-purple-500 rounded-full"
                        style={{ clipPath: "polygon(50% 50%, 100% 75%, 100% 50%)" }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {job?.stats?.topSourceChannels?.map((source: any, index: number) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div
                            className={`w-3 h-3 rounded-full mr-2 ${
                              index === 0
                                ? "bg-blue-500"
                                : index === 1
                                  ? "bg-green-500"
                                  : index === 2
                                    ? "bg-yellow-500"
                                    : "bg-purple-500"
                            }`}
                          ></div>
                          <span className="text-gray-300">{source.name}</span>
                        </div>
                        <span className="font-medium">{source.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Applicant Quality */}
              <Card className="glass-card bg-mashire-dark bg-opacity-60 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl font-display flex items-center">
                    <Star className="mr-2 h-5 w-5 text-mashire-green" />
                    Applicant Quality
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-400">Excellent Match</span>
                        <span className="text-sm font-medium">{job?.stats?.skillMatch?.excellent}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${(job?.stats?.skillMatch?.excellent / job?.stats?.totalApplicants) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-400">Good Match</span>
                        <span className="text-sm font-medium">{job?.stats?.skillMatch?.good}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(job?.stats?.skillMatch?.good / job?.stats?.totalApplicants) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-400">Fair Match</span>
                        <span className="text-sm font-medium">{job?.stats?.skillMatch?.fair}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: `${(job?.stats?.skillMatch?.fair / job?.stats?.totalApplicants) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-400">Poor Match</span>
                        <span className="text-sm font-medium">{job?.stats?.skillMatch?.poor}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: `${(job?.stats?.skillMatch?.poor / job?.stats?.totalApplicants) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-800">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Average Match Score</span>
                      <span className="text-xl font-medium text-mashire-green">87%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Job Details */}
              <Card className="glass-card bg-mashire-dark bg-opacity-60 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl font-display flex items-center">
                    <Briefcase className="mr-2 h-5 w-5 text-mashire-green" />
                    Job Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Basic Information</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Job Title</span>
                          <span className="font-medium">{job?.jobTitle}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Location</span>
                          <span className="font-medium">{job?.jobLocationAndType?.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Job Type</span>
                          <span className="font-medium">
                            {job?.jobLocationAndType?.type.charAt(0).toUpperCase() + job?.jobLocationAndType?.type.slice(1)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Employment Type</span>
                          <span className="font-medium">
                            {job?.jobLocationAndType?.time.charAt(0).toUpperCase() + job?.jobLocationAndType?.time.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-800">
                      <h3 className="text-lg font-medium mb-2">Required Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {job?.requiredSkills.slice(0, 10).map((skill: string, index: number) => (
                          <Badge key={index} variant="outline" className="border-gray-700 text-gray-300">
                            {skill}
                          </Badge>
                        ))}
                        {job?.requiredSkills.length > 10 && (
                          <Badge variant="outline" className="border-gray-700 text-gray-300">
                            +{job?.requiredSkills.length - 10} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-800">
                      <h3 className="text-lg font-medium mb-2">Required Experience</h3>
                      <p className="text-gray-300">{job?.requiredExperience}</p>
                    </div>

                    <div className="pt-4 border-t border-gray-800">
                      <h3 className="text-lg font-medium mb-2">Required Qualifications</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-300">
                        {job?.requiredQualifications.map((qualification: string, index: number) => (
                          <li key={index}>{qualification}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-gray-800">
                      <Button
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:border-mashire-green hover:text-mashire-green"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Edit Job Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Application Settings */}
              <Card className="glass-card bg-mashire-dark bg-opacity-60 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl font-display flex items-center">
                    <Settings className="mr-2 h-5 w-5 text-mashire-green" />
                    Application Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Deadline Settings</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Application Deadline</span>
                          <span className="font-medium">{formatDate(job?.settings?.applicationDeadline)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Time Remaining</span>
                          <span className="font-medium">{job?.stats?.daysLeft} days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Maximum Candidates</span>
                          <span className="font-medium">{job?.settings?.maxCandidates}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-800">
                      <h3 className="text-lg font-medium mb-2">Interview Time Slots</h3>
                      <div className="space-y-2">
                        {job?.settings?.interviewTimeSlots.map((slot: any, index: number) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-2 rounded bg-black bg-opacity-20"
                          >
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-mashire-green mr-2" />
                              <span>
                                {formatDate(slot.startTime)}, {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                              </span>
                            </div>
                            <Badge
                              className={
                                slot.isAvailable ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
                              }
                            >
                              {slot.isAvailable ? "Available" : "Booked"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        className="mt-4 border-gray-700 text-gray-300 hover:border-mashire-green hover:text-mashire-green"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Add More Time Slots
                      </Button>
                    </div>

                    <div className="pt-4 border-t border-gray-800">
                      <h3 className="text-lg font-medium mb-2">Screening Settings</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <CheckCircle2 className="h-4 w-4 text-mashire-green mr-2" />
                            <span className="text-gray-300">Automatic Resume Screening</span>
                          </div>
                          <Badge className="bg-green-500/20 text-green-300">Enabled</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <CheckCircle2 className="h-4 w-4 text-mashire-green mr-2" />
                            <span className="text-gray-300">AI-Powered Skill Matching</span>
                          </div>
                          <Badge className="bg-green-500/20 text-green-300">Enabled</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <CheckCircle2 className="h-4 w-4 text-mashire-green mr-2" />
                            <span className="text-gray-300">Automatic Interview Scheduling</span>
                          </div>
                          <Badge className="bg-green-500/20 text-green-300">Enabled</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-800">
                      <h3 className="text-lg font-medium mb-2">Notification Settings</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <CheckCircle2 className="h-4 w-4 text-mashire-green mr-2" />
                            <span className="text-gray-300">Email Notifications</span>
                          </div>
                          <Badge className="bg-green-500/20 text-green-300">Enabled</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <XCircle className="h-4 w-4 text-red-400 mr-2" />
                            <span className="text-gray-300">SMS Notifications</span>
                          </div>
                          <Badge className="bg-red-500/20 text-red-300">Disabled</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <CheckCircle2 className="h-4 w-4 text-mashire-green mr-2" />
                            <span className="text-gray-300">Application Status Updates</span>
                          </div>
                          <Badge className="bg-green-500/20 text-green-300">Enabled</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-800">
                      <Button
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:border-mashire-green hover:text-mashire-green"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Edit Application Settings
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="glass-card bg-mashire-dark bg-opacity-60 border-red-900/30 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-xl font-display flex items-center text-red-400">
                    <AlertCircle className="mr-2 h-5 w-5" />
                    Danger Zone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 rounded bg-red-950/20 border border-red-900/30">
                      <div>
                        <h4 className="font-medium mb-1">Close Job Posting</h4>
                        <p className="text-sm text-gray-400">
                          This will mark the job as closed and prevent new applications.
                        </p>
                      </div>
                      <Button variant="destructive" className="bg-red-900 hover:bg-red-800">
                        Close Job
                      </Button>
                    </div>

                    <div className="flex justify-between items-center p-4 rounded bg-red-950/20 border border-red-900/30">
                      <div>
                        <h4 className="font-medium mb-1">Delete Job Posting</h4>
                        <p className="text-sm text-gray-400">
                          This will permanently delete the job posting and all associated data.
                        </p>
                      </div>
                      <Button variant="destructive" className="bg-red-900 hover:bg-red-800">
                        Delete Job
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default JobDashboardPage
