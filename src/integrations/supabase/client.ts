import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://wceljumlfnbnvhotsnid.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjZWxqdW1sZm5ibnZob3RzbmlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyNjczNDcsImV4cCI6MjA1MTg0MzM0N30.pfTSk8Jn2XptAsZVL2FkDlzdLIVm9E9G49cpYekDgYA";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
