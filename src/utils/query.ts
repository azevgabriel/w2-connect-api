export const parsedQuery = (
  query: string | object | null | undefined
): object | null => {
  let parsedQuery = query
    ? typeof query === 'string'
      ? JSON.parse(query)
      : query
    : null;

  if (query) {
    parsedQuery['filters'] = parsedQuery?.filters
      ? typeof parsedQuery?.filters === 'string'
        ? JSON.parse(parsedQuery.filters)
        : parsedQuery.filters
      : undefined;
  }

  return parsedQuery;
};
