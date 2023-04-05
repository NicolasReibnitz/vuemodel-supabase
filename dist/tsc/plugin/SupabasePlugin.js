"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabasePlugin = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const SupabaseClientSymbol_1 = require("./SupabaseClientSymbol");
exports.SupabasePlugin = {
    install: (vueApp, options) => {
        if (!options || !options.credentials || !options.credentials.supabaseKey || !options.credentials.supabaseUrl) {
            throw Error('Credentials must be provided when installing supabase');
        }
        const { supabaseUrl, supabaseKey } = options.credentials;
        const client = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
        vueApp.provide(SupabaseClientSymbol_1.SupabaseClientSymbol, client);
    }
};
exports.default = exports.SupabasePlugin;
//# sourceMappingURL=SupabasePlugin.js.map