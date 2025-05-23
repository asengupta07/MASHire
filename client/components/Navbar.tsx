"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, User, LogOut } from 'lucide-react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { data: session } = useSession();

  const UserAvatar = () => {
    if (session?.user?.image) {
      return (
        <div className="h-8 w-8 rounded-full overflow-hidden">
          <Image
            src={session.user.image}
            alt={session.user.name || 'User avatar'}
            width={32}
            height={32}
            className="object-cover"
          />
        </div>
      );
    }
    return (
      <div className="h-8 w-8 bg-mashire-green bg-opacity-20 rounded-full flex items-center justify-center">
        <User className="h-4 w-4 text-mashire-green" />
      </div>
    );
  };

  return (
    <nav className="fixed w-full z-50 bg-mashire-black bg-opacity-70 backdrop-blur-md border-b border-mashire-green border-opacity-20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-display font-bold text-white mr-1">MAS</span>
              <span className="text-xl font-display font-bold text-gradient">Hire</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!session ? (
              <>
                <Link href="#features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
                <Link href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</Link>
                <Link href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Testimonials</Link>
                <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link>
                <Button 
                  variant="outline" 
                  className="border-mashire-green text-mashire-green hover:bg-mashire-green hover:text-black"
                  onClick={() => signIn('google')}
                >
                  Login
                </Button>
                <Button 
                  className="bg-mashire-green text-black hover:bg-mashire-bright-green"
                  onClick={() => signIn('google')}
                >
                  Try for Free
                </Button>
              </>
            ) : (
              <>
                <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
                <Link href="/candidates" className="text-gray-300 hover:text-white transition-colors">Candidates</Link>
                <Link href="/jobs" className="text-gray-300 hover:text-white transition-colors">Jobs</Link>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <UserAvatar />
                    <span className="text-gray-300">{session.user?.name || session.user?.email}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="text-gray-300 hover:text-white hover:bg-gray-800 hover:cursor-pointer"
                    onClick={() => signOut()}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-white hover:bg-gray-800"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 space-y-3 flex flex-col">
            {!session ? (
              <>
                <Link href="#features" className="text-gray-300 hover:text-white transition-colors py-2">Features</Link>
                <Link href="#how-it-works" className="text-gray-300 hover:text-white transition-colors py-2">How It Works</Link>
                <Link href="#testimonials" className="text-gray-300 hover:text-white transition-colors py-2">Testimonials</Link>
                <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors py-2">Pricing</Link>
                <div className="flex flex-col space-y-2 pt-2">
                  <Button 
                    variant="outline" 
                    className="border-mashire-green text-mashire-green hover:bg-mashire-green hover:text-black w-full"
                    onClick={() => signIn('google')}
                  >
                    Login
                  </Button>
                  <Button 
                    className="bg-mashire-green text-black hover:bg-mashire-bright-green w-full"
                    onClick={() => signIn('google')}
                  >
                    Try for Free
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors py-2">Dashboard</Link>
                <Link href="/candidates" className="text-gray-300 hover:text-white transition-colors py-2">Candidates</Link>
                <Link href="/jobs" className="text-gray-300 hover:text-white transition-colors py-2">Jobs</Link>
                <div className="flex items-center space-x-2 py-2">
                  <UserAvatar />
                  <span className="text-gray-300">{session.user?.name || session.user?.email}</span>
                </div>
                <Button 
                  variant="ghost" 
                  className="text-gray-300 hover:text-white hover:bg-gray-800 w-full justify-start"
                  onClick={() => signOut()}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
