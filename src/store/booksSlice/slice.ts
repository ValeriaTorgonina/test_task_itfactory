import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initialState from './initialState';
import { Book } from './types';

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setBooks: (state, action: PayloadAction<Book[]>) => {
      state.data = action.payload;
    },
    addBooks: (state, action: PayloadAction<Book[]>) => {
      state.data = [...state.data, ...action.payload];
    },
    setErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.errorMessage = action.payload;
    },
    setTotalItems: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload;
    },
  },
});

export const {
  setIsLoading,
  setBooks,
  addBooks,
  setErrorMessage,
  setTotalItems,
} = booksSlice.actions;
