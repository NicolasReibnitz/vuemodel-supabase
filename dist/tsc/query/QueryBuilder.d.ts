declare type Filters = '=' | '!=' | '>' | '<' | '<=' | 'like' | 'ilike' | 'is' | 'in' | 'contains' | 'containedBy' | 'rangeLt' | 'rangeGt' | 'rangeGte' | 'rangeLte' | 'rangeAdjacent' | 'overlaps' | 'textSearch';
declare type TextSearchOptions = {
    config?: string;
    type?: 'plain' | 'phrase' | 'websearch' | null;
};
export default class QueryBuilder {
    #private;
    runWith(queryBuilder: any): Promise<any>;
    where(field: string | number, secondParam: Filters | string | number, thirdParam?: unknown, options?: TextSearchOptions | null): this;
    limit(limit: number): this;
    orderBy(field: never, direction: string | undefined, foreignTable: string | undefined): this;
    range(from: number, to: number): this;
    with(relations: string[] | string): this;
}
export {};
