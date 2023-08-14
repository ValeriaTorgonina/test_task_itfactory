import { BooksState } from './types';

const initialState: BooksState = {
  data: [],
  isLoading: false,
  errorMessage: null,
  totalItems: null,
};

export default initialState;
