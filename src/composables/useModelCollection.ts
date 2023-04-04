import { useModelApi } from './useModelApi'
import { ref, computed, Ref, ComputedRef } from 'vue-demi'
import { Collection, InstanceOf } from '@vuex-orm/core'
import { Model } from '../types'
import { AuthError, PostgrestError } from '@supabase/supabase-js'
import { StandardError } from './useApi'
import QueryBuilder from '../query/QueryBuilder'

export interface UseModelCollectionReturn<M extends typeof Model> {
  index: () => void
  ids: Ref<string[] | number[]>
  collection: ComputedRef<Collection<InstanceOf<M>>>
  query: QueryBuilder
  error: Ref<AuthError | PostgrestError | StandardError | null>
  indexing: Ref<boolean>
}

export function useModelCollection<M extends typeof Model> (
  ModelClass: M, userID: string | null
): UseModelCollectionReturn<M> {
  const modelApi = useModelApi<M>(ModelClass, userID)
  const ids = ref()

  const collection = computed<Collection<InstanceOf<M>>>(() => {
    if (Array.isArray(ids.value)) {
      return ModelClass.query().whereIdIn(ids.value).get()
    }

    return ModelClass.all()
  })

  async function index () {
    await modelApi.index()
  }

  return {
    index,
    ids,
    collection,
    query: modelApi.query,
    error: modelApi.error,
    indexing: modelApi.indexing
  }
}