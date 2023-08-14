export type Book = {
  id: string;
  imageUrl?: string;
  title?: string;
  categories?: string[];
  authors?: string[];
};

export interface BooksState {
  data: Book[];
  isLoading: boolean;
  errorMessage: string | null;
  totalItems: number | null;
}
