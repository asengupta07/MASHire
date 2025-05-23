'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/lib/models/User';
import { motion } from 'framer-motion';
import { Users, Briefcase, ArrowRight, CheckCircle } from 'lucide-react';

export default function SelectRole() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-mashire-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mashire-green"></div>
      </div>
    );
  }

  if (!session) {
    router.push('/auth/signin');
    return null;
  }

  const handleRoleSelect = async (role: UserRole) => {
    setSelectedRole(role);
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/update-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role }),
      });

      if (!response.ok) {
        throw new Error('Failed to update role');
      }

      // Add a small delay to show the success animation
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (error) {
      console.error('Error updating role:', error);
      setIsLoading(false);
      setSelectedRole(null);
    }
  };

  return (
    <div className="min-h-screen bg-mashire-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-20 right-10 w-96 h-96 bg-mashire-green rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-mashire-teal rounded-full opacity-10 blur-3xl"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl"
        >
          <div className="glass-card bg-mashire-dark bg-opacity-60 rounded-2xl p-8 border border-gray-800">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl font-display font-bold text-white mb-2">
                  Welcome to <span className="text-gradient">MASHire</span>
                </h2>
              </motion.div>
              <p className="text-gray-400 text-lg">
                Choose how you want to use our platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recruiter Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`glass-card rounded-xl p-6 border-2 transition-all duration-300 cursor-pointer ${
                  selectedRole === 'recruiter' 
                    ? 'border-mashire-green bg-mashire-green/10' 
                    : 'border-gray-800 hover:border-mashire-green/50'
                }`}
                onClick={() => handleRoleSelect('recruiter')}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`p-4 rounded-full mb-4 ${
                    selectedRole === 'recruiter' 
                      ? 'bg-mashire-green text-black' 
                      : 'bg-gray-800 text-mashire-green'
                  }`}>
                    <Users className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-2">I'm a Recruiter</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Post jobs, screen candidates, and streamline your hiring process
                  </p>
                  {selectedRole === 'recruiter' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-mashire-green"
                    >
                      <CheckCircle className="h-6 w-6" />
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Job Hunter Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`glass-card rounded-xl p-6 border-2 transition-all duration-300 cursor-pointer ${
                  selectedRole === 'job_hunter' 
                    ? 'border-mashire-teal bg-mashire-teal/10' 
                    : 'border-gray-800 hover:border-mashire-teal/50'
                }`}
                onClick={() => handleRoleSelect('job_hunter')}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`p-4 rounded-full mb-4 ${
                    selectedRole === 'job_hunter' 
                      ? 'bg-mashire-teal text-black' 
                      : 'bg-gray-800 text-mashire-teal'
                  }`}>
                    <Briefcase className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-2">I'm Looking for Jobs</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Find opportunities, track applications, and land your dream job
                  </p>
                  {selectedRole === 'job_hunter' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-mashire-teal"
                    >
                      <CheckCircle className="h-6 w-6" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>

            {selectedRole && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-center"
              >
                <p className="text-mashire-green mb-4">
                  {isLoading ? 'Setting up your account...' : 'Role selected! Redirecting...'}
                </p>
                {isLoading && (
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-mashire-green"></div>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 