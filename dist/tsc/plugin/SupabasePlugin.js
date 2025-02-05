"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabasePlugin = void 0;
const SupabaseClientSymbol_1 = require("./SupabaseClientSymbol");
exports.SupabasePlugin = {
    install: (vueApp, options) => {
        if (!options || !options.supabaseInstance) {
            throw Error('Supabase instance must be provided');
        }
        vueApp.provide(SupabaseClientSymbol_1.SupabaseClientSymbol, options.supabaseInstance);
    }
};
exports.default = exports.SupabasePlugin;
//# sourceMappingURL=SupabasePlugin.js.map