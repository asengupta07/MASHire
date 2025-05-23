"use client"
import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  company: string;
  rating: number;
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

const Testimonials: React.FC = () => {
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

  return (
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
  );
};

export default Testimonials;
