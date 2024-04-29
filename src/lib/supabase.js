
import { createClient } from '@supabase/supabase-js'

const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhqa2NoY2pwa3JlcXltbmtrYW11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwNTcyMzEsImV4cCI6MjAyOTYzMzIzMX0.iVtH98DRfK-nnUAJcJkacEWDUMFLr3u7GZZRjiHcMWI";

let supabase = createClient(
    "https://xjkchcjpkreqymnkkamu.supabase.co",
    ANON_KEY
);

export default supabase;