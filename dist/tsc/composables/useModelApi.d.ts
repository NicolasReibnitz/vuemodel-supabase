import { AuthError, PostgrestError } from '@supabase/supabase-js';
import { StandardError } from './useApi';
import { InstanceOf, Item, Model } from '@vuex-orm/core';
import { Ref } from 'vue-demi';
import QueryBuilder from '../query/QueryBuilder';
export interface UseModelApiReturn<M extends typeof Model> {
    create: (form: Partial<any>) => Promise<void>;
    find: (id: string | number) => Promise<void>;
    update: (id: string | number, form: Partial<any>) => Promise<void>;
    remove: (id: string | number) => Promise<void>;
    index: () => Promise<void>;
    query: QueryBuilder;
    data: Ref<Item<InstanceOf<M>>>;
    error: Ref<AuthError | PostgrestError | StandardError | null>;
    userId: Ref<string | number | null>;
    indexing: Ref<boolean>;
    creating: Ref<boolean>;
    finding: Ref<boolean>;
    updating: Ref<boolean>;
    removing: Ref<boolean>;
    loading: Ref<boolean>;
}
export declare function useModelApi<M extends typeof Model>(ModelClass: typeof Model, userID: string | null): UseModelApiReturn<M>;
