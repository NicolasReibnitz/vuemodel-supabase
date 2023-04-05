import { AuthError, PostgrestError } from '@supabase/supabase-js';
import { Ref, ComputedRef } from 'vue-demi';
import { InstanceOf, Item } from '@vuex-orm/core';
import { Model } from '../types';
import { StandardError } from './useApi';
import QueryBuilder from '../query/QueryBuilder';
export interface UseModelReturn<M extends typeof Model> {
    create: (customForm?: Partial<any>) => Promise<void>;
    find: () => Promise<void>;
    update: () => Promise<void>;
    remove: () => Promise<void>;
    query: QueryBuilder;
    model: ComputedRef<Item<InstanceOf<M>>>;
    form: Partial<any>;
    resetForm: () => void;
    id: Ref<string | number | null>;
    error: Ref<AuthError | PostgrestError | StandardError | null>;
    creating: Ref<boolean>;
    finding: Ref<boolean>;
    updating: Ref<boolean>;
    removing: Ref<boolean>;
    loading: Ref<boolean>;
}
export declare function useModel<M extends typeof Model>(ModelClass: M, userID: string | null): UseModelReturn<M>;
