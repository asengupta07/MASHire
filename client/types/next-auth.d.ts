import { UserRole } from '@/lib/models/User';
import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: UserRole;
    };
  }
} 