import "next-auth";

declare module "next-auth" {
  interface User {
    role: 'teacher' | 'coordinator' | 'administrator';
  }

  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: 'teacher' | 'coordinator' | 'administrator';
    }
  }
} 