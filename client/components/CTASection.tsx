'use client'

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
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
  );
};

export default CTASection;