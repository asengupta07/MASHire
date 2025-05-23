'use client'

import React from 'react';
import { 
  SearchCheck, 
  Calendar, 
  MailCheck, 
  BrainCircuit,
  Users,
  BarChart3
} from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="glass-card bg-mashire-dark bg-opacity-60 rounded-xl p-6 transition-all duration-300 hover:border-mashire-green hover:green-glow">
      <div className="bg-mashire-green bg-opacity-20 p-3 rounded-lg w-fit mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-display font-bold mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
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

  return (
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
  );
};

export default Features;