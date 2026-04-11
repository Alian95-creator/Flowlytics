import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "flowlytics-835b9.firebaseapp.com";
const supabaseKey = "AIzaSyAWaQ6JMpS1fcje_1Wpk6zyQfZAkO2nfkw";

export const supabase = createClient(supabaseUrl, supabaseKey);