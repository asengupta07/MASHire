'use client'
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

const Hero: React.FC = () => {
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
  return (
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
          <div className="glass-card bg-mashire-dark rounded-lg p-6">
            <p className="text-4xl font-display font-bold text-mashire-green mb-2">85%</p>
            <p className="text-gray-300">Reduction in time-to-hire</p>
          </div>
          <div className="glass-card bg-mashire-dark rounded-lg p-6">
            <p className="text-4xl font-display font-bold text-mashire-green mb-2">3x</p>
            <p className="text-gray-300">More qualified candidates</p>
          </div>
          <div className="glass-card bg-mashire-dark rounded-lg p-6">
            <p className="text-4xl font-display font-bold text-mashire-green mb-2">70%</p>
            <p className="text-gray-300">Reduced recruiting costs</p>
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
  );
};

export default Hero;