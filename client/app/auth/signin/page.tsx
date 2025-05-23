'use client';

import { signIn } from 'next-auth/react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SignIn() {
  return (
    <div className="min-h-screen bg-mashire-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-20 right-10 w-96 h-96 bg-mashire-green rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-mashire-teal rounded-full opacity-10 blur-3xl"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <a href="/" className="inline-flex items-center">
              <span className="text-2xl font-display font-bold text-white mr-1">MAS</span>
              <span className="text-2xl font-display font-bold text-gradient">Hire</span>
            </a>
          </div>

          {/* Sign In Card */}
          <div className="glass-card bg-mashire-dark bg-opacity-60 rounded-2xl p-8 border border-gray-800">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-bold text-white mb-2">
                Welcome back
              </h2>
              <p className="text-gray-400">
                Sign in to access your dashboard
              </p>
            </div>

            <div className="space-y-4">
              <Button
                onClick={() => signIn('google', { callbackUrl: '/auth/select-role' })}
                className="w-full bg-mashire-green text-black hover:bg-mashire-bright-green h-12 text-base font-medium"
              >
                Continue with Google
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <p className="mt-8 text-center text-sm text-gray-400">
              Don't have an account?{' '}
              <a href="#" className="text-mashire-green hover:text-mashire-bright-green font-medium">
                Get started
              </a>
            </p>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500">
            By continuing, you agree to our{' '}
            <a href="#" className="text-gray-400 hover:text-mashire-green">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-gray-400 hover:text-mashire-green">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 