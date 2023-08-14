import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputBase, MenuItem, Paper, Select } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { useEffect, useState } from 'react';
import {
  Categories,
  FilterParams,
  SortOptions,
} from '../../types/FilterParams';
import { CATEGORIES, SORT_OPTIONS } from './constants';
import styles from './Filter.module.scss';

type FilterProps = {
  onChange: (filterParams: FilterParams) => void;
  initialParams: FilterParams;
};

export function Filter({ onChange, initialParams }: FilterProps) {
  const [searchInput, setSearchInput] = useState<string | undefined>(
    initialParams.searchBy,
  );
  const [selectedCategory, setSelectedCategory] = useState<Categories>(
    initialParams.category,
  );
  const [selectedSortOption, setSelectedSortOption] = useState<SortOptions>(
    initialParams.sort,
  );

  const handleChangeFilter = () => {
    onChange({
      searchBy: searchInput,
      category: selectedCategory,
      sort: selectedSortOption,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleChangeFilter();
    }
  };

  useEffect(() => {
    handleChangeFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSortOption, selectedCategory]);

  return (
    <div className={styles.container}>
      <Paper
        component="label"
        className={styles.search}
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <IconButton
          type="button"
          sx={{ p: '10px' }}
          aria-label="search"
          onClick={handleChangeFilter}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <FormControl className={styles.selectWrapper}>
        <span className={styles.labelText}>Categories</span>
        <Select
          value={selectedCategory}
          className={styles.select}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          onChange={(e) => setSelectedCategory(e.target.value as Categories)}
        >
          {CATEGORIES.map(({ label, value }) => (
            <MenuItem value={value} key={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={styles.selectWrapper}>
        <span className={styles.labelText}>Sorting by</span>
        <Select
          className={styles.select}
          value={selectedSortOption}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          onChange={(e) => setSelectedSortOption(e.target.value as SortOptions)}
        >
          {SORT_OPTIONS.map(({ label, value }) => (
            <MenuItem value={value} key={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
