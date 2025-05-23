'use client'

import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowRight, Check, SearchCheck, Calendar, MailCheck, BrainCircuit, Users, BarChart3, FileText, CheckCircle, MessageSquare, Star, UserCheck, CheckCheck, Clock, PieChart, LineChart, LogOut } from 'lucide-react';


interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}
interface StepProps {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}
interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  company: string;
  rating: number;
}
interface PlanProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, name, title, company, rating }) => {
  return (
    <div className="glass-card bg-mashire-dark bg-opacity-50 rounded-xl p-8 h-full flex flex-col">
      <div className="flex mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="h-5 w-5 text-mashire-green fill-mashire-green" />
        ))}
      </div>
      <p className="text-lg text-gray-300 mb-6 flex-grow">"{quote}"</p>
      <div>
        <p className="font-display font-bold">{name}</p>
        <p className="text-sm text-gray-400">{title}, {company}</p>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="glass-card bg-mashire-dark bg-opacity-60 rounded-xl p-8 border border-gray-800 transition-all duration-300 hover:border-mashire-green hover:green-glow">
      <div className="bg-black bg-opacity-20 p-4 rounded-lg w-fit mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-display font-bold mb-4 text-white">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
};

const Step: React.FC<StepProps> = ({ number, icon, title, description }) => {
  return (
    <div className="flex items-start gap-5">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-black bg-opacity-20 flex items-center justify-center border border-mashire-green">
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

const Plan: React.FC<PlanProps> = ({ name, price, description, features, isPopular }) => {
  return (
    <div className={`glass-card bg-mashire-dark bg-opacity-60 rounded-xl p-8 relative h-full flex flex-col ${isPopular ? 'border-mashire-green green-glow' : 'border-gray-800'
      }`}>
      {isPopular && (
        <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
          <div className="bg-mashire-green text-black text-xs font-bold px-3 py-1 rounded-full">
            MOST POPULAR
          </div>
        </div>
      )}
      <div className="flex-grow">
        <h3 className="text-2xl font-display font-bold mb-2">{name}</h3>
        <div className="mb-4">
          <span className="text-4xl font-display font-bold">{price}</span>
          {price !== 'Contact us' && <span className="text-gray-400">/month</span>}
        </div>
        <p className="text-gray-400 mb-6">{description}</p>

        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-mashire-green mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button
        className={`w-full mt-8 ${isPopular
            ? 'bg-mashire-green text-black hover:bg-mashire-bright-green'
            : 'bg-transparent border border-gray-600 hover:bg-gray-800 hover:border-mashire-green hover:text-mashire-green'
          }`}
      >
        {price === 'Contact us' ? 'Contact Sales' : 'Get Started'}
      </Button>
    </div>
  );
};

const Index: React.FC = () => {
  const features = [
    {
      icon: <SearchCheck className="h-6 w-6 text-mashire-green" />,
      title: "Intelligent Screening",
      description: "Our AI analyzes resumes and profiles to find the best candidates matching your job requirements."
    },
    {
      icon: <Calendar className="h-6 w-6 text-mashire-green" />,
      title: "Automatic Scheduling",
      description: "Let our platform handle the back-and-forth of scheduling interviews with candidates."
    },
    {
      icon: <MailCheck className="h-6 w-6 text-mashire-green" />,
      title: "Smart Communications",
      description: "Maintain consistent and professional email correspondence with all candidates."
    },
    {
      icon: <BrainCircuit className="h-6 w-6 text-mashire-green" />,
      title: "AI-Powered Insights",
      description: "Get data-driven recommendations to improve your hiring process and decisions."
    },
    {
      icon: <Users className="h-6 w-6 text-mashire-green" />,
      title: "Candidate Management",
      description: "Organize and track candidates through every stage of your recruitment pipeline."
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-mashire-green" />,
      title: "Analytics Dashboard",
      description: "Monitor performance metrics and identify bottlenecks in your hiring process."
    }
  ];

  const testimonials = [
    {
      quote: "MASHire has revolutionized our hiring process. We've reduced time-to-hire by 70% and are seeing much higher quality candidates.",
      name: "Sarah Johnson",
      title: "HR Director",
      company: "TechCorp",
      rating: 5
    },
    {
      quote: "The AI screening has saved our recruitment team countless hours. We can now focus on strategic work rather than sorting through resumes.",
      name: "David Chen",
      title: "Talent Acquisition Manager",
      company: "InnovateX",
      rating: 5
    },
    {
      quote: "I was skeptical about AI recruitment tools, but MASHire has proven to be invaluable. The automated scheduling alone is worth the investment.",
      name: "Priya Patel",
      title: "Chief People Officer",
      company: "NextGen",
      rating: 4
    },
    {
      quote: "The intelligent screening has dramatically improved our candidate quality. We're hiring better talent in less time than ever before.",
      name: "Michael Rodriguez",
      title: "VP of Operations",
      company: "FutureLabs",
      rating: 5
    }
  ];

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

  const plans = [
    {
      name: "Starter",
      price: "$99",
      description: "Perfect for small businesses and startups.",
      features: [
        "Up to 10 job postings",
        "Basic AI candidate screening",
        "Email templates",
        "Interview scheduling",
        "Basic analytics"
      ]
    },
    {
      name: "Professional",
      price: "$299",
      description: "Ideal for growing companies with regular hiring needs.",
      features: [
        "Up to 25 job postings",
        "Advanced AI candidate screening",
        "Custom email workflows",
        "Team calendar integration",
        "Comprehensive analytics",
        "API access"
      ],
      isPopular: true
    },
    {
      name: "Enterprise",
      price: "Contact us",
      description: "For large organizations with complex recruitment needs.",
      features: [
        "Unlimited job postings",
        "Enterprise-grade AI screening",
        "Custom integration support",
        "Advanced security features",
        "Dedicated account manager",
        "Custom reporting",
        "Priority support"
      ]
    }
  ];

  const recentCandidates = [
    { name: "Sarah Johnson", role: "Frontend Developer", status: "Interview Scheduled", match: "92%" },
    { name: "Michael Chen", role: "UX Designer", status: "Screening", match: "87%" },
    { name: "Priya Patel", role: "Data Scientist", status: "Qualified", match: "95%" },
    { name: "James Wilson", role: "DevOps Engineer", status: "New Application", match: "78%" },
  ];

  return (
    <div className="min-h-screen bg-mashire-black">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-28 pb-20 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-mashire-green rounded-full opacity-10 blur-3xl z-0"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-mashire-teal rounded-full opacity-10 blur-3xl z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-mashire-dark border border-mashire-green border-opacity-30 mb-6">
              <span className="inline-block w-2 h-2 rounded-full bg-mashire-green animate-pulse-green mr-2"></span>
              <span className="text-sm text-gray-300">Recruiting, reimagined with AI</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 max-w-4xl leading-tight">
              <span>Automate your </span>
              <span className="text-gradient">recruitment process</span>
              <span> with intelligent AI</span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              MASHire processes candidate profiles, conducts intelligent screenings, and schedules interviews automatically, saving your team countless hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-mashire-green text-black hover:bg-mashire-bright-green px-8 py-6 text-lg font-medium">
                Start for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 px-8 py-6 text-lg font-medium">
                Book a Demo
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="glass-card bg-mashire-dark bg-opacity-60 rounded-xl p-8 border border-gray-800 hover:border-mashire-green hover:green-glow transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                <p className="text-5xl font-display font-bold text-mashire-green mb-3">85%</p>
                <p className="text-lg text-gray-300">Reduction in time-to-hire</p>
              </div>
            </div>
            <div className="glass-card bg-mashire-dark bg-opacity-60 rounded-xl p-8 border border-gray-800 hover:border-mashire-green hover:green-glow transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                <p className="text-5xl font-display font-bold text-mashire-green mb-3">3x</p>
                <p className="text-lg text-gray-300">More qualified candidates</p>
              </div>
            </div>
            <div className="glass-card bg-mashire-dark bg-opacity-60 rounded-xl p-8 border border-gray-800 hover:border-mashire-green hover:green-glow transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                <p className="text-5xl font-display font-bold text-mashire-green mb-3">70%</p>
                <p className="text-lg text-gray-300">Reduced recruiting costs</p>
              </div>
            </div>
          </div>

          {/* Trusted by logos */}
          <div className="mt-20 text-center">
            <p className="text-gray-400 mb-6">Trusted by forward-thinking companies</p>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 opacity-70">
              <div className="h-8 text-gray-400 font-display font-bold">ACME Inc</div>
              <div className="h-8 text-gray-400 font-display font-bold">TechCorp</div>
              <div className="h-8 text-gray-400 font-display font-bold">InnovateX</div>
              <div className="h-8 text-gray-400 font-display font-bold">FutureLabs</div>
              <div className="h-8 text-gray-400 font-display font-bold">NextGen</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-80 bg-mashire-green opacity-5 blur-3xl z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Cutting-edge recruitment <span className="text-gradient">features</span></h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Our platform combines AI intelligence with smart automation to transform your hiring process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
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
                      <div className="h-8 w-8 bg-black bg-opacity-20 rounded-full flex items-center justify-center">
                        <UserCheck className="h-4 w-4 text-mashire-green" />
                      </div>
                      <div className="h-8 w-8 bg-gray-800 rounded-full flex items-center justify-center">
                        <LogOut className="h-4 w-4 text-gray-400" />
                      </div>
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
                                  <span className={`px-2 py-1 rounded-full text-[10px] ${candidate.status === "Interview Scheduled" ? "bg-blue-500/20 text-blue-300" :
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

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 relative">
        {/* Background elements */}
        <div className="absolute bottom-0 left-0 w-1/3 h-80 bg-mashire-teal opacity-5 blur-3xl z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">What our <span className="text-gradient">clients say</span></h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Companies across industries are transforming their recruiting with MASHire's AI-powered platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <Testimonial
                key={index}
                quote={testimonial.quote}
                name={testimonial.name}
                title={testimonial.title}
                company={testimonial.company}
                rating={testimonial.rating}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-mashire-dark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Simple, <span className="text-gradient">transparent pricing</span></h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Choose the plan that fits your recruitment needs and scale as your company grows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Plan
                key={index}
                name={plan.name}
                price={plan.price}
                description={plan.description}
                features={plan.features}
                isPopular={plan.isPopular}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-radial from-mashire-green/10 to-transparent opacity-80 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto glass-card bg-mashire-dark bg-opacity-70 rounded-2xl p-10 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Ready to transform your <span className="text-gradient">recruitment process</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join hundreds of forward-thinking companies that are already saving time and finding better talent with MASHire.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-mashire-green text-black hover:bg-mashire-bright-green px-8 py-6 text-lg font-medium">
                Get Started for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 px-8 py-6 text-lg font-medium">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-mashire-black py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Logo and description */}
            <div className="lg:col-span-2">
              <a href="/" className="flex items-center mb-4">
                <span className="text-xl font-display font-bold text-white mr-1">MAS</span>
                <span className="text-xl font-display font-bold text-gradient">Hire</span>
              </a>
              <p className="text-gray-400 mb-4">
                Intelligent and autonomous job posting and recruitment platform powered by AI.
              </p>
            </div>

            {/* Links */}
            <div>
              <h3 className="text-lg font-display font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-mashire-green">Features</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-mashire-green">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-mashire-green">Demo</a></li>
                <li><a href="#" className="text-gray-400 hover:text-mashire-green">API</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-display font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-mashire-green">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-mashire-green">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-mashire-green">Case Studies</a></li>
                <li><a href="#" className="text-gray-400 hover:text-mashire-green">Help Center</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-display font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-mashire-green">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-mashire-green">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-mashire-green">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-mashire-green">Privacy</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright and social media */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2025 MASHire. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-mashire-green">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-mashire-green">
                LinkedIn
              </a>
              <a href="#" className="text-gray-400 hover:text-mashire-green">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Index;