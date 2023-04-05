"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useModelCollection = void 0;
const tslib_1 = require("tslib");
const useModelApi_1 = require("./useModelApi");
const vue_demi_1 = require("vue-demi");
function useModelCollection(ModelClass, userID) {
    const modelApi = (0, useModelApi_1.useModelApi)(ModelClass, userID);
    const ids = (0, vue_demi_1.ref)();
    const collection = (0, vue_demi_1.computed)(() => {
        if (Array.isArray(ids.value)) {
            return ModelClass.query().whereIdIn(ids.value).get();
        }
        return ModelClass.all();
    });
    function index() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield modelApi.index();
        });
    }
    return {
        index,
        ids,
        collection,
        query: modelApi.query,
        error: modelApi.error,
        indexing: modelApi.indexing
    };
}
exports.useModelCollection = useModelCollection;
//# sourceMappingURL=useModelCollection.js.map