'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Session } from '@supabase/supabase-js';

type AuthContextType = {
  session: Session | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        console.log('Fetching session...');
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Error fetching session:', error.message);
        } else {
          console.log('Initial session:', data.session);
          setSession(data.session);
        }
      } catch (err) {
        console.error('Unexpected error during session fetch:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(`Auth state changed (${event}):`, session);
      setSession(session);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  console.log('AuthProvider current state:', { session, isLoading });

  return (
    <AuthContext.Provider value={{ session, isLoading }}>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading authentication...</p>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};