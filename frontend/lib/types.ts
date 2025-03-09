export type DashboardOutput = {
  totalFarms: number;
  totalArea: number;
  totalCrops: number;
};

export type PaginationResult<T> = {
  data: T[];
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
    sortBy: Array<string[]>;
  };
  links: {
    current: string;
  };
};
