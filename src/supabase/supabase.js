import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://hbxclxnhrsjeiqfdwfnb.supabase.co";
export const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhieGNseG5ocnNqZWlxZmR3Zm5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ4NzM4NTgsImV4cCI6MjA0MDQ0OTg1OH0.8mhAa0uJtKw6jYLWn1Tr1CxQV_uy5xaa51rsaWN5auw";
export const supabase = createClient(supabaseUrl, supabaseKey);
