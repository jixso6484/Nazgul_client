import { createClient } from "@supabase/supabase-js";

//잘됨
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseApiKey = process.env.REACT_APP_SUPABASE_API_KEY;

if (!supabaseUrl || !supabaseApiKey) {
    console.error("Supabase URL or API Key is missing.");
    throw new Error("Supabase URL and API Key must be provided!");
}

const supabase = createClient(supabaseUrl, supabaseApiKey);

export default supabase;
