import { AuthError, PostgrestError } from '@supabase/supabase-js';
import { Ref } from 'vue-demi';
import QueryBuilder from '../query/QueryBuilder';
export interface UseApiReturn<ResponseShape> {
    index: () => Promise<void>;
    create: (form: Partial<any>) => Promise<void>;
    remove: (id: string | number) => Promise<void>;
    find: (id: string | number) => Promise<void>;
    update: (id: string | number, form: Partial<any>) => Promise<void>;
    query: QueryBuilder;
    error: Ref<AuthError | PostgrestError | StandardError | null>;
    data: Ref<ResponseShape>;
    include: Ref<string[]>;
    userId: Ref<string | number | null>;
    loading: Ref<boolean>;
    indexing: Ref<boolean>;
    creating: Ref<boolean>;
    finding: Ref<boolean>;
    updating: Ref<boolean>;
    removing: Ref<boolean>;
}
export interface StandardError {
    message: string;
}
export declare function useApi<ResponseShape>(entity: string, defaultUserId?: string | null): UseApiReturn<ResponseShape>;
