"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useApi = void 0;
const tslib_1 = require("tslib");
const vue_demi_1 = require("vue-demi");
const QueryBuilder_1 = tslib_1.__importDefault(require("../query/QueryBuilder"));
const useClient_1 = require("./useClient");
function useApi(entity, defaultUserId = null) {
    const supabase = (0, useClient_1.useClient)();
    const error = (0, vue_demi_1.ref)(null);
    const data = (0, vue_demi_1.ref)();
    const loading = (0, vue_demi_1.ref)(false);
    const userId = (0, vue_demi_1.ref)(defaultUserId);
    const include = (0, vue_demi_1.ref)([]);
    const indexing = (0, vue_demi_1.ref)(false);
    const creating = (0, vue_demi_1.ref)(false);
    const finding = (0, vue_demi_1.ref)(false);
    const updating = (0, vue_demi_1.ref)(false);
    const removing = (0, vue_demi_1.ref)(false);
    // const includeQuery = computed<string | undefined>(() => {
    //   if(!include.value.length) {
    //     return undefined
    //   }
    //   return include.value.join('(*),') + '(*)'
    // })
    let builder = new QueryBuilder_1.default();
    function resetBuilder() {
        builder = new QueryBuilder_1.default();
    }
    function index() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            error.value = null;
            loading.value = true;
            indexing.value = true;
            const supabaseQueryBuilder = supabase
                .from(entity);
            const query = builder.runWith(supabaseQueryBuilder);
            const { data: responseData, error: err } = yield query;
            resetBuilder();
            loading.value = false;
            indexing.value = false;
            if (err) {
                error.value = err;
                return;
            }
            if (responseData) {
                data.value = responseData;
            }
        });
    }
    function create(form) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            error.value = null;
            if (userId.value) {
                form.user_id = userId.value;
            }
            loading.value = true;
            creating.value = true;
            const { data: responseData, error: err } = yield supabase
                .from(entity)
                .insert([form])
                .select();
            loading.value = false;
            creating.value = false;
            if (err) {
                error.value = err;
                return;
            }
            if (responseData) {
                data.value = responseData === null || responseData === void 0 ? void 0 : responseData[0];
            }
        });
    }
    function find(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            loading.value = true;
            finding.value = true;
            if (typeof id === 'number') {
                id = id.toString();
            }
            const supabaseQueryBuilder = supabase
                .from(entity);
            builder.where('id', id);
            const query = builder.runWith(supabaseQueryBuilder);
            const { data: responseData, error: err } = yield query;
            resetBuilder();
            loading.value = false;
            finding.value = false;
            if (err) {
                error.value = err;
                return;
            }
            if (Array.isArray(responseData) && !responseData.length) {
                error.value = { message: `${entity} with id ${id} not found` };
            }
            if (responseData) {
                data.value = responseData === null || responseData === void 0 ? void 0 : responseData[0];
            }
        });
    }
    function update(id, form) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (userId.value) {
                form.user_id = userId.value;
            }
            loading.value = true;
            updating.value = true;
            const { data: responseData, error: err } = yield supabase
                .from(entity)
                .update(form)
                .match({ id })
                .select();
            loading.value = false;
            updating.value = false;
            if (err) {
                error.value = err;
                return;
            }
            if (responseData) {
                data.value = responseData === null || responseData === void 0 ? void 0 : responseData[0];
            }
        });
    }
    function remove(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            loading.value = true;
            removing.value = true;
            const { data: responseData, error: err } = yield supabase
                .from(entity)
                .delete()
                .match({ id })
                .select();
            loading.value = false;
            removing.value = false;
            if (err) {
                error.value = err;
                return;
            }
            if (responseData) {
                data.value = responseData === null || responseData === void 0 ? void 0 : responseData[0];
            }
        });
    }
    return {
        index,
        create,
        remove,
        find,
        update,
        query: builder,
        error,
        data,
        include,
        userId,
        loading,
        indexing,
        creating,
        finding,
        updating,
        removing
    };
}
exports.useApi = useApi;
//# sourceMappingURL=useApi.js.map