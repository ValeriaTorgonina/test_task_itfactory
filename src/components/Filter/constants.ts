import { Categories, SortOptions } from '../../types/FilterParams';

export const CATEGORIES: {
  label: string;
  value: Categories;
}[] = [
  {
    label: 'all',
    value: 'all',
  },
  {
    label: 'art',
    value: 'art',
  },
  {
    label: 'biography',
    value: 'biography',
  },
  {
    label: 'computers',
    value: 'computers',
  },
  {
    label: 'history',
    value: 'history',
  },
  {
    label: 'medical',
    value: 'medical',
  },
  {
    label: 'poetry',
    value: 'poetry',
  },
];

export const SORT_OPTIONS: {
  label: string;
  value: SortOptions;
}[] = [
  {
    label: 'relevance',
    value: 'relevance',
  },
  {
    label: 'newest',
    value: 'newest',
  },
];
