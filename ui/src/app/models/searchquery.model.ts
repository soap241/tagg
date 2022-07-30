export interface SearchQuery {
	query_by: string,
	query_str: string,
	query_fields: string[],
	query_filter: object,
	query_limit: number,
	query_order: string[][]
	query_special?: any;
}