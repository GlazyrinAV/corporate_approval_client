/**
 * Spring Data Sort descriptor.
 * Mirrors `org.springframework.data.domain.Sort`.
 */
export type TSort = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

/**
 * Spring Data Page pagination metadata.
 * Mirrors `org.springframework.data.domain.Page` (without `content`).
 *
 * Note: `number` is 0-based page index (not 1-based UI page).
 */
export type TPageable = {
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  sort: TSort;
  totalElements: number;
  totalPages: number;
};
