/**
 * Spring Data Sort order direction.
 * Mirrors `org.springframework.data.domain.Sort.Direction`.
 */
export type TSortDirection = 'ASC' | 'DESC' | 'asc' | 'desc' | 'NONE';

/**
 * Spring Data Sort item — one sort criterion by property.
 * Mirrors `org.springframework.data.domain.Sort.Order`.
 */
export type TSortItem = {
  property: string;
  direction: TSortDirection;
};

/**
 * Spring Data Sort descriptor.
 * Mirrors `org.springframework.data.domain.Sort`.
 */
export type TSort = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
  orders: TSortItem[];
};

/**
 * Spring Data Page pagination metadata.
 * Mirrors `org.springframework.data.domain.Page` structure.
 *
 * Note: `number` is 0-based page index (not 1-based UI page).
 * Use `TPaginated<T>` generic wrapper for the full page response with content.
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

/**
 * Full paginated response with content.
 * Combines `TPageable` metadata with an array of items of type `T`.
 */
export type TPaginated<T> = TPageable & {
  content: T[];
};

/**
 * A single field in a key-value info card.
 */
export type TDataInfoField = {
  key?: string;
  fieldLabel: string;
  fieldValue: string | number | boolean | null;
};

/**
 * A collection of label-value pairs for display in info cards.
 */
export type TDataInfo = {
  data: TDataInfoField[];
};
