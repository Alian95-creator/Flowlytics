import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tccaqzrziqgfrtmnrdfy.supabase.co";
const supabaseKey = "sb_publishable_fQk23d6do-oRB9098cNUgg_6_ZdvfuT";

export const supabase = createClient(supabaseUrl, supabaseKey);