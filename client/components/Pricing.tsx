"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface PlanProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

const Plan: React.FC<PlanProps> = ({ name, price, description, features, isPopular }) => {
  return (
    <div className={`glass-card bg-mashire-dark bg-opacity-60 rounded-xl p-8 relative ${
      isPopular ? 'border-mashire-green green-glow' : 'border-gray-800'
    }`}>
      {isPopular && (
        <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
          <div className="bg-mashire-green text-black text-xs font-bold px-3 py-1 rounded-full">
            MOST POPULAR
          </div>
        </div>
      )}
      <h3 className="text-2xl font-display font-bold mb-2">{name}</h3>
      <div className="mb-4">
        <span className="text-4xl font-display font-bold">{price}</span>
        {price !== 'Contact us' && <span className="text-gray-400">/month</span>}
      </div>
      <p className="text-gray-400 mb-6">{description}</p>
      
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-mashire-green mt-0.5 mr-3 flex-shrink-0" />
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button 
        className={`w-full ${
          isPopular 
            ? 'bg-mashire-green text-black hover:bg-mashire-bright-green' 
            : 'bg-transparent border border-gray-600 hover:border-mashire-green hover:text-mashire-green'
        }`}
      >
        {price === 'Contact us' ? 'Contact Sales' : 'Get Started'}
      </Button>
    </div>
  );
};

const Pricing: React.FC = () => {
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

  return (
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
  );
};

export default Pricing;