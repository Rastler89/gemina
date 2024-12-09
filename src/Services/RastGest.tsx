import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Cast, Material } from "../models";

const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_APP_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);