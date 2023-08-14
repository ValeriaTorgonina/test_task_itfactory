import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import booksService from '../../services/booksService/booksService';
import { FilterParams } from '../../types/FilterParams';
import { RootState } from '../index';
import {
  addBooks,
  setBooks,
  setErrorMessage,
  setIsLoading,
  setTotalItems,
} from './slice';

export function getBooks(
  filterParams: FilterParams,
  offset: number,
): ThunkAction<Promise<void>, RootState, void, AnyAction> {
  return async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
      const { books, totalItems } = await booksService.getBooks({
        limit: 30,
        offset,
        orderBy: filterParams.sort,
        search: filterParams.searchBy || '',
        category: filterParams.category === 'all' ? '' : filterParams.category,
      });

      dispatch(setIsLoading(false));
      dispatch(setTotalItems(totalItems));

      if (offset === 0) {
        dispatch(setBooks(books));
      } else {
        dispatch(addBooks(books));
      }
    } catch (e) {
      dispatch(
        setErrorMessage('There were some problems with downloading books'),
      );
      dispatch(setIsLoading(false));
    }
  };
}
