export interface PaginationResponse<T, C = { total: number }> {
  data: T[];
  page: number;
  limit: number;
  count: C;
}

export interface PaginationRequest<FilterModel> {
  page: number | undefined;
  limit: number | undefined;
  filters?: FilterModel;
}
