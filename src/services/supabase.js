
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://ykwriqrhfexrsqxxvjok.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlrd3JpcXJoZmV4cnNxeHh2am9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxMDE0NTIsImV4cCI6MjA3NzY3NzQ1Mn0.MyFn9flXguomaRiVZzNNqyoK6JiSfx76YKg6hwqdjC4"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase