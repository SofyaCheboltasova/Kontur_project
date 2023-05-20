import { stringify, parse } from 'qs';

export const getValueFromQuery = (query: string, name: string): string | null => {
  const value = parse(query, { ignoreQueryPrefix: true })[name];

  if (typeof value === 'string') {
    return value;
  }

  return null;
};

export function getUpdatedQuery(query: string, params: Record<string, string | null | undefined>) {
  const curQuery = parse(query, { ignoreQueryPrefix: true });

  return stringify({ ...curQuery, ...params }, { addQueryPrefix: true });
}
