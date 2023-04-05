"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useModelCollection = exports.useModel = exports.useModelApi = exports.useApi = exports.useClient = exports.default = exports.SupabasePlugin = void 0;
var SupabasePlugin_1 = require("./plugin/SupabasePlugin");
Object.defineProperty(exports, "SupabasePlugin", { enumerable: true, get: function () { return SupabasePlugin_1.SupabasePlugin; } });
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return SupabasePlugin_1.SupabasePlugin; } });
var useClient_1 = require("./composables/useClient");
Object.defineProperty(exports, "useClient", { enumerable: true, get: function () { return useClient_1.useClient; } });
var useApi_1 = require("./composables/useApi");
Object.defineProperty(exports, "useApi", { enumerable: true, get: function () { return useApi_1.useApi; } });
var useModelApi_1 = require("./composables/useModelApi");
Object.defineProperty(exports, "useModelApi", { enumerable: true, get: function () { return useModelApi_1.useModelApi; } });
var useModel_1 = require("./composables/useModel");
Object.defineProperty(exports, "useModel", { enumerable: true, get: function () { return useModel_1.useModel; } });
var useModelCollection_1 = require("./composables/useModelCollection");
Object.defineProperty(exports, "useModelCollection", { enumerable: true, get: function () { return useModelCollection_1.useModelCollection; } });
//# sourceMappingURL=main.js.map