"use client"
import React from 'react';
import { 
  FileText, 
  Users, 
  CheckCircle, 
  Calendar, 
  MessageSquare,
  BarChart3,
  PieChart,
  LineChart,
  CheckCheck,
  Clock,
  Star,
  UserCheck
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StepProps {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Step: React.FC<StepProps> = ({ number, icon, title, description }) => {
  return (
    <div className="flex items-start gap-5">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-mashire-green bg-opacity-20 flex items-center justify-center border border-mashire-green">
          {icon}
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-mashire-green font-semibold">Step {number}</span>
          <h3 className="text-xl font-display font-bold">{title}</h3>
        </div>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
};

// Dashboard mock data
const recentCandidates = [
  { name: "Sarah Johnson", role: "Frontend Developer", status: "Interview Scheduled", match: "92%" },
  { name: "Michael Chen", role: "UX Designer", status: "Screening", match: "87%" },
  { name: "Priya Patel", role: "Data Scientist", status: "Qualified", match: "95%" },
  { name: "James Wilson", role: "DevOps Engineer", status: "New Application", match: "78%" },
];

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <FileText className="h-5 w-5 text-mashire-green" />,
      title: "Create Job Posting",
      description: "Set up your job requirements, qualifications, and details in our intuitive dashboard."
    },
    {
      icon: <Users className="h-5 w-5 text-mashire-green" />,
      title: "AI-Powered Candidate Screening",
      description: "Our platform automatically analyzes incoming applications to identify the most qualified candidates."
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-mashire-green" />,
      title: "Smart Qualification Process",
      description: "The system conducts initial screenings through targeted questions and assessments."
    },
    {
      icon: <Calendar className="h-5 w-5 text-mashire-green" />,
      title: "Automated Interview Scheduling",
      description: "Qualified candidates are invited to schedule interviews based on your team's availability."
    },
    {
      icon: <MessageSquare className="h-5 w-5 text-mashire-green" />,
      title: "Intelligent Communication",
      description: "Throughout the process, the system maintains professional correspondence with all candidates."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-mashire-dark">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">How <span className="text-gradient">MASHire</span> works</h2>
            <p className="text-xl text-gray-300 mb-10">
              Our platform streamlines the entire recruitment process from job posting to interview scheduling, saving your team countless hours.
            </p>
            
            <div className="space-y-10">
              {steps.map((step, index) => (
                <Step
                  key={index}
                  number={index + 1}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </div>
          </div>
          
          {/* Right column - Dashboard UI */}
          <div className="relative">
            <div className="absolute -inset-0.5 bg-green-glow rounded-2xl blur-sm opacity-50"></div>
            <div className="glass-card rounded-2xl border border-mashire-green border-opacity-30 p-1 relative">
              <div className="bg-mashire-black rounded-xl overflow-hidden">
                {/* Dashboard Header */}
                <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <h3 className="ml-4 font-semibold text-sm text-white">MASHire Dashboard</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 bg-mashire-green bg-opacity-20 rounded-full flex items-center justify-center">
                      <UserCheck className="h-4 w-4 text-mashire-green" />
                    </div>
                    <div className="h-8 w-8 bg-gray-800 rounded-full"></div>
                  </div>
                </div>
                
                {/* Dashboard Content */}
                <div className="p-5">
                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <Card className="bg-gray-800/50 border-gray-700">
                      <CardContent className="p-4 flex flex-col items-center">
                        <Users className="h-6 w-6 text-mashire-green mb-2" />
                        <span className="text-2xl font-bold">247</span>
                        <span className="text-xs text-gray-400">Active Candidates</span>
                      </CardContent>
                    </Card>
                    <Card className="bg-gray-800/50 border-gray-700">
                      <CardContent className="p-4 flex flex-col items-center">
                        <CheckCheck className="h-6 w-6 text-mashire-green mb-2" />
                        <span className="text-2xl font-bold">42</span>
                        <span className="text-xs text-gray-400">Interviews Scheduled</span>
                      </CardContent>
                    </Card>
                    <Card className="bg-gray-800/50 border-gray-700">
                      <CardContent className="p-4 flex flex-col items-center">
                        <Clock className="h-6 w-6 text-mashire-green mb-2" />
                        <span className="text-2xl font-bold">18.5h</span>
                        <span className="text-xs text-gray-400">Time Saved</span>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Charts Row */}
                  <div className="grid grid-cols-2 gap-5 mb-6">
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-sm font-medium text-gray-300">Candidate Sources</h4>
                        <PieChart className="h-4 w-4 text-gray-500" />
                      </div>
                      <div className="flex justify-center space-x-2">
                        {/* Simplified Pie Chart Representation */}
                        <div className="relative w-20 h-20">
                          <div className="absolute inset-0 border-8 border-mashire-green rounded-full clip-path-[inset(0 0 50% 50%)]"></div>
                          <div className="absolute inset-0 border-8 border-mashire-teal border-opacity-70 rounded-full clip-path-[inset(0 50% 0 0)]"></div>
                          <div className="absolute inset-0 border-8 border-blue-500 border-opacity-70 rounded-full clip-path-[inset(50% 0 0 0)]"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-mashire-green rounded-full"></div>
                            <span className="text-xs text-gray-400">LinkedIn (42%)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-mashire-teal rounded-full"></div>
                            <span className="text-xs text-gray-400">Direct (35%)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="text-xs text-gray-400">Other (23%)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-sm font-medium text-gray-300">Application Trends</h4>
                        <LineChart className="h-4 w-4 text-gray-500" />
                      </div>
                      <div className="h-24 flex items-end justify-between px-2">
                        {/* Simplified Line Chart */}
                        <div className="w-1/6 flex flex-col items-center">
                          <div className="h-12 w-1 bg-gray-700 rounded-full"></div>
                          <span className="text-xs text-gray-500 mt-1">Mon</span>
                        </div>
                        <div className="w-1/6 flex flex-col items-center">
                          <div className="h-16 w-1 bg-gray-700 rounded-full"></div>
                          <span className="text-xs text-gray-500 mt-1">Tue</span>
                        </div>
                        <div className="w-1/6 flex flex-col items-center">
                          <div className="h-10 w-1 bg-gray-700 rounded-full"></div>
                          <span className="text-xs text-gray-500 mt-1">Wed</span>
                        </div>
                        <div className="w-1/6 flex flex-col items-center">
                          <div className="h-20 w-1 bg-mashire-green rounded-full"></div>
                          <span className="text-xs text-gray-500 mt-1">Thu</span>
                        </div>
                        <div className="w-1/6 flex flex-col items-center">
                          <div className="h-14 w-1 bg-gray-700 rounded-full"></div>
                          <span className="text-xs text-gray-500 mt-1">Fri</span>
                        </div>
                        <div className="w-1/6 flex flex-col items-center">
                          <div className="h-6 w-1 bg-gray-700 rounded-full"></div>
                          <span className="text-xs text-gray-500 mt-1">Sat</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Recent Candidates Table */}
                  <div className="bg-gray-800/50 rounded-lg border border-gray-700 mb-5">
                    <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                      <h4 className="text-sm font-medium text-gray-300">Recent Candidates</h4>
                      <BarChart3 className="h-4 w-4 text-gray-500" />
                    </div>
                    <ScrollArea className="h-[180px]">
                      <Table>
                        <TableHeader>
                          <TableRow className="hover:bg-transparent">
                            <TableHead className="text-xs">Name</TableHead>
                            <TableHead className="text-xs">Role</TableHead>
                            <TableHead className="text-xs">Status</TableHead>
                            <TableHead className="text-xs text-right">Match</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {recentCandidates.map((candidate, index) => (
                            <TableRow key={index} className="hover:bg-gray-800/80 transition-colors">
                              <TableCell className="text-xs font-medium text-white py-2">{candidate.name}</TableCell>
                              <TableCell className="text-xs text-gray-400 py-2">{candidate.role}</TableCell>
                              <TableCell className="text-xs py-2">
                                <span className={`px-2 py-1 rounded-full text-[10px] ${
                                  candidate.status === "Interview Scheduled" ? "bg-blue-500/20 text-blue-300" :
                                  candidate.status === "Screening" ? "bg-yellow-500/20 text-yellow-300" :
                                  candidate.status === "Qualified" ? "bg-green-500/20 text-green-300" :
                                  "bg-gray-500/20 text-gray-300"
                                }`}>
                                  {candidate.status}
                                </span>
                              </TableCell>
                              <TableCell className="text-xs text-right py-2">
                                <span className="flex items-center justify-end gap-1">
                                  <Star className="h-3 w-3 text-mashire-green" fill="#00CC6A" />
                                  {candidate.match}
                                </span>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <div className="h-8 w-8 bg-gray-800 rounded flex items-center justify-center">
                        <Users className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="h-8 w-8 bg-gray-800 rounded flex items-center justify-center">
                        <FileText className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    <button className="h-8 px-4 bg-mashire-green text-black rounded text-sm font-medium">
                      View Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;