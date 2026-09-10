export type TSort = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

export type TPageble = {
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
