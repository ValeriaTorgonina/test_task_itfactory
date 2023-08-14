import CloseIcon from '@mui/icons-material/Close';
import { Alert, Button, IconButton } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import Card from '../../components/Card';
import Filter from '../../components/Filter';
import { useAppDispatch, useAppSelector } from '../../store';
import { selectBooksState } from '../../store/booksSlice/selectors';
import { setErrorMessage } from '../../store/booksSlice/slice';
import { getBooks } from '../../store/booksSlice/thunkActions';
import { FilterParams } from '../../types/FilterParams';
import { INITIAL_FILTER_PARAMS } from './constants';
import styles from './BooksPage.module.scss';

export function BooksPage() {
  const dispatch = useAppDispatch();
  const {
    data: books,
    isLoading,
    errorMessage,
    totalItems,
  } = useAppSelector(selectBooksState);
  const [filterParams, setFilterParams] = useState<FilterParams>(
    INITIAL_FILTER_PARAMS,
  );

  const headText = useMemo(() => {
    if (isLoading) {
      return 'Loading...';
    }

    return `Found ${books.length} results`;
  }, [books.length, isLoading]);

  const loadMore = () => {
    dispatch(getBooks(filterParams, books.length));
  };

  const onCloseWarningAlert = () => {
    dispatch(setErrorMessage(null));
  };

  useEffect(() => {
    dispatch(getBooks(filterParams, 0));
  }, [dispatch, filterParams]);

  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.title}>Search for books</h1>
        <Filter
          onChange={setFilterParams}
          initialParams={INITIAL_FILTER_PARAMS}
        />
      </header>
      <main className={styles.main}>
        <span className={styles.headText}>{headText}</span>
        <div className={styles.list}>
          {books.map((book) => (
            <Card data={book} key={book.id} />
          ))}
        </div>
        {(!totalItems || totalItems > books.length) && !!books.length && (
          <Button variant="outlined" onClick={loadMore} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Load more'}
          </Button>
        )}
      </main>

      {errorMessage && (
        <Alert
          className={styles.alert}
          severity="error"
          variant="filled"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={onCloseWarningAlert}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {errorMessage}
        </Alert>
      )}
    </div>
  );
}
