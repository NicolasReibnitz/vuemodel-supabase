"use strict";
var _QueryBuilder_filters, _QueryBuilder_limit, _QueryBuilder_order, _QueryBuilder_range, _QueryBuilder_with;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// import { SupabaseQueryBuilder } from '@supabase/supabase-js/dist/main/lib/SupabaseQueryBuilder'
const buildSelect_1 = tslib_1.__importDefault(require("./buildSelect"));
const supabaseFilterMethodsMap = {
    '=': 'eq',
    '!=': 'neq',
    '>': 'gt',
    '<': 'lt',
    '<=': 'lte',
    like: 'like',
    ilike: 'ilike',
    is: 'is',
    in: 'in',
    contains: 'contains',
    containedBy: 'containedBy',
    rangeLt: 'rangeLt',
    rangeGt: 'rangeGt',
    rangeGte: 'rangeGte',
    rangeLte: 'rangeLte',
    rangeAdjacent: 'rangeAdjacent',
    overlaps: 'overlaps',
    textSearch: 'textSearch'
};
class QueryBuilder {
    constructor() {
        _QueryBuilder_filters.set(this, []);
        _QueryBuilder_limit.set(this, null);
        _QueryBuilder_order.set(this, null);
        _QueryBuilder_range.set(this, null);
        _QueryBuilder_with.set(this, []);
    }
    runWith(queryBuilder
    // : SupabaseQueryBuilder<Record<string, unknown>>
    ) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Select
            const filterBuilder = queryBuilder.select((0, buildSelect_1.default)(tslib_1.__classPrivateFieldGet(this, _QueryBuilder_with, "f")));
            // Filters
            tslib_1.__classPrivateFieldGet(this, _QueryBuilder_filters, "f").forEach(filter => {
                var _a, _b;
                const field = filter[0];
                const value = (_a = filter[2]) !== null && _a !== void 0 ? _a : filter[1];
                const operator = (filter[2] ? filter[1] : '=');
                const options = (_b = filter[3]) !== null && _b !== void 0 ? _b : {};
                const supabaseFilter = supabaseFilterMethodsMap[operator];
                switch (supabaseFilter) {
                    case '=':
                        filterBuilder.eq(field, value);
                        break;
                    case '!=':
                        filterBuilder.neq(field, value);
                        break;
                    case '>':
                        filterBuilder.gt(field, value);
                        break;
                    case '<':
                        filterBuilder.lt(field, value);
                        break;
                    case '<=':
                        filterBuilder.lte(field, value);
                        break;
                    case 'like':
                        () => {
                            if (value !== 'string') {
                                throw new Error(`'like' filter must be a string. '${typeof value}' given.`);
                            }
                            filterBuilder.like(field, value);
                        };
                        break;
                    case 'ilike':
                        () => {
                            if (value !== 'string') {
                                throw new Error(`'like' filter must be a string. '${typeof value}' given.`);
                            }
                            filterBuilder.ilike(field, value);
                        };
                        break;
                    case 'is':
                        () => {
                            if (value !== null && typeof value !== 'boolean') {
                                throw new Error(`'is' filter must be a boolean or null. '${typeof value}' given.`);
                            }
                            filterBuilder.is(field, value);
                        };
                        break;
                    case 'in':
                        () => {
                            if (!Array.isArray(value)) {
                                throw new Error(`'in' filter must be an array. '${typeof value}' given.`);
                            }
                            filterBuilder.in(field, value);
                        };
                        break;
                    case 'contains':
                        () => {
                            if ((!Array.isArray(value) && typeof value !== 'string' && typeof value !== 'object') || value === null) {
                                throw new Error(`'contains' filter must be an array, string or object. '${typeof value}' given.`);
                            }
                            filterBuilder.contains(field, value);
                        };
                        break;
                    case 'containedBy':
                        () => {
                            if ((!Array.isArray(value) && typeof value !== 'string' && typeof value !== 'object') || value === null) {
                                throw new Error(`'containedBy' filter must be an array, string or object. '${typeof value}' given.`);
                            }
                            filterBuilder.containedBy(field, value);
                        };
                        break;
                    case 'rangeLt':
                        () => {
                            if (value !== 'string') {
                                throw new Error(`'rangeLt' filter must be a string. '${typeof value}' given.`);
                            }
                            filterBuilder.rangeLt(field, value);
                        };
                        break;
                    case 'rangeGt':
                        () => {
                            if (value !== 'string') {
                                throw new Error(`'rangeGt' filter must be a string. '${typeof value}' given.`);
                            }
                            filterBuilder.rangeGt(field, value);
                        };
                        break;
                    case 'rangeGte':
                        () => {
                            if (value !== 'string') {
                                throw new Error(`'rangeGte' filter must be a string. '${typeof value}' given.`);
                            }
                            filterBuilder.rangeGte(field, value);
                        };
                        break;
                    case 'rangeLte':
                        () => {
                            if (value !== 'string') {
                                throw new Error(`'rangeLte' filter must be a string. '${typeof value}' given.`);
                            }
                            filterBuilder.rangeLte(field, value);
                        };
                        break;
                    case 'rangeAdjacent':
                        () => {
                            if (value !== 'string') {
                                throw new Error(`'rangeAdjacent' filter must be a string. '${typeof value}' given.`);
                            }
                            filterBuilder.rangeAdjacent(field, value);
                        };
                        break;
                    case 'overlaps':
                        () => {
                            if (value !== 'string' && !Array.isArray(value)) {
                                throw new Error(`'overlaps' filter must be a string. '${typeof value}' given.`);
                            }
                            filterBuilder.overlaps(field, value);
                        };
                        break;
                    case 'textSearch':
                        () => {
                            if (value !== 'string') {
                                throw new Error(`'textSearch' filter must be a string. '${typeof value}' given.`);
                            }
                            filterBuilder.textSearch(field, value, options);
                        };
                        break;
                    default: break;
                }
                // if (config) {
                //   const func = filterBuilder[supabaseFilter] as (field: string, value: unknown, config: OrderOptions)
                //   func(field, value, config)
                // } else {
                //   filterBuilder[supabaseFilter](field, value)
                // }
            });
            // Modifiers
            if (tslib_1.__classPrivateFieldGet(this, _QueryBuilder_limit, "f")) {
                filterBuilder.limit(tslib_1.__classPrivateFieldGet(this, _QueryBuilder_limit, "f"));
            }
            if (tslib_1.__classPrivateFieldGet(this, _QueryBuilder_order, "f")) {
                filterBuilder.order(...tslib_1.__classPrivateFieldGet(this, _QueryBuilder_order, "f"));
            }
            if (tslib_1.__classPrivateFieldGet(this, _QueryBuilder_range, "f")) {
                filterBuilder.range(...tslib_1.__classPrivateFieldGet(this, _QueryBuilder_range, "f"));
            }
            return filterBuilder;
        });
    }
    where(field, secondParam, thirdParam = null, options = null) {
        tslib_1.__classPrivateFieldGet(this, _QueryBuilder_filters, "f").push([field, secondParam, thirdParam, options]);
        return this;
    }
    limit(limit) {
        tslib_1.__classPrivateFieldSet(this, _QueryBuilder_limit, limit, "f");
        return this;
    }
    orderBy(field, direction = 'asc', foreignTable) {
        const config = {
            ascending: direction === 'asc'
        };
        if (foreignTable) {
            config.foreignTable = foreignTable;
        }
        tslib_1.__classPrivateFieldSet(this, _QueryBuilder_order, [field, config], "f");
        return this;
    }
    range(from, to) {
        tslib_1.__classPrivateFieldSet(this, _QueryBuilder_range, [from, to], "f");
        return this;
    }
    with(relations) {
        if (typeof relations === 'string') {
            tslib_1.__classPrivateFieldGet(this, _QueryBuilder_with, "f").push(relations);
        }
        if (Array.isArray(relations)) {
            tslib_1.__classPrivateFieldGet(this, _QueryBuilder_with, "f").push(...relations);
        }
        return this;
    }
}
exports.default = QueryBuilder;
_QueryBuilder_filters = new WeakMap(), _QueryBuilder_limit = new WeakMap(), _QueryBuilder_order = new WeakMap(), _QueryBuilder_range = new WeakMap(), _QueryBuilder_with = new WeakMap();
//# sourceMappingURL=QueryBuilder.js.map