import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Cast } from "../models";

const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_APP_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

export const useCasts = () => {
    const [casts, setCasts] = useState<Cast[]>([]);

    useEffect(() => {
        const fetchCasts = async () => {
            const {data, error} = await supabase.from('casts').select('*');

            if(error) {
                console.error(error);
            } else {
                setCasts(data as Cast[])
            }
        };

        fetchCasts();
    }, []);

    return casts;
}