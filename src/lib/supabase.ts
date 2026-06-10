// Re-export helpers for convenience
export { createClient as createServerClient } from '@/utils/supabase/server';
export { createClient as createBrowserClient } from '@/utils/supabase/client';

// Motor type now lives in lib/motors.ts — re-export for backward compat
export type { Motor } from './motors';
