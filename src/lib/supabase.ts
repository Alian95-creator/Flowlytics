import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "YOUR_URL";
const supabaseKey = "AIzaSyAWaQ6JMpS1fcje_1Wpk6zyQfZAkO2nfkw";

export const supabase = createClient(supabaseUrl, supabaseKey);