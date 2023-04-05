"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const deepmerge_1 = tslib_1.__importDefault(require("deepmerge"));
const { all: mergeAll } = deepmerge_1.default;
const lodash_es_1 = require("lodash-es");
function dotRelationStringArrayToArray(dotRelations) {
    return dotRelations.map(dotRelation => {
        return dotRelation.split('.');
    });
}
function relationsArrayToObject(relationsArray) {
    const result = [];
    relationsArray.forEach((relations) => {
        const nest = {};
        nest[relations[0]] = {};
        let path = relations[0];
        (0, lodash_es_1.drop)(relations).forEach((relation) => {
            path += '.' + relation;
            (0, lodash_es_1.set)(nest, path, {});
        });
        result.push(nest);
    });
    return mergeAll(result);
}
function buildSelectFromRelationsObject(relationsObject) {
    let result = '*,';
    function buildQueryPart(children, key = null, parentChildren = {}, siblingNumber = 0) {
        if (key) {
            result += key + '(*';
        }
        if (key && Object.keys(children).length) {
            result += ',';
        }
        Object.keys(children).forEach((newKey, index) => {
            buildQueryPart(children[newKey], newKey, children, index);
        });
        if (key) {
            result += ')';
        }
        if (Object.keys(parentChildren).length > 1 && (siblingNumber + 1) < Object.keys(parentChildren).length) {
            result += ',';
        }
    }
    buildQueryPart(relationsObject);
    return result;
}
function buildSelect(include) {
    if (!include || (Array.isArray(include) && include.length < 1)) {
        return undefined;
    }
    const asArrayOfRelationArrays = dotRelationStringArrayToArray(include);
    const asMergedRelationsObject = relationsArrayToObject(asArrayOfRelationArrays);
    return buildSelectFromRelationsObject(asMergedRelationsObject);
}
exports.default = buildSelect;
//# sourceMappingURL=buildSelect.js.map