"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useModelApi = void 0;
const tslib_1 = require("tslib");
const useApi_1 = require("./useApi");
function useModelApi(ModelClass, userID) {
    // const supabase = useClient()
    // const userID = await supabase.auth.getUser().then(({data}) => data?.user?.id);
    const apiService = (0, useApi_1.useApi)(ModelClass.entity, userID);
    function create(form = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield apiService.create(form);
            if (apiService.data.value) {
                ModelClass.insert({
                    data: apiService.data.value
                });
            }
        });
    }
    function find(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield apiService.find(id);
            if (apiService.data.value) {
                ModelClass.insert({
                    data: apiService.data.value
                });
            }
        });
    }
    function update(id, form) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield apiService.update(id, form);
            if (apiService.data.value) {
                ModelClass.insert({
                    data: apiService.data.value
                });
            }
        });
    }
    function remove(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield apiService.remove(id);
            ModelClass.delete(id);
        });
    }
    function index() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield apiService.index();
            if (apiService.data.value) {
                ModelClass.insert({
                    data: apiService.data.value
                });
            }
        });
    }
    return {
        create,
        find,
        update,
        remove,
        index,
        query: apiService.query,
        data: apiService.data,
        error: apiService.error,
        userId: apiService.userId,
        indexing: apiService.indexing,
        creating: apiService.creating,
        finding: apiService.finding,
        updating: apiService.updating,
        removing: apiService.removing,
        loading: apiService.loading
    };
}
exports.useModelApi = useModelApi;
//# sourceMappingURL=useModelApi.js.map