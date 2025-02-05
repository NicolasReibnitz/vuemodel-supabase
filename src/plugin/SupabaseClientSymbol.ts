import type { SupabaseClient } from '@supabase/supabase-js';
import type { InjectionKey } from 'vue-demi';

const SupabaseClientSymbol: InjectionKey<SupabaseClient> = Symbol('SupabaseDefaultClient');

export { SupabaseClientSymbol };
