"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useModel = void 0;
const tslib_1 = require("tslib");
const useModelApi_1 = require("./useModelApi");
const vue_demi_1 = require("vue-demi");
const ignoreOnUpdateFields = ['id', 'created_at'];
function useModel(ModelClass, userID) {
    const modelApi = (0, useModelApi_1.useModelApi)(ModelClass, userID);
    const id = (0, vue_demi_1.ref)();
    const model = (0, vue_demi_1.computed)(() => {
        return ModelClass.find(id.value);
    });
    function getUpdateableFieldKeys() {
        const fields = ModelClass.getFields();
        return Object.keys(fields).filter(field => {
            return !ignoreOnUpdateFields.includes(field);
        });
    }
    const form = (0, vue_demi_1.ref)({});
    function resetFormToNulls() {
        getUpdateableFieldKeys().forEach(key => {
            const fields = ModelClass.getFields();
            form.value[key] = fields[key].value;
        });
    }
    function resetFormToModel() {
        getUpdateableFieldKeys().forEach(key => {
            var _a;
            form.value[key] = (_a = model.value) === null || _a === void 0 ? void 0 : _a[key];
        });
    }
    function resetForm() {
        if (model.value) {
            resetFormToModel();
        }
        else {
            resetFormToNulls();
        }
    }
    (0, vue_demi_1.watch)(model, () => {
        resetForm();
    }, { immediate: true });
    function create(customForm) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (customForm) {
                yield modelApi.create(customForm);
            }
            else {
                yield modelApi.create(form.value);
            }
            id.value = (_b = (_a = modelApi.data) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.id;
        });
    }
    function find() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield modelApi.find(id.value);
        });
    }
    function update() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!id.value) {
                modelApi.error.value = {
                    status: 0,
                    message: 'no id has been set'
                };
                return;
            }
            yield modelApi.update(id.value, form.value);
        });
    }
    function remove() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!id.value) {
                modelApi.error.value = {
                    status: 0,
                    message: 'no id has been set'
                };
                return;
            }
            yield modelApi.remove(id.value);
            id.value = null;
        });
    }
    return {
        create,
        find,
        update,
        remove,
        model,
        form,
        resetForm,
        id,
        query: modelApi.query,
        error: modelApi.error,
        creating: modelApi.creating,
        finding: modelApi.finding,
        updating: modelApi.updating,
        removing: modelApi.removing,
        loading: modelApi.loading
    };
}
exports.useModel = useModel;
//# sourceMappingURL=useModel.js.map