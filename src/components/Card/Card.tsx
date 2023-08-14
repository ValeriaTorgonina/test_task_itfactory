import defaultBookCover from '../../assets/no_cover.jpeg';
import { Book } from '../../store/booksSlice/types';
import styles from './Card.module.scss';

type BookCardProps = {
  data: Book;
};

export function Card({ data }: BookCardProps) {
  const authors = data.authors?.join(', ');

  return (
    <div className={styles.card}>
      <img
        className={styles.image}
        src={data.imageUrl ?? defaultBookCover}
        alt={data.title ?? '-'}
      />
      <div className={styles.content}>
        <div className={styles.categoryWrapper}>
          {data.categories?.length && (
            <span className={styles.category}>{data.categories[0] ?? ''}</span>
          )}
        </div>
        <span className={styles.title} title={data.title}>
          {data.title ?? ''}
        </span>
        <span className={styles.authors} title={authors}>
          {authors}
        </span>
      </div>
    </div>
  );
}
