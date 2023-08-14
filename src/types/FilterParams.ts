export type Categories =
  | 'all'
  | 'art'
  | 'biography'
  | 'computers'
  | 'history'
  | 'medical'
  | 'poetry';

export type SortOptions = 'relevance' | 'newest';

export type FilterParams = {
  searchBy?: string;
  category: Categories;
  sort: SortOptions;
};
