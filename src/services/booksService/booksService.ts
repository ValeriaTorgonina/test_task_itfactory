import axios from 'axios';
import { GetBooksResponse, GetBooksDTO } from './types';

const BOOKS_API_KEY = 'AIzaSyAR9FeAIeqqCMK3yhvR-p1ASamITmZwbEI';

const base = axios.create({
  baseURL: 'https://www.googleapis.com/books',
});

const queryBuilder = (search: string, args: Record<string, string>) => {
  const result = Object.entries(args).reduce(
    (acc, [key, value]) => (acc ? `${acc}+${key}:${value}` : `${key}:${value}`),
    search,
  );

  return result ?? {};
};

const booksService = {
  getBooks: async (params: GetBooksDTO) => {
    const { data } = await base.get<GetBooksResponse>('v1/volumes', {
      params: {
        q: queryBuilder(params.search, { subject: params.category }),
        maxResults: params.limit,
        orderBy: params.orderBy,
        key: BOOKS_API_KEY,
        startIndex: params.offset,
        printType: 'books',
      },
    });

    const books =
      data.items?.map(({ etag: id, volumeInfo }) => ({
        id,
        imageUrl: volumeInfo.imageLinks?.thumbnail,
        title: volumeInfo.title,
        categories: volumeInfo.categories,
        authors: volumeInfo.authors,
      })) ?? [];

    return {
      books,
      totalItems: data.totalItems,
    };
  },
};

export default booksService;
