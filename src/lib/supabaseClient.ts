import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wpxrmmpymmehakgrdwgl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndweHJtbXB5bW1laGFrZ3Jkd2dsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwNTgwNzMsImV4cCI6MjA1MjYzNDA3M30.aj8L9smj0hlAwebS57B1pevYdlONrxzzXHC2eRY2H2Q';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
