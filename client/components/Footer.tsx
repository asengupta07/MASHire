'use client'

import React from 'react';

const Footer: React.FC = () => {
  return (
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
  );
};

export default Footer;