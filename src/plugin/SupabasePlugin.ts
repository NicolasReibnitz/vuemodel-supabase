import type { App } from 'vue-demi';
import type { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseClientSymbol } from './SupabaseClientSymbol';

export interface VuePluginOptions {
	supabaseInstance: SupabaseClient;
}

export const SupabasePlugin = {
	install: (vueApp: App, options: VuePluginOptions): void => {
		if (!options || !options.supabaseInstance) {
			throw Error('Supabase instance must be provided');
		}

		vueApp.provide(SupabaseClientSymbol, options.supabaseInstance);
	}
};

export default SupabasePlugin;
