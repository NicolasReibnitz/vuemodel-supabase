"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClient = void 0;
const vue_demi_1 = require("vue-demi");
const SupabaseClientSymbol_1 = require("../plugin/SupabaseClientSymbol");
const useClient = () => {
    const client = (0, vue_demi_1.inject)(SupabaseClientSymbol_1.SupabaseClientSymbol);
    if (!client) {
        throw Error('Error injecting supabase client');
    }
    return client;
};
exports.useClient = useClient;
//# sourceMappingURL=useClient.js.map